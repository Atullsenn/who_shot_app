// import React,{useState,useEffect} from 'react'
// import { URL } from '../../../url/url';

// const Privacypolicy = () => {
//     const [data, getData] = useState([]);
//     // const URL = "http://localhost:5000/getprivacypolicy";
  
//     useEffect(() => {
//       fetchData();
//     }, []);

    
  
//     const fetchData = () => {
//       fetch( URL + "/getprivacypolicy")
//         .then((res) => res.json())
  
//         .then((response) => {
//         //   console.log(response.data[0]);
//           getData(response.data)
//         });
//     };
//   return (
//     <div class="page-wrapper" style={{minHeight:"250px"}}>
//     <div className="container-fluid">
//              <div className="row">
//               <div className="col-lg-12">
//                 <div className="application-detail-heading-area" style={{position: "relative", padding: "15px"}}>
//                  <h2>Privacy & Policy</h2>
//                  <div class="send-notifications-btn-area">
//                  <a href="#/app/create-privacy-policy/" class="send-notifications-btn">Create Privacy Policy</a>   
//                 </div>
//                </div>
              
               
//                <div className="contact-detail-main-area">
//                 <div className="row">
//                  <div className="col-lg-12">
//                   {/* <!-- <div class="contact-heading-area">
//                    <h2>Privacy & Policy</h2> 
//                   </div> --> */}
//                   {data.map((item)=>(
//                   <div className="terms-conditions-detail-area">
//                       <h1>{item.heading}</h1>
//                       <p>{item.descriptions}</p>
                      
//                    {/* <h1>1. What Is Privacy Policy?</h1> 
//                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

//                    <h1>2. To Whom Does This Privacy Policy Apply?</h1> 
//                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

//                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose</p>

//                    <h1>3. What Personal Data Do We Process?</h1>
//                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

//                    <h1>4. The Collection, Process, And Use Of Personal Data</h1>
//                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> */}
//                   </div> 
//                   ))}
//                  </div>   
//                 </div>
//                </div>
//               </div>
//             </div>
//          </div>

//          <footer class="footer text-center"> 2021 © Ample Admin brought to you by <a
//             href="https://www.wrappixel.com/">wrappixel.com</a>
//     </footer>
//          </div>
//   )
// }

// export default Privacypolicy;

// // .application-detail-heading-area {
// //     position: relative;
// // }