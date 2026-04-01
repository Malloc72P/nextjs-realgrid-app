const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.createContext();
  const page = await context.newPage();

  // 콘솔 로그 캡처
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    console.log(`[${msg.type()}] ${msg.text()}`);
  });

  // localhost:3000 접속
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // 개발자 도구 열기 (F12)
  await page.keyboard.press('F12');
  
  // 페이지가 로드될 시간 제공
  await page.waitForTimeout(2000);

  // 첫 번째 행의 Delete 버튼 찾기
  const firstDeleteButton = await page.locator('button:has-text("Delete")').first();
  
  if (firstDeleteButton) {
    console.log('\n=== Delete 버튼 클릭 ===');
    await firstDeleteButton.click();
    
    // 클릭 후 로그 캡처 시간
    await page.waitForTimeout(2000);
    
    // 스크린샷 저장
    await page.screenshot({ path: 'after-click.png', fullPage: true });
    console.log('스크린샷 저장됨: after-click.png');
  } else {
    console.log('Delete 버튼을 찾을 수 없습니다.');
  }

  // 콘솔 로그 출력
  console.log('\n=== 캡처된 모든 콘솔 로그 ===');
  consoleLogs.forEach(log => console.log(log));

  // 잠시 대기 후 브라우저 종료
  await page.waitForTimeout(3000);
  await browser.close();
})();
