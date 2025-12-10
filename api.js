// Replace API_URL with your deployed Apps Script Web App URL
const API_URL = "REPLACE_WITH_YOUR_APPS_SCRIPT_URL";

async function apiFetchInspections(){
  const res = await fetch(API_URL + '?action=inspections');
  return res.json();
}

async function apiAddInspection(payload){
  payload.action = 'addInspection';
  const res = await fetch(API_URL, { method:'POST', body: JSON.stringify(payload) });
  return res.json();
}

async function apiFetchCalendar(){
  const res = await fetch(API_URL + '?action=calendar');
  return res.json();
}

async function apiAddCalendar(payload){
  payload.action = 'addCalendar';
  const res = await fetch(API_URL, { method:'POST', body: JSON.stringify(payload) });
  return res.json();
}

async function apiExportCalendar(month, year){
  const res = await fetch(API_URL + `?action=exportCalendar&month=${month}&year=${year}`);
  return res.json();
}

async function apiFetchHistory(studentId){
  const res = await fetch(API_URL + `?action=history&id=${encodeURIComponent(studentId)}`);
  return res.json();
}
