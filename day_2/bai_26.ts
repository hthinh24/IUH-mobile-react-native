// Tạo một async function waitIn để chờ trong một khoảng thời
async function waitIn(number: number): Promise<void> {
  console.log(`Start waiting ${number / 1000} seconds...`);
  await new Promise((resolve) => setTimeout(resolve, number));
  console.log(`${number / 1000} seconds elapsed.`);
}

// Thực hiện chờ 5 giây
waitIn(5000);
