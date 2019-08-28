"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer_1 = require("puppeteer");
var expectPuppeteer = require("expect-puppeteer");
/***
 *
 * 元素
 */
// 出发城市
var start_city_ele = '#DepartCity1TextBox';
// 到达城市
var arrive_city_ele = '#ArriveCity1TextBox';
// 出发日期
var start_data_ele = '#DepartDate1TextBox';
// 搜索
var search_ele = '#search_btn';
//label_flight
var flights_ele = '.search_table_header';
//航班名次
var flight_name_ele = '.search_table_header .inb.logo strong';
function ctrips_flight(start_city, arrive_city, start_data) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, _a, _b, lengths, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, puppeteer_1.launch({
                        ignoreHTTPSErrors: true,
                        headless: true,
                        executablePath: 'D:\\wangxiao\\chrome-win\\chrome-win\\chrome.exe',
                        args: ['--start-maximized']
                    })];
                case 1:
                    browser = _c.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _c.sent();
                    return [4 /*yield*/, page.setViewport({ width: 1980, height: 1080 })];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, page.goto('https://flights.ctrip.com', { waitUntil: 'load' })];
                case 4:
                    _c.sent();
                    /**
                     * 流程
                     */
                    return [4 /*yield*/, page.type(start_city_ele, start_city, { delay: 10 })];
                case 5:
                    /**
                     * 流程
                     */
                    _c.sent();
                    return [4 /*yield*/, page.type(arrive_city_ele, arrive_city, { delay: 10 })];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, page.type(start_data_ele, start_data)];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, expectPuppeteer(page).toClick('#mainbody')];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, expectPuppeteer(page).toClick(search_ele)];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, page.waitForNavigation()];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, page.waitFor(5000)];
                case 11:
                    _c.sent();
                    _b = (_a = console).log;
                    return [4 /*yield*/, page.title()];
                case 12:
                    _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, autoScroll(page)];
                case 13:
                    _c.sent();
                    return [4 /*yield*/, page.evaluate(function (flights_ele) {
                            return document.querySelectorAll(flights_ele).length;
                        }, flights_ele)];
                case 14:
                    lengths = _c.sent();
                    console.log(lengths);
                    return [4 /*yield*/, page.evaluate(function (lengths) {
                            var flights = [];
                            for (var i = 0; i < lengths; i++) {
                                var flight_name = document.querySelectorAll('.search_table_header .inb.logo strong')[i].textContent;
                                var flight_code = document.querySelectorAll('.search_table_header .logo-item.flight_logo > div > span > span:nth-child(1) > span')[i].textContent;
                                var flight_start_time = document.querySelectorAll('.search_table_header .inb.right .time_box .time')[i].textContent;
                                var flight_start_airport = document.querySelectorAll('.search_table_header .inb.right .airport')[i].textContent;
                                var flight_arrive_time = document.querySelectorAll('.search_table_header .inb.left .time_box .time')[i].textContent;
                                var flight_arrive_airport = document.querySelectorAll('.search_table_header .inb.left .airport')[i].textContent;
                                var flight_price = document.querySelectorAll('.search_table_header .base_price02')[i].textContent;
                                flights.push({
                                    "飞机航班": flight_name,
                                    "飞机航班号": flight_code,
                                    "飞机起飞时间": flight_start_time,
                                    "飞机起飞机场": flight_start_airport,
                                    "飞机到达时间": flight_arrive_time,
                                    "飞机到达机场": flight_arrive_airport,
                                    "机票价格": flight_price
                                });
                            }
                            return flights;
                        }, lengths)];
                case 15:
                    data = _c.sent();
                    return [4 /*yield*/, page.waitFor(10000)];
                case 16:
                    _c.sent();
                    console.log(data);
                    return [4 /*yield*/, page.close()];
                case 17:
                    _c.sent();
                    return [4 /*yield*/, browser.close()];
                case 18:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function autoScroll(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, page.evaluate(function () {
                    return new Promise(function (resolve, reject) {
                        var totalHeight = 0;
                        var distance = 100;
                        var timer = setInterval(function () {
                            var scrollHeight = document.body.scrollHeight;
                            window.scrollBy(0, distance);
                            totalHeight += distance;
                            if (totalHeight >= scrollHeight) {
                                clearInterval(timer);
                                resolve();
                            }
                        }, 100);
                    });
                })];
        });
    });
}
ctrips_flight('上海', '北京', '2019-08-29');
