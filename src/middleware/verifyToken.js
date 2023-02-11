const jwt = require("jsonwebtoken");
const {status_Code} = require('../helper/status_code')
const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(status_Code.Not_Token_Provide).json({ message: "No token provided!" });
    }
    const tokenSplit = token.split(" ");

    if (tokenSplit[0] != "Bearer" || !tokenSplit[1]) {
      return res.status(status_Code.Not_Token_Provide).json({ message: "Invalid token" });
    }
    const payload = jwt.verify(tokenSplit[1], "ITC");

    if (!payload) {
      return res.status(status_Code.unauthorized).json({ message: "Not Authorized..." });
    }

    req.payload = payload;
    next();
  } catch (err) {
    req.payload = null;
    return res.status(status_Code.Server_error).json({ message: err.message });
  }
};

module.exports = { verifyToken };