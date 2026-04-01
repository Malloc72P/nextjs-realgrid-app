import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // 콘솔 로그 캡처
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    console.log(`[${msg.type()}] ${msg.text()}`);
  });

  // localhost:3000 접속
  console.log('\n>>> http://localhost:3000 접속 중...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // 페이지가 로드될 시간 제공
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('\n>>> 페이지 로드 완료. Delete 버튼 찾기...');
  
  // 첫 번째 행의 Delete 버튼 찾기
  const deleteButtonSelector = 'button:has-text("Delete")';
  try {
    // 버튼 존재 확인
    await page.waitForSelector('text/Delete', { timeout: 5000 });
    
    console.log('\n>>> Delete 버튼 클릭 시작...');
    
    // Delete 버튼 클릭
    await page.click('text/Delete');
    
    // 클릭 후 로그 캡처 시간
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n>>> Delete 버튼 클릭 완료');
  } catch (error) {
    console.error('Delete 버튼을 찾을 수 없습니다:', error.message);
  }

  // 콘솔 로그 출력
  console.log('\n=== 캡처된 모든 콘솔 로그 ===');
  consoleLogs.forEach(log => console.log(log));

  console.log('\n>>> 스크린샷 저장 중...');
  await page.screenshot({ path: 'after-click.png', fullPage: true });
  console.log('✓ 스크린샷 저장됨: after-click.png');

  // 잠시 대기 후 브라우저 종료
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('\n>>> 브라우저 종료');
  await browser.close();
})();
