const db = require("../../db/dbConnection");

const huntersLogin = (req, res) => {
  const dataArr = [];

  if (req.body.passcode == "" || req.body.passcode == null) {
    res.status(400).send({
      success: false,
      message: "Please Enter PassCode",
    });
    return;
  }
  if (req.body.hunter_id == "" || req.body.hunter_id == null) {
    res.status(400).send({
      success: false,
      message: "Please Provide Hunter Id",
    });
    return;
  }
  db.query(
    'SELECT id, user_id, hunt_name, passcode FROM tbl_hunt  WHERE hunt_name = "' +
      req.body.hunt_name +
      '" AND passcode = "' +
      req.body.passcode +
      '"',
    (err, data) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: err,
        });
        return;
      }
      if (!data.length) {
        res.status(400).send({
          success: false,
          message: "Please Enter Correct Passcode",
        });
        return;
      } else {
        data.forEach((e) => {
          var dataObj = {};
          dataObj["hunt_id"] = e.id;
          dataObj["admin_id"] = e.user_id;
          dataArr.push(dataObj);
        });
        //check user exist or not
        db.query(
          'SELECT a.hunt_id, b.hunt_name, c.hunter_remove_status FROM tbl_hunters a INNER JOIN tbl_hunt b ON a.hunt_id = b.id INNER JOIN tbl_app_users c ON a.hunter_id = c.id WHERE  a.hunter_id = "' +
            req.body.hunter_id +
            '" AND b.hunt_name =  "' +
            req.body.hunt_name +
            '"',
          (err, data) => {
            if (err) {
              res.status(500).send({
                success: false,
                message: err,
              });
              return;
            }

            if(data[0].hunter_remove_status == 1){
                res.status(201).send({
                    success: false,
                    message: 'You Can Not Join Hunt'
                })
                return;

              }
            

            if (data.length !== 0) {
              res.status(201).send({
                success: false,
                message: "You Joined Already",
              });
             
              return;
            }

             else {
                
              db.query(
                `INSERT INTO tbl_hunters(hunt_id,hunter_id,admin_id) VALUES('${dataArr[0].hunt_id}', '${req.body.hunter_id}', '${dataArr[0].admin_id}')`,
                (err, data) => {
                  if (err) {
                    res.status(500).send({
                      success: false,
                      message: err,
                    });
                  }
                }
              );
              res.status(200).send({
                success: true,
                message: "Joined Hunt Successfully",
              });
            }
          }
        );
      }
    }
  );
};

module.exports = huntersLogin;
