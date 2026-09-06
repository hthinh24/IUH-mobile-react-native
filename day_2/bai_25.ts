// Tạo một async function downloadFile để mô phỏng việc tải xuống một file
// trong vòng 3s và in ra kết quả khi hoàn thành
async function downloadFile(fileName: string): Promise<void> {
  return new Promise((resolve) => {
    console.log(`Downloading ${fileName}...`);
    setTimeout(() => {
      console.log(`Download completed for ${fileName}`);
      resolve();
    }, 3000);
  });
}

// Gọi hàm downloadFile với tên file "example.txt"
(async () => {
  await downloadFile("example.txt");
})();