import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await page.screenshot({ path: '/tmp/deleteBtn-current.png', fullPage: true });
console.log('Screenshot saved to /tmp/deleteBtn-current.png');
await browser.close();
