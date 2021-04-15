// all function return promise of puppeteer
const puppeteer = require("puppeteer");
let browser;
let page;
let code;
// opens the browser and return a promises
puppeteer.launch({
    headless: false, // if false, show the browser, if true dont show the browser but perform the task.
    defaultViewport: null, //
    args: ["--start-maximized"],
}).then((b) => {
    browser = b;
    return browser.pages();
}).then((pages) => {
    page = pages[0];
    return page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
}).then(() => {
    return page.type("#input-1", "bohov46865@ddwfzp.com");
}).then(() => {
    return page.type("#input-2", "abc@123");
}).then(() => {
    return Promise.all([
        page.waitForNavigation(),
        page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled")
    ]);
}).then(() => {
    return Promise.all([
        page.click("[title='Interview Preparation Kit']"),
        page.waitForNavigation()
    ]);
}).then(() => {
    return waitClickNavigation("[data-attr1='warmup']");
}).then(() => {
    return waitClickNavigation(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");
}).then(() => {
    return waitClickNavigation("#tab-1-item-4");
}).then(() => {
    return handleLockButton();
}).then(() => {
    return page.evaluate(() => {
        return document.querySelector(".challenge-editorial-block.editorial-setter-code pre").innerText;
    });
}).then((data) => {
    code = data;
    return waitClickNavigation("[data-attr2='Problem']");
    // console.log("h");
}).then(() => {
    return page.waitForSelector("[type='checkbox']");
}).then(() => {
    return page.click("[type='checkbox']");
}).then(() => {
    return page.waitForSelector("#input-1");
}).then(() => {
    return page.type("#input-1", code);
}).then(() => {
    return page.keyboard.down("Control");
}).then(() => {
    return page.keyboard.press("KeyA");
}).then(() => {
    return page.keyboard.press("KeyC");
}).then(() => {
    return page.click("[data-mprt='5']");
}).then(() => {
    return page.keyboard.press("KeyA");
}).then(() => {
    return page.keyboard.press("KeyV");
}).then(() => {
    return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
}).then(() => {
    return page.screenshot({ path: "google.png" });
}).catch((err) => {
    console.log(err);
    // return browser.close();
});


function handleLockButton() {
    return new Promise((resolve, reject) => {
        page.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled")
            .then(() => {
                return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled")
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                resolve();
            })
    });
}

function waitClickNavigation(selector) {
    return new Promise((resolve, reject) => {
        page.waitForSelector(selector,{visible:true})
            .then(() => {
                return Promise.all([page.click(selector), page.waitForNavigation()]);
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    })
}