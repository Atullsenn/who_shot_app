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

  const [parking_name,setParkingName] = useState("");
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
        //var totallocation = res.data.data;
        setLocation(res.data.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  //location list
//WorkingWithCheckBox
const [userinfo, setUserInfo] = useState({
  languages: [],
  response: [],
});

const handleChange = (e) => {
  // Destructuring
  const { value, checked } = e.target;
  const { languages } = userinfo;
  //console.log(`${value} is ${checked}`);
   
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
const [userinfo1, setUserInfo1] = useState({
  vehicle: [],
  res: [],
});

const handleChangeTwoWheeler = (e) => {
  // Destructuring
  const { value, checked } = e.target;
  const { vehicle } = userinfo1;
  handleOnChange()
 
  //console.log(`${value} is ${checked}`);
   
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

const [userinfo2, setUserInfo2] = useState({
  FourWheeler: [],
  resp: [],
});

const handleChangeFourWheeler = (e) => {
  // Destructuring
  const { value, checked } = e.target;
  const { FourWheeler } = userinfo2;
  secondOnChange()
 
  //console.log(`${value} is ${checked}`);
   
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
  const addParking = async()=>{
    const formData = new FormData()
    formData.append('parking_name',parking_name)
    formData.append('location_id',locationName)
    formData.append('capacity',capacity)
    formData.append('no_of_days',userinfo.response)
    formData.append('veichle_type_two_wheeler',userinfo1.res)
    formData.append('veichle_type_four_wheeler',userinfo2.resp)
    formData.append('two_wheeler_per_hour_charge', twoWheelerPerHourCharge)
    formData.append('two_wheeler_per_day_charge',twoWheelerPerDayCharge)
    formData.append('two_wheeler_per_week_charge',twoWheelerPerWeekCharge)
    formData.append('two_wheeler_per_month_charge',twoWheelerPerMonthCharge)
    formData.append('four_wheeler_per_hour_charge',fourWheelerPerHourCharge)
    formData.append('four_wheeler_per_day_charge',fourWheelerPerDayCharge)
    formData.append('four_wheeler_per_week_charge',fourWheelerPerWeekCharge)
    formData.append('four_wheeler_per_month_charge',fourWheelerPerMonthCharge)
    formData.append('parking_images',parkingImages)
    await axios.post(URL + '/addParking',formData,{
        Accept:'Application',
        'Content-Type': 'Application/json'
    }).then((res)=>{
        //console.log(res)
        toast.success('Parking Added Successfully')

    }).catch((err)=>{
        //console.error(err)
        toast.error('Please check Error')
    })
  }

  
 
  //Add Parking

  
  


  //upload multiple images 
  const [images,setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const uploadMultipleParkingImage = (e)=>{
    setParkingImages(e.target.files[0])
    const files = Array.from(e.target.files)
    setImages([])
    setImagesPreview([])
    files.forEach((file)=>{
      const reader = new FileReader();
      reader.onload = ()=>{
        // if(reader.readyState === 2){
          setImagesPreview([...imagesPreview, reader.result])
          setImages([...images,reader.result])
        //}

      }
      reader.readAsDataURL(file);

    })

  }


//console.log(imagesPreview)


  //upload multiple images


  
  return (
    <>
      <div className="container-fluid">
        <div className="add-location">
          <div>
            <h1 className="heading-add-parking">Add Parking</h1>
            <Paper>
              <Box px={3} py={2}>
                <Grid container spacing={4}>
                  <Grid item md={12} xs={12} sm={6}>
                    <TextField
                      required
                      className="textfieldmui"
                      id="name"
                      name="name"
                      label="Parking Name"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      onChange={(e)=>{setParkingName(e.target.value)}}
                    />
                  </Grid>
                  <Grid item md={12} xs={12} sm={6}>
                    <select
                      class="form-select"
                      style={{
                        padding: "12px",
                        height: "45px",
                        fontSize: "16px",
                        color: "#4A4A4A",
                        border: "1px solid #c4c4c4",
                        borderRadius: "5px",
                      }}
                      aria-label="Default select example"
                      onClick={locationlist}
                      onChange={(e)=>{setLocationName(e.target.value)}}
                    >
                      <option selected>Select Location</option>
                      {location &&
                        Object.keys(location).map((element) => {
                          return <option key={location[element].id} value={location[element].id}>{location[element].location}</option>;
                        })}
                    </select>
                  </Grid>
                  <div className="row">
                    <div className="column">
                    {imagesPreview.map((image,index)=>(
                              <img
                              style={{width:'100%'}}
                                key={index}
                                src={image}
                                alt="parking images"
                              />
                              ))}
                              </div>
                            </div>
                  <Grid item md={6}  sm={6}>
                    <button style={{border: 'none'}}>
                    <label>
                    <input onChange={uploadMultipleParkingImage} type="file"  multiple style={{display:'none'}}></input>
                      Choose Parking Image
                    </label>
                    </button>
                    

                  </Grid>
                  
                  <Grid item md={12} xs={12} sm={6}>
                    <TextField
                      required
                      id="capacity"
                      name="capacity"
                      label="Capacity"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      onChange={(e)=>{setCapacity(e.target.value)}}
                    />
                  </Grid>
                  <Grid item md={12} xs={12} sm={6}>
                    <div className="days">
                      <label htmlFor="">No. of days :</label>
                      <FormGroup >
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Sun"
                          value= {0}
                          onChange={handleChange}
                        />
                        <FormControlLabel
                          control={<Checkbox/>}
                          label="Mon"
                          value={1}
                          onChange={handleChange}
                        />
                        <FormControlLabel
                          control={<Checkbox/>}
                          label="Tus"
                          value={1}
                          onChange={handleChange}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Wed"
                          value={1}
                          onChange={handleChange}
                        />
                        <FormControlLabel
                          control={<Checkbox/>}
                          label="Thu"
                          value={1}
                          onChange={handleChange}
                        />
                        <FormControlLabel
                          control={<Checkbox/>}
                          label="Fri"
                          value={1}
                          onChange={handleChange}
                        />
                        <FormControlLabel
                          control={<Checkbox/>}
                          label="Sat"
                          value={1}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div>
                  </Grid>
                  <Grid item md={12} xs={12} sm={6}>
                    <div className="days">
                      <label>Vechiel Type :</label>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Two Wheeler"
                          checked={isChecked}
                          value={1}
                          //onChange={(e)=>handleOnChange(e)}
                          onChange={handleChangeTwoWheeler}
                        />

                        <FormControlLabel
                          control={<Checkbox />}
                          label="Four Wheeler"
                          checked={isSecond}
                          value={2}
                          //onChange={(e)=>secondOnChange(e)}
                          onChange={handleChangeFourWheeler}
                        />
                      </FormGroup>
                    </div>
                  </Grid>

                  <Grid item md={12} xs={12} sm={6}>
                  {isChecked ? (
                        <label style={{color:'black'}}>Two Wheeler:</label>

                    ):("")}
                    {isChecked ? (
                        
                      <TextField
                        required
                        id="location"
                        name="location"
                        label="Per Hour Charge"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={(e)=>setTwoWheelerPerHourCharge(e.target.value)}
                      />
                    ) : (
                      ""
                    )}
                    {isChecked ? (
                      <TextField
                        required
                        id="location"
                        name="location"
                        label="Per Day Charge"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={(e)=>setTwoWheelerPerDayCharge(e.target.value)}
                      />
                    ) : (
                      ""
                    )}
                    {isChecked ? (
                      <TextField
                        required
                        id="location"
                        name="location"
                        label="Per Week Charge"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={(e)=>setTwoWheelerPerWeekCharge(e.target.value)}
                      />
                    ) : (
                      ""
                    )}
                    {isChecked ? (
                      <TextField
                        required
                        id="location"
                        name="location"
                        label="Per Month Charge"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={(e)=>setTwoWheelerPerMonthCharge(e.target.value)}
                      />
                    ) : (
                      ""
                    )}
                    {isSecond ? (
                        <label style={{color:'black'}}>Four Wheeler:</label>

                    ):("")}
                    

                    {isSecond ? (
                        
                      <TextField
                        required
                        id="location"
                        name="location"
                        label="Per Hour Charge"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={(e)=>setFourWheelerPerHourCharge(e.target.value)}
                      />
                    ) : (
                      ""
                    )}
                    {isSecond ? (
                      <TextField
                        required
                        id="location"
                        name="location"
                        label="Per Day Charge"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={(e)=>setFourWheelerPerDayCharge(e.target.value)}
                      />
                    ) : (
                      ""
                    )}

                    {isSecond ? (
                      <TextField
                        required
                        id="location"
                        name="location"
                        label="Per Week Charge"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={(e)=>setFourWheelerPerWeekCharge(e.target.value)}
                      />
                    ) : (
                      ""
                    )}
                    {isSecond ? (
                      <TextField
                        required
                        id="location"
                        name="location"
                        label="Per Month Charge"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={(e)=>setFourWheelerPerMonthCharge(e.target.value)}
                      />
                    ) : (
                      ""
                    )}
                  </Grid>
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
}
