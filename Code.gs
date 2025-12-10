// Google Apps Script backend for Student Hair Check
const INSPECTION_SHEET = 'Inspections';
const CALENDAR_SHEET = 'Calendar';
const STUDENTS_SHEET = 'Students';
const USERS_SHEET = 'Users';

function _getSheetByName(name) {
  return SpreadsheetApp.getActive().getSheetByName(name);
}

function _toJsonArray(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length<=1) return [];
  const headers = data[0];
  return data.slice(1).map(r=>{
    const obj={};
    headers.forEach((h,i)=> obj[h]=r[i]);
    return obj;
  });
}

function doGet(e){
  const action = (e.parameter.action || '').toLowerCase();
  try {
    if (action==='inspections') {
      return ContentService.createTextOutput(JSON.stringify(_toJsonArray(_getSheetByName(INSPECTION_SHEET)))).setMimeType(ContentService.MimeType.JSON);
    }
    if (action==='calendar') {
      return ContentService.createTextOutput(JSON.stringify(_toJsonArray(_getSheetByName(CALENDAR_SHEET)))).setMimeType(ContentService.MimeType.JSON);
    }
    if (action==='history') {
      const id = e.parameter.id;
      const sheet = _getSheetByName(INSPECTION_SHEET);
      const data = _toJsonArray(sheet);
      const filtered = data.filter(r => String(r.studentId)===String(id));
      return ContentService.createTextOutput(JSON.stringify(filtered)).setMimeType(ContentService.MimeType.JSON);
    }
    if (action==='exportcalendar') {
      return exportCalendarAsPDF(e.parameter.month, e.parameter.year);
    }
    return ContentService.createTextOutput(JSON.stringify({error:'unknown action'})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({error:err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e){
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const action = (payload.action || '').toLowerCase();
    if (action==='addinspection') {
      const sh = _getSheetByName(INSPECTION_SHEET);
      const id = 'R'+Date.now();
      sh.appendRow([payload.studentId||'', payload.name||'', payload.grade||'', payload.date||'', payload.result||'', payload.teacher||'', payload.note||'', id]);
      return ContentService.createTextOutput(JSON.stringify({status:'ok', id})).setMimeType(ContentService.MimeType.JSON);
    }
    if (action==='addcalendar') {
      const sh = _getSheetByName(CALENDAR_SHEET);
      const id = 'C'+Date.now();
      sh.appendRow([payload.month||'', payload.year||'', payload.activity||'', payload.level||'', payload.date||'', payload.owner||'', payload.place||'', payload.note||'', id]);
      return ContentService.createTextOutput(JSON.stringify({status:'ok', id})).setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({error:'unknown action'})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({error:err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

// Export calendar as PDF (returns base64)
function exportCalendarAsPDF(month, year) {
  const template = HtmlService.createTemplateFromFile('calendar');
  template.month = month;
  template.year = year;
  const cal = _toJsonArray(_getSheetByName(CALENDAR_SHEET));
  template.events = cal.filter(r=>String(r.month)===String(month) && String(r.year)===String(year));
  const htmlOutput = template.evaluate().setWidth(1024);
  const pdfBlob = htmlOutput.getAs('application/pdf').setName(`calendar_${year}_${month}.pdf`);
  const base64 = Utilities.base64Encode(pdfBlob.getBytes());
  return ContentService.createTextOutput(JSON.stringify({ filename:`calendar_${year}_${month}.pdf`, base64 })).setMimeType(ContentService.MimeType.JSON);
}
