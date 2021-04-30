async function fetchData(method, url, data) {
  try {
    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, {
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

    console.log("💥 try", response);

    throw new Error(response.error.message);
  } catch (err) {
    console.log("💥 catch", err.message);
    throw new Error(err.message);
  }
}

export default fetchData;
