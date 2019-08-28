import { Page,launch } from 'puppeteer';


async function ctrips_flight() {
    let browser = await launch({
        ignoreHTTPSErrors: true,
        headless: false,
        executablePath: 'D:\\wangxiao\\chrome-win\\chrome-win\\chrome.exe',
        args: ['--start-maximized']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1980, height: 1080 });
    await page.goto('https://flights.ctrip.com/itinerary/oneway/sha-bjs?date=2019-08-29', { waitUntil: 'load' });

    autoScroll(page);

    await page.waitFor(10000);
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
ctrips_flight();