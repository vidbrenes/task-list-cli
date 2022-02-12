const fs = require("fs");

const fileDir = "./db/data.json";

const writeData = (data) => {
  fs.writeFileSync(fileDir, JSON.stringify(data));
};

const fetchData = () => {
  if (!fs.existsSync(fileDir)) {
    return null;
  }

  const data = fs.readFileSync(fileDir, { encoding: "utf-8" });
  return JSON.parse(data);
};

module.exports = {
  fetchData,
  writeData,
};
