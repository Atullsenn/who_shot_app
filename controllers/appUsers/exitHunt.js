const db = require("../../db/dbConnection");
const format = require("date-format");
const moment = require("moment");

const exitHunt = (req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");
  const currentTime = moment().format("LT");

  if(req.body.id === "" || req.body.id === null){
    res.status(400).send({
      success: false,
      message: "Please Provide Id"
    })
    return;
  }
  

  db.query(
    'UPDATE tbl_hunt SET end_date = "' +
      currentDate +
      '", end_time = "' +
      currentTime +
      '" WHERE id = "' +
      req.body.id +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: "false",
          message: err,
        });
        return;
      } else {
        res.status(200).send({
          success: "true",
          message: "Hunt Exit Successfully",
        });
        return;
      }
    }
  );
};

module.exports = exitHunt;
