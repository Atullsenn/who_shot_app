import React, { useEffect, useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import {
    Paper,
    Box,
    Grid,
    TextField,
    Button,
    CircularProgress
} from "@material-ui/core";
import useStyles from "../styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useParams } from 'react-router-dom';
import {URL} from '../../../url/url';
toast.configure();
const initialValue = {
    parking_name: "",
    location_id: "",
    capacity: "",
    veichle_type_two_wheeler:"",
    veichle_type_four_wheeler:"",
    no_of_days: "",
    two_wheeler_per_hour_charge:"",
    two_wheeler_per_day_charge: "",
    two_wheeler_per_week_charge:"",
    two_wheeler_per_month_charge:"",
    four_wheeler_per_hour_charge:"",
    four_wheeler_per_day_charge:"",
    four_wheeler_per_week_charge:"",
    four_wheeler_per_month_charge:"",
    parking_images: ""
  };

export default function EditParking() {
    var classes = useStyles();
    let history = useHistory();
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [isSecond, setIsSecond] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [data,setData] = useState(initialValue);
    const {
        parking_name,
        location_id,
        capacity,
        veichle_type_two_wheeler,
        veichle_type_four_wheeler,
        no_of_days,
        two_wheeler_per_hour_charge,
        two_wheeler_per_day_charge,
        two_wheeler_per_week_charge,
        two_wheeler_per_month_charge,
        four_wheeler_per_hour_charge,
        four_wheeler_per_day_charge,
        four_wheeler_per_week_charge,
        four_wheeler_per_month_charge,
      } = data;

    
    const handleOnChange = () => {
        setIsChecked(!isChecked)
    }
    const secondOnChange = () => {
        setIsSecond(!isSecond)
    }
    const [location, setLocation] = useState();
    const locationlist = async () => {
        await axios.get(URL + '/locationlist').then(res => {
            var totallocation = res.data.data;
            setLocation(res.data.data)

        }).catch(err => {
            console.log(err)
        })
    }

    // console.log("location checking @@@")
    // console.log(location)
    // console.log("location checking @@@")


    //Get Parking Details By ID
    useEffect(() => {
        GetParkingDetailsByID();
      }, []);
    
      const GetParkingDetailsByID = () => {
        // let request = { id };
       
        axios
          .post(URL + "/getoneParking", {id:id}, {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          })
          .then((res) => {
            console.log(res)
            setData(res.data.data[0]);
            setParking_Images(res.data.data[0])
           
          })
          .catch((err) => console.log(err));
      };
   
    
     
    //Get Parking Details By ID

const [parking_images, setParking_Images] = useState("")
    //update Parking 
    const updateParkingById = async()=>{
        const formData = new FormData()
              formData.append('id',id)
              formData.append('parking_name',parking_name)
              formData.append('location_id',location_id)
              formData.append('no_of_days', no_of_days)
              formData.append('capacity', capacity)
              formData.append('veichle_type_two_wheeler',veichle_type_two_wheeler)
              formData.append('veichle_type_four_wheeler',veichle_type_four_wheeler)
              formData.append('two_wheeler_per_hour_charge',two_wheeler_per_hour_charge)
              formData.append('two_wheeler_per_day_charge',two_wheeler_per_day_charge)
              formData.append('two_wheeler_per_week_charge', two_wheeler_per_week_charge)
              formData.append('two_wheeler_per_month_charge',two_wheeler_per_month_charge)
              formData.append('four_wheeler_per_hour_charge',four_wheeler_per_hour_charge)
              formData.append('two_wheeler_per_hour_charge',two_wheeler_per_hour_charge)
              formData.append('four_wheeler_per_day_charge',four_wheeler_per_day_charge)
              formData.append('four_wheeler_per_week_charge', four_wheeler_per_week_charge)
              formData.append('four_wheeler_per_month_charge',four_wheeler_per_month_charge)
              formData.append('parking_images',parking_images)
              
        await axios.post(URL + '/updateParkingDetails',formData,{
            Accept:'Application',
            'Content-Type': 'Application/Json',
        }).then((res)=>{
            toast.success('Data Updated Successfully')
        }).catch((err)=>{
            toast.error('Something went wrong')
        })
    }

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };


    //update Parking


    //upload multiple images 
  const [images,setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const uploadMultipleParkingImage = (e)=>{
    setParking_Images(e.target.files[0])
    const files = Array.from(e.target.files)
    setImages([])
    setImagesPreview([])
    files.forEach((file)=>{
      const reader = new FileReader();
      
      reader.onload = ()=>{
        // if(reader.readyState === 2){
          setImagesPreview([...imagesPreview,reader.result])
          setImages([...images,reader.result])
         
          
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
              <h1 className="heading-add-parking">Edit Parking</h1>
              <Paper>
                <Box px={3} py={2}>
                  <Grid container spacing={4}>
                    <Grid item md={12} xs={12} sm={6}>
                      <TextField
                        required
                        className="textfieldmui"
                        id="parking_name"
                        name="parking_name"
                        label="Parking Name"
                        value={data.parking_name}
                        onChange={(e) => onValueChange(e)}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                      />
                    </Grid>
                    <Grid item md={12} xs={12} sm={6}>
                      <select
                        class="form-select"
                        id="location_id"
                        name="location_id"
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
                        onChange={(e) => onValueChange(e)}
                      >
                        {location &&
                          Object.keys(location).map((element) => {
                            return (
                              <option
                                key={location[element].id}
                                value={location[element].id}
                              >
                                {location[element].location}
                              </option>
                            );
                          })}
                      </select>
                    </Grid>
                    <div className="row">
                      <div className="column" style={{display:'flex', flexDirection:'row', flexWrap:'no-wrap'}}>
                        
                        {imagesPreview.map((image, index) => (
                          <img
                            style={{ width: "100%" }}
                            key={index}
                            // src={image}
                             src = {
                                data.parking_images === ''?
                                image : `${URL}/uploads/${data.parking_images}`?image :''
                                
                              }
                            alt="parking images"
                          />
                        ))}
                      </div>
                    </div>
                    <Grid item md={6} sm={6}>
                      <button style={{ border: "none" }}>
                        <label>
                          <input
                            onChange={uploadMultipleParkingImage}
                            type="file"
                            style={{ display: "none" }}
                            multiple
                          ></input>
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
                        value={data.capacity}
                        variant="outlined"
                        fullWidth
                        margin="dense"
                        onChange={(e) => {
                          onValueChange(e);
                        }}
                      />
                    </Grid>
                    <Grid item md={12} xs={12} sm={6}>
                      <div className="days">
                        <label htmlFor="">No. of days :</label>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Sun"
                            value={0}
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Mon"
                            value={1}
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Tus"
                            value={1}
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Wed"
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Thu"
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Fri"
                          />
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Sat"
                          />
                        </FormGroup>
                      </div>
                    </Grid>
                    <Grid item md={12} xs={12} sm={6}>
                      <div className="days">
                        <label>Vechiel Type :</label>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Two Wheeler"
                            checked={isChecked}
                            onChange={handleOnChange}
                          />

                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Four Wheeler"
                            checked={isSecond}
                            onChange={secondOnChange}
                          />
                        </FormGroup>
                      </div>
                    </Grid>

                    <Grid item md={12} xs={12} sm={6}>
                      {isChecked ? (
                        <label style={{ color: "black" }}>Two Wheeler</label>
                      ) : (
                        ""
                      )}
                      {isChecked ? (
                        <TextField
                          required
                          id="two_wheeler_per_hour_charge"
                          name="two_wheeler_per_hour_charge"
                          label="Per Hour Charge"
                          value={data.two_wheeler_per_hour_charge}
                          onChange={(e) => {
                            onValueChange(e);
                          }}
                          variant="outlined"
                          fullWidth
                          margin="dense"
                        />
                      ) : (
                        ""
                      )}
                      {isChecked ? (
                        <TextField
                          required
                          id="two_wheeler_per_day_charge"
                          name="two_wheeler_per_day_charge"
                          label="Per Day Charge"
                          value={data.two_wheeler_per_day_charge}
                          onChange={(e) => {
                            onValueChange(e);
                          }}
                          variant="outlined"
                          fullWidth
                          margin="dense"
                        />
                      ) : (
                        ""
                      )}
                      {isChecked ? (
                        <TextField
                          required
                          id="two_wheeler_per_week_charge"
                          name="two_wheeler_per_week_charge"
                          label="Per Week Charge"
                          value={data.two_wheeler_per_week_charge}
                          onChange={(e) => {
                            onValueChange(e);
                          }}
                          variant="outlined"
                          fullWidth
                          margin="dense"
                        />
                      ) : (
                        ""
                      )}
                      {isChecked ? (
                        <TextField
                          required
                          id="two_wheeler_per_month_charge"
                          name="two_wheeler_per_month_charge"
                          label="Per Month Charge"
                          value={data.two_wheeler_per_month_charge}
                          onChange={(e) => {
                            onValueChange(e);
                          }}
                          variant="outlined"
                          fullWidth
                          margin="dense"
                        />
                      ) : (
                        ""
                      )}

                      {isSecond ? (
                        <label style={{ color: "black" }}>Four Wheeler</label>
                      ) : (
                        ""
                      )}
                      {isSecond ? (
                        <TextField
                          required
                          id="four_wheeler_per_hour_charge"
                          name="four_wheeler_per_hour_charge"
                          label="Per Hour Charge"
                          variant="outlined"
                          value={data.four_wheeler_per_hour_charge}
                          onChange={(e) => {
                            onValueChange(e);
                          }}
                          fullWidth
                          margin="dense"
                        />
                      ) : (
                        ""
                      )}
                      {isSecond ? (
                        <TextField
                          required
                          id="four_wheeler_per_day_charge"
                          name="four_wheeler_per_day_charge"
                          label="Per Day Charge"
                          variant="outlined"
                          value={data.four_wheeler_per_day_charge}
                          onChange={(e) => {
                            onValueChange(e);
                          }}
                          fullWidth
                          margin="dense"
                        />
                      ) : (
                        ""
                      )}
                      {isSecond ? (
                        <TextField
                          required
                          id="four_wheeler_per_week_charge"
                          name="four_wheeler_per_week_charge"
                          label="Per Week Charge"
                          variant="outlined"
                          value={data.four_wheeler_per_week_charge}
                          onChange={(e) => {
                            onValueChange(e);
                          }}
                          fullWidth
                          margin="dense"
                        />
                      ) : (
                        ""
                      )}
                      {isSecond ? (
                        <TextField
                          required
                          id="four_wheeler_per_month_charge"
                          name="four_wheeler_per_month_charge"
                          label="Per Month Charge"
                          variant="outlined"
                          value={data.four_wheeler_per_month_charge}
                          onChange={(e) => {
                            onValueChange(e);
                          }}
                          fullWidth
                          margin="dense"
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
                      <Button
                        variant="contained"
                        size="large"
                        onClick={(e) => updateParkingById(e)}
                      >
                        Update
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





// src = {
//     data.image === ''?
//     process.env.PUBLIC_URL +
//     "/assets/images/user-img.jpg" : `${URL}/uploads/${data.image}`
//   }