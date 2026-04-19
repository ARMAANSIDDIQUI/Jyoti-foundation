export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    const payload = JSON.parse(window.atob(parts[1]));
    if (!payload.exp) return false;
    
    // Check if token expires in the next 10 seconds
    const currentTime = Date.now() / 1000;
    return payload.exp < (currentTime + 10);
  } catch (err) {
    console.error('Token validation error:', err);
    return true;
  }
};

export const handleAuthError = (response, logoutCallback) => {
  if (response && response.status === 401) {
    if (logoutCallback) logoutCallback();
    return true;
  }
  return false;
};
