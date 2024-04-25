const authenticate = async (token, username) => {
  if (!token) {
    return false;
  }

  const response = await fetch('/api/user/auth', {
    headers: {
      'authorization': token
    }
  });

  if (!response.ok) {
    const message = `Error has occured: ${response.statusText}`;
    window.alert(message);
    return false;
  }

  const data = await response.json();
  if (!data) {
    window.alert('Error: Unable to load user JSON data');
    return false;
  }

  if (data.success && data.username === username) {
    console.log('authenticated')
    return true;
  }

  return false;
}

module.exports = {
  authenticate
};
