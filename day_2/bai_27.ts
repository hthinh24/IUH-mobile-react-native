// Tạo một async function fetchWithRetry để thực hiện fetch với số lần retry nhất định
async function fetchWithRetry(url: string, retries: number): Promise<Response> {
  try {
    return await fetch(url);
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      return await fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
}

// Thử fetch một URL không tồn tại với 2 lần retry
fetchWithRetry("https://akshdsakjdhạdsaoíchaiocbáoicbsa.com", 2).catch((err) =>
  console.log("Final fail after retries:", err.message),
);
