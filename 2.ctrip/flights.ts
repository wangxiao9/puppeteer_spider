import { Page, launch } from 'puppeteer';
import expectPuppeteer = require('expect-puppeteer');

/***
 * 
 * 元素
 */
// 出发城市
const start_city_ele = '#DepartCity1TextBox';

// 到达城市
const arrive_city_ele = '#ArriveCity1TextBox';

// 出发日期
const start_data_ele = '#DepartDate1TextBox';

// 搜索
const search_ele = '#search_btn';

//label_flight
const flights_ele = '.search_table_header';


//航班名次
const flight_name_ele = '.search_table_header .inb.logo strong';



async function ctrips_flight(start_city: string, arrive_city: string, start_data: string) {
    let browser = await launch({
        ignoreHTTPSErrors: true,
        headless: true,
        executablePath: 'D:\\wangxiao\\chrome-win\\chrome-win\\chrome.exe',
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1980, height: 1080 });
    await page.goto('https://flights.ctrip.com', { waitUntil: 'load' });

    /**
     * 流程
     */

    await page.type(start_city_ele, start_city, { delay: 10 });
    await page.type(arrive_city_ele, arrive_city, { delay: 10 });
    await page.type(start_data_ele, start_data);
    await expectPuppeteer(page).toClick('#mainbody');
    await expectPuppeteer(page).toClick(search_ele);

    await page.waitForNavigation();

    await page.waitFor(5000);
    console.log(await page.title());

    await autoScroll(page);

    /**
     * 爬虫
     */
    const lengths = await page.evaluate( (flights_ele) => {
        return document.querySelectorAll(flights_ele).length;
    },flights_ele);

    console.log(lengths);

    const data = await page.evaluate((lengths) => {
        let flights = [];
        for (let i = 0; i < lengths; i++) {
            const flight_name = document.querySelectorAll('.search_table_header .inb.logo strong')[i].textContent;
            const flight_code = document.querySelectorAll('.search_table_header .logo-item.flight_logo > div > span > span:nth-child(1) > span')[i].textContent;
            const flight_start_time = document.querySelectorAll('.search_table_header .inb.right .time_box .time')[i].textContent;
            const flight_start_airport = document.querySelectorAll('.search_table_header .inb.right .airport')[i].textContent;
            const flight_arrive_time = document.querySelectorAll('.search_table_header .inb.left .time_box .time')[i].textContent;
            const flight_arrive_airport = document.querySelectorAll('.search_table_header .inb.left .airport')[i].textContent;
            const flight_price = document.querySelectorAll('.search_table_header .base_price02')[i].textContent;

            
            
            flights.push(
                {
                    "飞机航班":flight_name,
                    "飞机航班号":flight_code,
                    "飞机起飞时间":flight_start_time,
                    "飞机起飞机场":flight_start_airport,
                    "飞机到达时间":flight_arrive_time,
                    "飞机到达机场":flight_arrive_airport,
                    "机票价格":flight_price

                }
            );
        }
        return flights;
    },lengths);

    await page.waitFor(10000);
    console.log(data);
    await page.close()
    await browser.close();
}

async function autoScroll(page:Page) {
    return page.evaluate(() => {
        return new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        })
    });
}
ctrips_flight('上海', '北京', '2019-08-29');
