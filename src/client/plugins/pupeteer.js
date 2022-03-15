import puppeteer from 'puppeteer';

async function getCapture() {
  const browserType = 'chromium';
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('http://whatsmyuseragent.org/');
      await page.screenshot({ path: `example-${browserType}.png` });
      await browser.close();
}

export default {
  getCapture
}
