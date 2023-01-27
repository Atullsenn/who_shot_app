import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import useStyles from "./styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { URL } from "../../url/url";

toast.configure();
export default function AddMerchant() {
  var classes = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isSecond, setIsSecond] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [parking_name, setParkingName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [twoWheelerPerHourCharge, setTwoWheelerPerHourCharge] = useState("");
  const [twoWheelerPerDayCharge, setTwoWheelerPerDayCharge] = useState("");
  const [twoWheelerPerWeekCharge, setTwoWheelerPerWeekCharge] = useState("");
  const [twoWheelerPerMonthCharge, setTwoWheelerPerMonthCharge] = useState("");
  const [fourWheelerPerHourCharge, setFourWheelerPerHourCharge] = useState("");
  const [fourWheelerPerDayCharge, setFourWheelerPerDayCharge] = useState("");
  const [fourWheelerPerWeekCharge, setFourWheelerPerWeekCharge] = useState("");
  const [fourWheelerPerMonthCharge, setFourWheelerPerMonthCharge] = useState("");
  const [parkingImages, setParkingImages] = useState("")
  const [userinfo, setUserInfo] = useState({
    languages: [],
    response: [],
  });
  const [userinfo1, setUserInfo1] = useState({
    vehicle: [],
    res: [],
  });
  const [userinfo2, setUserInfo2] = useState({
    FourWheeler: [],
    resp: [],
  });
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const secondOnChange = () => {
    setIsSecond(!isSecond);
  };

  //location list
  const [location, setLocation] = useState();
  const locationlist = async () => {
    await axios
      .get(URL + "/locationlist")
      .then((res) => {
        setLocation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //location list

  //WorkingWithCheckBox
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { languages } = userinfo;
    //Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
        response: [...languages, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
        response: languages.filter((e) => e !== value),
      });
    }
  };
  //WorkingWithCheckBox

  //WorkingWithVehicleTypeCheckBox
  const handleChangeTwoWheeler = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { vehicle } = userinfo1;
    handleOnChange()
    //Case 1 : The user checks the box
    if (checked) {
      setUserInfo1({
        vehicle: [...vehicle, value],
        res: [...vehicle, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setUserInfo1({
        languages: vehicle.filter((e) => e !== value),
        response: vehicle.filter((e) => e !== value),
      });
    }
  };
  //WorkingWithVehicleTypeCheckbox


  const handleChangeFourWheeler = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { FourWheeler } = userinfo2;
    secondOnChange()
    //Case 1 : The user checks the box
    if (checked) {
      setUserInfo2({
        FourWheeler: [...FourWheeler, value],
        resp: [...FourWheeler, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setUserInfo2({
        FourWheeler: FourWheeler.filter((e) => e !== value),
        resp: FourWheeler.filter((e) => e !== value),
      });
    }
  };

  //Add Parking
  const addParking = async () => {
    const formData = new FormData()
    formData.append('parking_name', parking_name)
    formData.append('location_id', locationName)
    formData.append('capacity', capacity)
    formData.append('no_of_days', userinfo.response)
    formData.append('veichle_type_two_wheeler', userinfo1.res)
    formData.append('veichle_type_four_wheeler', userinfo2.resp)
    formData.append('two_wheeler_per_hour_charge', twoWheelerPerHourCharge)
    formData.append('two_wheeler_per_day_charge', twoWheelerPerDayCharge)
    formData.append('two_wheeler_per_week_charge', twoWheelerPerWeekCharge)
    formData.append('two_wheeler_per_month_charge', twoWheelerPerMonthCharge)
    formData.append('four_wheeler_per_hour_charge', fourWheelerPerHourCharge)
    formData.append('four_wheeler_per_day_charge', fourWheelerPerDayCharge)
    formData.append('four_wheeler_per_week_charge', fourWheelerPerWeekCharge)
    formData.append('four_wheeler_per_month_charge', fourWheelerPerMonthCharge)
    formData.append('parking_images', parkingImages)

    await axios.post(URL + '/addParking', formData, {
      Accept: 'Application',
      'Content-Type': 'Application/json'
    }).then((res) => {
      toast.success('Parking Added Successfully')
    }).catch((err) => {
      toast.error('Please check Error')
    })
  }
  //Add Parking

  //upload multiple images 
  const uploadMultipleParkingImage = (e) => {
    setParkingImages(e.target.files[0])
    const files = Array.from(e.target.files)
    setImages([])
    setImagesPreview([])
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // if(reader.readyState === 2){
        setImagesPreview([...imagesPreview, reader.result])
        setImages([...images, reader.result])
        //}
      }
      reader.readAsDataURL(file);
    })
  }
  //upload multiple images

  return (
    <>
      <div className="container-fluid">
        <div className="add-location">
          <div>
            <h1 className="heading-add-parking">Add User</h1>
            <Paper>
              <Box px={3} py={2}>
                <Grid container spacing={4}>
                  <Grid item md={12} xs={12} sm={6}>
                    <TextField
                      required
                      className="textfieldmui"
                      id="name"
                      name="name"
                      label="User Name"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      onChange={(e) => { setParkingName(e.target.value) }}
                    />
                  </Grid>
                  <Grid item md={12} xs={12} sm={6}>
                    <TextField
                      required
                      className="textfieldmui"
                      id="mail"
                      name="mail"
                      label="Email Id"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      onChange={(e) => { setParkingName(e.target.value) }}
                    />
                  </Grid>
                  <Grid item md={12} xs={12} sm={6}>
                    <TextField
                      required
                      className="textfieldmui"
                      id="number"
                      name="name"
                      label="Contact Number"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      onChange={(e) => { setParkingName(e.target.value) }}
                    />
                  </Grid>
                  <div className="row">
                    <div className="column">
                      {imagesPreview.map((image, index) => (
                        <img
                          style={{ width: '100%' }}
                          key={index}
                          src={image}
                          alt="parking images"
                        />
                      ))}
                    </div>
                  </div>
                </Grid>
                <Box mt={3}>
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <Button variant="contained" size="large" onClick={addParking}>
                      Submit
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};