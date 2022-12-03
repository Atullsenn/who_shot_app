import React, { useState, useEffect } from "react";
import Axios from "axios";
import { URL } from "../../../url/url";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {toast} from 'react-toastify';


const CreateTermsandservices = () => {
  const [heading, setHeading] = useState([])
  const [description, setDescriptions] = useState([])
  const [data, getData] = useState([])

  const createTerms = () => {
    // console.log(heading,"description")
    // console.log(description,"++++++")
    
    let postdata= {heading,description}
    
    fetch(URL + "/addterms&conditions",{
      method:"POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({heading,description})
    }).then((result)=>{
      result.json().then((data)=>{
        toast.success("Success")
        //console.log(data);
      }).catch((err)=>{
        console.log(err)
      })
    })

  };

  useEffect(() => {
    getData1();
    
  }, []);
  
  const getData1 = async () => {
    await Axios.get(URL + '/getterms&conditions').then(res => {
    //console.log(res.data.message[0])
     getData(res.data.message[0]);
     setHeading(res.data.message[0].heading);
     setDescriptions(res.data.message[0].description)     
    }).catch(err => {
      console.log(err)
      console.log("err")
    })
  }

  const editdescription = (e)=>{
    setDescriptions(e.target.value)
  }
  return (
    <>
      <div className="page-wrapper" style={{ minHeight: "250px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="application-detail-heading-area">
                <h2>Create Terms & Conditions</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="contact-notification-detail-main-area">
                <form className="send-notifications-form-area">
                  <div className="form-group">
                    <label>Heading</label>
                    <input type="text" className="form-control field" defaultValue={data.heading} onChange={(e) => { setHeading(e.target.value) }} name="holdername" placeholder="Enter Heading" autofocus="" required="" id="name" value={heading} />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <CKEditor
                    
                      editor={ClassicEditor}
                      data={data.description}
                      
                      onReady={editor => {
                        console.log('Editor is ready to use!', editor);
                      }}
                      // onChange={(e) => { setDescriptions(e.target.value) }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescriptions(data);
                        
                        // console.log({ event, editor, data });
                      }}
                     
                      onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                      }}
                      
                      
                    />
                  </div>
                  <div className="contact-form-submint-btn-area">
                    <a href="#/app/create-terms-and-services" onClick={createTerms} className="contact-form-submint-btn">Submit</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer text-center"> 2022 © Admin Panel brought to you by <a
                    href="https://https://www.webnmobappssolutions.com">webnmobappssolutions.com</a>
                </footer>
      </div>
    </>
  );
};

export default CreateTermsandservices;