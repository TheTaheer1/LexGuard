const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  
  // click "Try Sample Contract"
  await page.click('text=Try Sample Contract');
  // click "Analyze Document"
  await page.click('text=Analyze Document');
  
  // wait for "Analysis Results" heading
  await page.waitForSelector('text=Analysis Results', { timeout: 15000 });
  
  // get the HTML of the motion div
  const html = await page.innerHTML('.mt-16');
  console.log(html);
  
  await browser.close();
})();
