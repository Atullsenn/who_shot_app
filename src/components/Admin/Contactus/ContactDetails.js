import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { URL } from "../../../url/url";
import { toast } from "react-toastify";

const ContactDetails = () => {
  const history = useHistory();

  var [phone, setPhonenumber] = useState([]);
  const [email, setEmail] = useState([]);
  const [address, setAddress] = useState([]);
  const [data, getData] = useState([]);
var phone;
  const createContactDetails = (e) => {

    let data= {phone,email,address}
    fetch("http://localhost:8000/contact",{
      method:"POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },body:JSON.stringify(data)
        
    }).then((result)=>{
      result.json().then((data)=>{
        toast.success("Contact Updated Successfully")
      })
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(() => {
    getData1();
    
  }, []);

  const getData1 = async()=>{
    await axios.get("http://localhost:8000/getContact").then((res)=>{
      //console.log(res.data[0].email);
      setEmail(res.data.data[0].email)
      setAddress(res.data.data[0].address)
      setPhonenumber(res.data.data[0].phone)

    }).catch((err)=>{
      console.log(err)
    })
    
  }

  // Form validation 
  const [phoneError, setPhoneError] = useState("")
  const phoneRegex = /^([0-9]{0,15})$/;
  const [emailError, setEmailError] = useState("")
  const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  const [addressError, setAddressError] = useState("")
  const addressRegex = /^[#.0-9a-zA-Z\s,-]{0,50}$/;

  const isEnabled = !phoneError && !emailError && !addressError && phone != "" && email != "" && address != ""

  // Form validation

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="application-detail-heading-area"
              style={{ padding: "10px" }}
            >
              <h2>Create Contact Details</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="contact-notification-detail-main-area">
              <form className="send-notifications-form-area">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    onError={phoneError}
                    className={`form-control field ${
                      !phoneError ? "is-valid" : "is-invalid"
                    }`}
                    name="phonenumber"
                    placeholder="Enter Phone Number"
                    autofocus=""
                    required=""
                    id="name"
                    value={phone}
                    onChange={(e) => {
                      setPhonenumber(e.target.value);
                      const isPhoneCorrect = phoneRegex.test(e.target.value);
                      setPhoneError(e.target.value != "" && !isPhoneCorrect);
                    }}
                  />
                  <div className="invalid-feedback">
                    {phoneError ? "Please Enter Valid Phone Number!" : ""}
                  </div>
                </div>
                <div className="form-group">
                  <label>Email ID</label>
                  <input
                    type="text"
                    onError={emailError}
                    className={`form-control field ${
                      !emailError ? "is-valid" : "is-invalid"
                    }`}
                    name="email"
                    placeholder="Enter Email ID"
                    autofocus=""
                    required=""
                    id="name"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      const isEmailCorrect = emailRegex.test(e.target.value);
                      setEmailError(e.target.value != "" && !isEmailCorrect);
                    }}
                  />
                  <div className="invalid-feedback">
                    {emailError ? "Please Enter valid Email!" : ""}
                  </div>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    onError={addressError}
                    className={`form-control field ${
                      !addressError ? "is-valid" : "is-invalid"
                    }`}
                    name="address"
                    placeholder="Enter Address"
                    autofocus=""
                    required=""
                    id="name"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      const isAddressCorrect = addressRegex.test(
                        e.target.value,
                      );
                      setAddressError(
                        e.target.value != "" && !isAddressCorrect,
                      );
                    }}
                  />
                  <div className="invalid-feedback">
                    {addressError ? "Please Enter Valid Address!" : ""}
                  </div>
                </div>
                <div className="contact-form-submint-btn-area">
                  {/* <a
                  href="#/app/create-contact-details"
                  onClick={createContactDetails}
                  className="contact-form-submint-btn"
                >
                  Submit
                </a> */}
                  <button
                    type="button"
                    style={{
                      backgroundColor: "#912c00",
                      padding: "10px",
                      width:'100px',
                      color: "white",
                      border: "2px solid white",
                      borderRadius: "10px",
                    }}
                    disabled={!isEnabled}
                    onClick={createContactDetails}
                    // className="contact-form-submint-btn"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center">
        {" "}
        2022 © Admin Panel brought to you by{" "}
        <a href="https://https://www.webnmobappssolutions.com">
          webnmobappssolutions.com
        </a>
      </footer>
    </>
  );
};

export default ContactDetails;
