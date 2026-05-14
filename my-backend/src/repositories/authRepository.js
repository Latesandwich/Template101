const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../../../data/users.json');
const authUsersFilePath = path.join(__dirname, '../../../data/auth_user.json');

class AuthRepository {
  async _readJsonFile(filePath) {
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      return JSON.parse(raw);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async findUserByEmail(email) {
    const users = await this._readJsonFile(usersFilePath);
    return users.find(user => user.username === email) || null;
  }

  async findUserByEmailInAuthFile(email) {
    const users = await this._readJsonFile(authUsersFilePath);
    return users.find(user => user.username === email) || null;
  }

  async addUser(user) {
    const users = await this._readJsonFile(authUsersFilePath);
    users.push(user);
    await fs.writeFile(authUsersFilePath, JSON.stringify(users, null, 2), 'utf8');
    return user;
  }
}

module.exports = new AuthRepository();
