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

    console.log("ok: false", response);
    throw new Error(response.error.message);
  } catch (err) {
    throw new Error(err.message);
  }
}

export default fetchData;
