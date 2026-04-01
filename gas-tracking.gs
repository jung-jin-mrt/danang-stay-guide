// ===================================================
// [다낭 프로모션 페이지] 클릭 로그 → 구글 시트 적재
// ===================================================
// 사용법:
// 1. 구글 시트 새로 만들기
// 2. 확장프로그램 → Apps Script 클릭
// 3. 이 코드 전체를 붙여넣기
// 4. 배포 → 새 배포 → 웹 앱 → 액세스: "모든 사용자" → 배포
// 5. 생성된 URL을 index.html의 GAS_URL에 붙여넣기
// ===================================================

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 헤더가 없으면 자동 생성
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'timestamp', 'event', 'section', 'name', 'rank', 'gid',
      'device', 'utm_source', 'utm_medium', 'utm_campaign',
      'page_url', 'referrer'
    ]);
    sheet.getRange(1, 1, 1, 12).setFontWeight('bold');
  }

  var p = e.parameter;
  sheet.appendRow([
    p.timestamp || new Date().toISOString(),
    p.event || '',
    p.section || '',
    p.name || '',
    p.rank || '',
    p.gid || '',
    p.device || '',
    p.utm_source || '',
    p.utm_medium || '',
    p.utm_campaign || '',
    p.page_url || '',
    p.referrer || ''
  ]);

  return ContentService
    .createTextOutput('ok')
    .setMimeType(ContentService.MimeType.TEXT);
}
