const fs = require('fs').promises;
const path = require('path');

class AuthService {
  constructor() {
    this.usersFilePath = path.join(__dirname, '../../../data/users.json');
  }

  async findUserByEmail(email) {
    const fileBuffer = await fs.readFile(this.usersFilePath);
    let data;

    // Some shipped JSON files may be encoded as UTF-16LE with BOM.
    if (fileBuffer.length >= 2 && fileBuffer[0] === 0xff && fileBuffer[1] === 0xfe) {
      data = fileBuffer.toString('utf16le');
    } else {
      data = fileBuffer.toString('utf8');
    }

    if (data.charCodeAt(0) === 0xfeff) {
      data = data.slice(1);
    }

    const users = JSON.parse(data);
    return users.find(user => user.username === email);
  }
}

module.exports = new AuthService();
