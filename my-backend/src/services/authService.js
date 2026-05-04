const fs = require('fs').promises;
const path = require('path');

class AuthService {
  constructor() {
    this.usersFilePath = path.join(__dirname, '../../../data/users.json');
    this.authUsersFilePath = path.join(__dirname, '../../../data/auth_user.json');
  }

  async findUserByEmail(email) {
    const data = await fs.readFile(this.usersFilePath);
    let content;

    if (data.length >= 2 && data[0] === 0xff && data[1] === 0xfe) {
      content = data.toString('utf16le');
    } else {
      content = data.toString('utf8');
    }

    if (content.charCodeAt(0) === 0xfeff) {
      content = content.slice(1);
    }

    const users = JSON.parse(content);
    return users.find(user => user.username === email);
  }

  async findUserByEmailInAuthFile(email) {
    try {
      const data = await fs.readFile(this.authUsersFilePath, 'utf-8');
      const users = JSON.parse(data);
      return users.find(user => user.username === email);
    } catch (error) {
      return null;
    }
  }

  async addUser(user) {
    try {
      let users = [];
      
      try {
        const data = await fs.readFile(this.authUsersFilePath, 'utf-8');
        users = JSON.parse(data);
      } catch (error) {
        users = [];
      }

      users.push(user);
      await fs.writeFile(this.authUsersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(`Failed to add user: ${error.message}`);
    }
  }

  async findUserByEmailAny(email) {
    const userFromMain = await this.findUserByEmail(email);
    if (userFromMain) return userFromMain;
    
    const userFromAuth = await this.findUserByEmailInAuthFile(email);
    if (userFromAuth) return userFromAuth;
    
    return null;
  }
}

module.exports = new AuthService();
