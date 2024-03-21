const authenticate = async (token, username) => {
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

  if (data.success && data.username === username) {
    return true;
  }

  return false;
}

module.exports = {
  authenticate
};
