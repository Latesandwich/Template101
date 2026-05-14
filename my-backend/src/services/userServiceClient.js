const authRepository = require('../repositories/authRepository');

class UserServiceClient {
  async getUserByEmail(email) {
    const url = `http://user-service/api/verify?email=${encodeURIComponent(email)}`;

    try {
      const response = await this._fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`User service returned ${response.status}`);
      }

      const payload = await response.json();
      return payload.user || null;
    } catch (error) {
      console.warn('User service unavailable, falling back to local user repository:', error.message);
      return authRepository.findUserByEmail(email);
    }
  }

  async _fetch(url) {
    if (this._isUserServiceUrl(url)) {
      return this._mockFetch(url);
    }

    if (typeof fetch === 'function') {
      return fetch(url);
    }

    throw new Error('Global fetch is not available in this runtime');
  }

  _isUserServiceUrl(url) {
    return url.startsWith('http://user-service');
  }

  async _mockFetch(url) {
    const parsed = new URL(url);
    if (parsed.pathname === '/api/verify') {
      const email = parsed.searchParams.get('email');
      const user = await authRepository.findUserByEmail(email);
      const ok = Boolean(user);
      return {
        ok,
        status: ok ? 200 : 404,
        json: async () => ({ user })
      };
    }

    return {
      ok: false,
      status: 404,
      json: async () => ({})
    };
  }
}

module.exports = new UserServiceClient();
