document.getElementById('loginBtn').addEventListener('click', async ()=>{
  const userid = document.getElementById('userid').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  // very simple local check for demo
  if (role==='teacher' && userid==='teacher1' && password==='pass') {
    location.href='dashboard.html';
  } else if (role==='student') {
    // allow any student id for demo
    localStorage.setItem('studentId', userid);
    location.href='student.html';
  } else {
    alert('ข้อมูลเข้าสู่ระบบไม่ถูกต้อง (demo)');
  }
});
