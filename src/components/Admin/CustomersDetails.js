import React,{useState,useEffect} from "react";
import axios from 'axios';
import { URL } from "../../url/url";
import { useParams } from "react-router-dom";




const CustomersDetails = () => {
    //get Customer Details
    const id = useParams()
    const [data,setData] = useState([])

    const getCustomerDetails = ()=>{
        axios.post(URL + '/CustomerDetailsById',id,{
            Accept: 'Application',
            'Content-Type': 'Application/Json'
        }).then((res)=>{
            console.log("res")
            console.log(res)
            console.log("res")
            setData(res.data)
        }).catch(err=>console.log(err))
    }


    useEffect(()=>{
        getCustomerDetails()
    },[])

    console.log("table@@@@@@@@@@@@@@@@@@@")
    console.log(data)
    console.log("table@@@@@@@@@@@@@@@@@@@")




    //get Customer Details 
    return (
        <>
            <div className="page-wrapper" style={{ minHeight: "250px" }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading-top" >
                                <h2>Coustomers Details</h2>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="setting-tab-detail-main-area">

                                <div className="tab-content" id="myTabContent">
                                
                                    <div

                                        id="manage-profile"
                                        role="tabpanel"
                                        aria-labelledby="manage-profile-tab"
                                    >
                                        {data.map((val) => {
        return (
                                        <div className="row">
                                        
                                            <div className="col-lg-5">
                                                <div className="setting-tab-heading-area">
                                                    <h2>Personal Image</h2>
                                                </div>
                                                <div className="setting-profile-detail-main-area">
                                                    <div className="user-photo-main-area">
                                                        <div className="user-img-area">
                                                            <img
                                                                // src={
                                                                //     process.env.PUBLIC_URL +
                                                                //     "/assets/images/user-img.jpg"
                                                                // }
                                                                // alt="user img"
                                                                src = {
                                                                    val.image === ''?
                                                                    process.env.PUBLIC_URL +
                                                                    "/assets/images/user-img.jpg" : `${URL}/uploads/${val.image}`
                                                                  }
                                                                  alt="user img"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="setting-tab-heading-area">
                                                    <h2>Personal Details</h2>
                                                </div>
                                                <div className="setting-profile-detail-input-area">
                                                    <form
                                                        className="contact-form-main-area"
                                                        action="payment.php"
                                                        method="POST"
                                                        id="paymentFrm"
                                                    >
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>Name</label>
                                                                    <h5>{val.first_name}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>Email ID</label>
                                                                    <h5>{val.email}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>Contact Number</label>
                                                                    <h5>{val.phone}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>Gender</label>
                                                                    <h5>Male</h5>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>Address</label>
                                                                    <h5>{val.address}</h5>
                                                                </div>
                                                            </div>
                                                            {/* <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>Country</label>

                                                                    <h5>India</h5>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>State</label>
                                                                    <h5>Haryana</h5>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>City</label>
                                                                    <h5>Faridabad</h5>
                                                                </div>
                                                            </div> */}
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>Postal/ZIP Code</label>
                                                                    <h5>121001</h5>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="contact-form-submint-btn-area">

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        );
                                    })}
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer text-center">
                    {" "}
                    2021 © Ample Admin brought to you by{" "}
                    <a href="https://www.wrappixel.com/">wrappixel.com</a>
                </footer>
            </div>
        </>
    );
};
export default CustomersDetails;
