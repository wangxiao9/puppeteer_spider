import { Page, launch } from 'puppeteer';
/***
 * 获取猫眼热门榜单
 */

// 更新时间
const update_time = '.update-time';

// 热门口碑榜-名次
const movie_bank = 'i[class*=board-index]';

// 热门口碑榜-名字
const movie_name = '.movie-item-info .name a';

// 热门口碑榜-主演
const movie_star = '.movie-item-info .star';

// 热门口碑榜-上映时间
const movie_releasetime = '.movie-item-info .releasetime';



// 热门口碑榜-图片
const board_lists_images = '.board-wrapper dd .image-link .board-img';

async function maoyan_board_run() {
    let browser = await launch({
        ignoreHTTPSErrors: true,
        headless: true,
        executablePath: 'D:\\wangxiao\\chrome-win\\chrome-win\\chrome.exe',
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.setViewport({width:1980,height:1080});
    await page.goto('https://maoyan.com/board', { waitUntil: 'load' });


    // await autoScroll(page);

    const length = await page.evaluate( (movie_bank) => {
        return document.querySelectorAll(movie_bank).length;
    },movie_bank);
    const banks = await page.$$eval(movie_bank, list =>
        list.map(n => n.innerHTML)
    );
    const names = await page.$$eval(movie_name, list =>
        list.map(n => n.getAttribute('title'))
    );

    const stars = await page.$$eval(movie_star, list =>
        list.map(n => n.innerHTML.replace(/\n/g,"").replace(/\s/g,""))
    );

    const releasetimes = await page.$$eval(movie_releasetime, list =>
        list.map(n => n.innerHTML)
    );

    let data = [];

    for (let i =0;i<length;i++) {
        data.push({
            bank:banks[i],
            name:names[i],
            star:stars[i],
            releasetime:releasetimes[i]
        })
    }
    await page.waitFor(10000);
    console.log(data);
    await browser.close();
}

maoyan_board_run();

