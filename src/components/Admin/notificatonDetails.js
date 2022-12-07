import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import { URL } from '../../url/url';
import NotificationList from '../Admin/NotificationList';

const NotificationDetails = () => {

  const { id } = useParams();
  const [notifications, getNotificationsDetails] = useState([])

    useEffect(()=>{
      showdetails()
    },[])
    
    const showdetails = async ()=>
    {
      let request = {'id': id}
      console.log(request);
      let response = await axios.post(URL + "/notificationDetails",request)
      //console.log(response.data.data[0]['id'])
      
      getNotificationsDetails(response.data.data[0])
    
    }
    console.log("notifications error checking")
    //console.log(notifications.customerName[0].first_name)
    //console.log(notifications.customerName[0].first_name)
    console.log("notifications error checking")
   
    const getUserTypeName = (userType) =>{
      if(userType == 0)
      {
        return 'All';
      }
      else if(userType == notifications.user_id)
      {
        return "hello";
      }
      else if(userType==3)
      {
        return 'End User';
      }
      else if(userType==4)
      {
        return 'All';
      }
      return '';
  }

    
   
    


  return (
    <div class="container-fluid">
             <div className="row">
              <div className="col-lg-12">
                <div className="application-detail-heading-area" style={{padding: "10px", position: "relative", right:'460px'}}>
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
                       <h4> {
                                   //notifications.customerName[0].first_name
                                   notifications.user_id === 0 ? 'All' : notifications.first_name + '  '+ notifications.last_name 
                                  }</h4>  
                      </div>  
                    </div>
                    <div className="admin-contact-detail-area"> 
                     <h4>Subject: <span>{notifications.title}</span></h4>
                    </div>
                   </div> 
                  </div> 
                  <div className="col-lg-6">
                   <div className="contact-inquirie-area"> 
                     <h4>Date: <span>{Moment(notifications.date).format('YYYY-MM-DD HH:MM')}</span></h4>
                    </div>
                  </div>  
                 </div>
                </div>
                <div className="contact-inquiries-massege-details">
                 <p>{notifications.description}</p> 
                 
                 {/* <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>   */}
                </div>
              </div>
            </div>
         </div>
  )
}

export default NotificationDetails