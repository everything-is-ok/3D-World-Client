async function fetchData(method, url, data) {
  try {
    let response = await fetch(`http://localhost:5000${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    response = await response.json();
    if (response.ok) {
      return response.data;
    }

    // NOTE: 에러핸들링, 어찌할지 멘토님께 질문
    throw new Error(response.error.message);
  } catch (err) {
    throw new Error(err.message);
  }
}

export default fetchData;
