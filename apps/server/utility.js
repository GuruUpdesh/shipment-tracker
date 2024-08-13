const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const parseData = (data) => {
  const header = getHeader(data);
  const transitHistory = getTransitHistory(data.tracking_history);
  return { header: header, transitHistory: transitHistory };
};

function getHeader(data) {
  const header = {};
  let date = new Date(data?.tracking_status.status_date);
  header.status = data.tracking_status.status.toLowerCase();
  header.date = getFormattedDate(date);
  header.time = getFormattedTime(date);
  header.location = data.tracking_status.location;
  let eta = new Date(data?.eta);
  const formattedEta = getFormattedDate(eta);
  const formattedEtaTime = getFormattedTime(eta);
  header.eta = formattedEta !== "12/31/1969" ? formattedEta: null;
  header.servicelevel = data.servicelevel.name
  header.addressFrom = data.address_from
  header.addressTo = data.address_to


  return header;
}

function getTransitHistory(transitHistoryAPI) {
  const transitHistory = [];
  for (let i = 0; i < transitHistoryAPI.length; i++) {
    const cur = transitHistoryAPI[i];
    const transit = {};
    date = new Date(cur.status_date);
    transit.date = getFormattedDate(date);
    transit.time = getFormattedTime(date);
    transit.primaryMessage = cur.status_details;
    transit.location = cur.location;
    transitHistory.push(transit);
  }
  return transitHistory.reverse();
}

function getFormattedDate(date) {
  let year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

function getFormattedTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, "0");
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

module.exports = {
  hashPassword,
  verifyPassword,
  parseData,
};
