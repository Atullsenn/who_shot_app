import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../../url/url";
import { toast } from "react-toastify";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreatePrivacypolicy = () => {
  var [heading, setHeading] = useState([]);
  var [description, setDescription] = useState([]);
  const [headingError, setHeadingError] = useState("");
  const headingRegex = /^[a-zA-Z .,?!\s]{50,200}$/
  const [descriptionError, setDescriptionError] = useState("");
  const descriptionRegex = /^[a-zA-Z .,?!\s]{100,1000}$/ 
  const submit = (e) => {
    console.log(heading, description);
    let data = { heading, description };
    fetch(URL + "/addPrivacyPolicy", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((data) => {
          //console.log(data)
          toast.success("Privacy Policy Created Successfully");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData1();
  }, []);
  const getData1 = async () => {
    await axios
      .get(URL + "/getprivacypolicy")
      .then((res) => {
        // console.log(res.data[0].heading);
        // console.log(res.data[0].description);
        setHeading(res.data[0].heading);
        setDescription(res.data[0].description);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="page-wrapper" style={{ minHeight: "250px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="application-detail-heading-area">
                <h2>Create Privacy & Policy</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="contact-notification-detail-main-area">
                <form className="send-notifications-form-area">
                  <div className="form-group">
                    <label>Heading</label>
                    <input
                      onError={headingError}
                      type="text"
                      className={`form-control field ${
                        !headingError ? "is-valid" : "is-invalid"
                      }`}
                      name="holdername"
                      placeholder="Enter Heading"
                      autofocus=""
                      required=""
                      id="name"
                      value={heading}
                      onChange={(e) => {
                        setHeading(e.target.value);
                        const isSubjectValid = headingRegex.test(e.target.value);
                        setHeadingError(e.target.value != "" && !isSubjectValid);
                      }}
                    />
                    <div className="invalid-feedback">
                      {headingError ? 'Subject should be minimum length 50 and maximum length is 300 character!' : ''}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    {/* <textarea
                     className={`form-control field ${
                      !descriptionError ? "is-valid" : "is-invalid"
                    }`}
                      placeholder="Enter Description"
                      value={description}
                      onError={descriptionError}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        const isDescriptionValid = descriptionRegex.test(e.target.value);
                        setDescriptionError(e.target.value != "" && !isDescriptionValid);
                      }}
                    ></textarea> */}
                    <CKEditor
                    
                    editor={ClassicEditor}
                    data={description}
                    
                    onReady={editor => {
                      console.log('Editor is ready to use!', editor);
                    }}
                    // onChange={(e) => { setDescriptions(e.target.value) }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDescription(data);
                      
                      // console.log({ event, editor, data });
                    }}
                   
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}
                    
                    
                  />
                     <div className="invalid-feedback">
                      {descriptionError ? 'Description should be minimum length 50 and maximum length is 300 character!' : ''}
                    </div>
                  </div>
                  <div className="contact-form-submint-btn-area">
                    <a
                      href="#/app/create-privacy-policy"
                      className="contact-form-submint-btn"
                      onClick={submit}
                    >
                      Submit
                    </a>
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
      </div>
    </>
  );
};

export default CreatePrivacypolicy;


