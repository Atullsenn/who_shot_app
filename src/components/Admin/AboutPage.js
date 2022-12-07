import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../../url/url";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const AboutPage = () => {
  const [heading, setHeading] = useState([]);
  const [description, setDescription] = useState([]);

  //formValidation
  const [headingError, setHeadingError] = useState("");
  const headingRegex = /^[#.0-9a-zA-Z\s,-]{0,50}$/;
  const [descriptionError, setDescriptionError] = useState("");
  const descriptionRegex = /^[#.0-9a-zA-Z\s,-]{0,50}$/;

  //formValidation

  const submit = (e) => {
    console.log(heading, description);
    let data = { heading, description };
    fetch("http://localhost:8000/aboutUs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((data) => {
          toast.success("About Page Created Successfully");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    await axios
      .get("http://localhost:8000/getAboutUs")
      .then((res) => {
        console.log(res.data.message);
        // console.log(res.data[0].heading);
        // console.log(res.data[0].description);
        setHeading(res.data.data[0].heading);
        setDescription(res.data.data[0].description);
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
                <h2>Create About Page</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="contact-notification-detail-main-area">
                <form className="send-notifications-form-area">
                  <div className="form-group">
                    <label>About </label>
                    <input
                      type="text"
                      className="form-control field"
                      name="holdername"
                      placeholder="Enter Heading"
                      autofocus=""
                      required=""
                      id="name"
                      value={heading}
                      onChange={(e) => {
                        setHeading(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    {/* <textarea className="form-control" placeholder="Enter Description" value={description} onChange={(e)=>{
                                            setDescription(e.target.value)
                                        }}></textarea> */}
                    <CKEditor
                      editor={ClassicEditor}
                      data={description}
                      onReady={(editor) => {
                        console.log("Editor is ready to use!", editor);
                      }}
                      // onChange={(e) => { setDescriptions(e.target.value) }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data);

                        // console.log({ event, editor, data });
                      }}
                      onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                      }}
                    />
                  </div>
                  <div className="contact-form-submint-btn-area">
                    <button
                      className="contact-form-submint-btn"
                      onClick={submit}
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
      </div>
    </>
  );
};

export default AboutPage;
