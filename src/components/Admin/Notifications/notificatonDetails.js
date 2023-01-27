import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { URL } from '../../../url/url';


const NotificationDetails = () => {
  const { id } = useParams();
  const [notificationsDetails, setNotificationsDetails] = useState([])

  useEffect(() => {
    notificationDetails()
  }, [])

  const notificationDetails = async () => {
    let request = { 'id': id }
    let response = await axios.post(URL + "/web/api/notificationDetailsById", request)
    setNotificationsDetails(response.data.notificationDetails)
  }

  console.log("Checking date")
  console.log(notificationsDetails.date)

  
  const getUserTypeName = (userType) => {
    if (userType == 0) {
      return 'All';
    }
    else if (userType == notificationsDetails.user_id) {
      return "hello";
    }
    else if (userType == 3) {
      return 'End User';
    }
    else if (userType == 4) {
      return 'All';
    }
    return '';
  }

  return (
    <div class="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="application-detail-heading-area" style={{ padding: "10px", position: "relative", right: '460px' }}>
            <h2>Notification Details</h2>
            {/* <div class="col-md-3 add-notification">
                 <NotificationList />
                 <a href="#/app/send-notifications/" class="send-notifications-btn">Send Notification</a>   
                </div> */}
          </div>
          <div className="admin-detail-main-area">
            <div className="row">
              <div className="col-lg-6">
                <div className="admin-detail-list-area">
                  <div className="admin-name-img-area">
                    {/* <div className="admin-detail-img-area">
                      <img src="images/demo-logo.png" alt="logo"/>  
                      </div> */}
                    <div className="admin-name-area">
                      <h4> 
                        Name:{notificationsDetails.Name}
                       </h4>
                    </div>
                  </div>
                  <div className="admin-contact-detail-area">
                    <h4>Subject: <span>{notificationsDetails.title}</span></h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-inquirie-area">
                  <h4>Date: <span>{moment(notificationsDetails.date).format("L")}</span></h4>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-inquiries-massege-details">
            <p>{notificationsDetails.message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationDetails