require('dotenv').config()
const db = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: parseInt(process.env.SERVER_PORT),
  server: process.env.SERVER_ADDRESS,
  encrypt: false
};
module.exports = db
