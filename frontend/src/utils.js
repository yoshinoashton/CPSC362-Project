const authenticate = async (token, setLogin) => {
  if (!token) {
    return;
  }

  const response = await fetch('/api/account/auth', {
    headers: {
      'authorization': token
    }
  });

  if (!response.ok) {
    const message = `Error has occured: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const data = await response.json();
  if (!data) {
    window.alert('Error: Unable to load user JSON data');
    return;
  }

  if (data.success) {
    setLogin(true);
  }

  return;
}

module.exports = {
  authenticate
};
