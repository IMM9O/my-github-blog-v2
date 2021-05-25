const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("https://dev.to/api/articles?username=imm9o");
  return data;
};