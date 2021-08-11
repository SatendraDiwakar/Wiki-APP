const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  mongoPass: process.env.DB_PASS
};