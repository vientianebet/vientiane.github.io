async function checkApisAndRedirect() {
  const apiEndpoints = [
    "https://vientiane.la.ddns.me/api",
    "https://vientiane.laos.ddns.net/api",
    "https://vientiane.la2.zapto.org/api"
  ];

  // สร้าง Promise สำหรับแต่ละ API
  const checks = apiEndpoints.map(apiUrl =>
    fetch(apiUrl, { method: 'GET' })
      .then(response => {
        if (response.status === 200) {
          // ถ้าตอบกลับ 200 OK -> คืน domain สำหรับ redirect
          return apiUrl.replace('/api', '/');
        } else {
          throw new Error(`Non-200 response from ${apiUrl}`);
        }
      })
  );

  try {
    // รอให้หนึ่งใน API ตอบกลับสำเร็จ
    const targetDomain = await Promise.any(checks);
    window.location.href = targetDomain;
  } catch (error) {
    console.error("No API responded with 200 OK:", error);
    openModal();
  }
}

// เรียกใช้ฟังก์ชันตอนโหลดหน้า
checkApisAndRedirect();

  function openModal() {
    var myModal = new bootstrap.Modal(document.getElementById('modal-1'));
    myModal.show();
  }
