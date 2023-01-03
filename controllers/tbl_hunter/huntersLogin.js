const db = require("../../db/dbConnection");

const huntersLogin = (req, res) => {
  const dataArr = [];
  const resultRecord = [];

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
          'SELECT a.hunt_id, b.hunt_name, a.id, a.hunter_remove_status FROM tbl_hunters a INNER JOIN tbl_hunt b ON a.hunt_id = b.id WHERE  a.hunter_id = "' +
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

            // if (data[0].hunter_remove_status == 1) {
            //     res.status(201).send({
            //       success: false,
            //       message: "You Can not join hunt",
            //     });
               
            //     return;
            //   }

            if (data.length !== 0) {
                res.status(201).send({
                  success: false,
                  message: "You Joined Already",
                });
               
                return;
              }

            
              
             else {

                data.forEach(item=>{
                    var itemObj = {}
                    itemObj['hunt_id'] = item.hunt_id;
                    itemObj['hunt_name'] = item.hunt_name;
                    itemObj['id'] = item.id;
                    resultRecord.push(itemObj)
                })
  
                
              db.query(
                `INSERT INTO tbl_hunters(hunt_id,hunter_id,admin_id) VALUES('${dataArr[0].hunt_id}', '${req.body.hunter_id}', '${dataArr[0].admin_id}')`,
                (err, data) => {
                  if (err) {
                    res.status(500).send({
                      success: false,
                      message: err,
                    });
                  }
                  else{
                    res.status(200).send({
                        success: true,
                        message: "Joined Hunt Successfully",
                      });
                      return;

                  }
                }
              );
            
             
            }

            
          }
        );
      }
    }
  );
};

module.exports = huntersLogin;
