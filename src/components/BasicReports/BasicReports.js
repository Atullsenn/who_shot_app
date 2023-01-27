import React, { useState, useEffect } from "react";
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { URL } from "../../url/url";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from 'axios';
import diloguebox from "./diloguebox";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from "react-bootstrap/Modal";
import { Select } from "@material-ui/core";
import {toast} from 'react-toastify';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'




const BasicReports = () => {
    const [basicReport, setBasicReport] = useState([])
    const [age, setAge] = React.useState('');
    const [dataName, setDataName] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [status, setStatus] = useState(0)
    const [search, setSearch] = useState("");
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(basicReport.length / usersPerPage);

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenSecond, setIsOpenSecond] = useState(false)

    const getData = async () => {
        await axios.get(URL + '/getallbooking').then(res => {
            setDataName(res.data.message)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    //Handle Status
    const handleStatus = async (status, usersID) => {
        var getStatus = "";
        if (status === 0) {
            getStatus = 1;
        } else {
            getStatus = 0;
        }
        const request = {
            id: usersID,
            status: getStatus,
        };

        await axios
            .post(URL + "/updateLocationStatus", request)
            .then((res) => {
                getData()
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //Handle Status


    const closeModal = () => {
        setIsOpen(false);
      };
    
      const openAddApplicationModal = () => {
        setIsOpen(true);
      };


      const closeSecondModal = () => {
        setIsOpenSecond(false);
      };
    
      const openSecondModal = () => {
        setIsOpenSecond(true);
      };


//Download Hunts Report
const [huntReport, setHuntReport] = useState("")
      const downloadReport = ()=>{
        axios.post(URL + '/web/api/downloadReport',{
          Accept: 'Application',
          'ContentType': 'Application/Json'
        }).then(res=>{
          toast.success(res.data.message)
          setHuntReport(res.data)
          DownloadFile(res.data.data)
        }).catch(err=>{
          console.log(err)
        })
      }

 //Download Hunter Report
 const [hunterReport, setHunterReport] = useState("")

 const downloadHunterReport = ()=>{
  axios.post(URL + '/web/api/downloadHunterReport',{
    Accept: 'Application',
    'Content-Type': 'Application/Json'
  }).then(res=>{
    toast.success(res.data.message)
    setHunterReport(res.data)
    DownloadHunterReport(res.data.data)
  }).catch(err=>{
    console.log(err)
  })
 }

 


      // Get Basic Report

      const getBasicReport = ()=>{
        axios.get(URL + '/web/api/basicReport',{
          Accept: 'Application',
          'Content_Type': 'Application/Json'
        }).then(res=>{
          setBasicReport(res.data.data)
        }).catch(err=>{
          console.log(err)
        })
       
      }


      useEffect(()=>{
        getBasicReport()
      },[])



var link = ""
      function DownloadFile(fileName) {
        //Set the File URL.
        var url = `http://localhost:8000/pdf/${huntReport.data}`;

        //Create XMLHTTP Request.
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "blob";
        req.onload = function () {
            //Convert the Byte Data to BLOB object.
            var blob = new Blob([req.response], { type: "application/octetstream" });

            //Check the Browser type and download the File.
            var isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                var url = window.URL || window.webkitURL;
                link = url.createObjectURL(blob);
                var a = document.createElement("a");
                a.setAttribute("download", fileName);
                a.setAttribute("href", link);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        };
        req.send();
    };





    var link2 = ""
      function DownloadHunterReport(fileName) {
        //Set the File URL.
        var url = `http://localhost:8000/pdf/${hunterReport.data}`;

        //Create XMLHTTP Request.
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "blob";
        req.onload = function () {
            //Convert the Byte Data to BLOB object.
            var blob = new Blob([req.response], { type: "application/octetstream" });

            //Check the Browser type and download the File.
            var isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                var url = window.URL || window.webkitURL;
                link2 = url.createObjectURL(blob);
                var a = document.createElement("a");
                a.setAttribute("download", fileName);
                a.setAttribute("href", link2);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        };
        req.send();
    };



    return (
      <>
        <div className="container-fluid ">
          <Modal
            show={isOpen}
            style={{
              width: "700px",
              height: "600px",
              position: "absolute",
              left: "450px",
            }}
          >
            <Modal.Header>
              <button
                type="button"
                onClick={closeModal}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </Modal.Header>
            <Modal.Body>
              <div className="application-heading-text-area">
                <h1>Download Hunts Report</h1>
                <p>Choose Type</p>
              </div>
              <div className="application-input-text-box">
                {/* <input
              type="text"
            //   onChange={(e) => setApplicationName(e.target.value)}
              placeholder="Application Name"
              className="form-control"
            /> */}
              </div>
              <div className="create-application-btn-area">
                <a
                  href="javascript:void(0)"
                  onClick={downloadReport}
                  className="create-application-btn"
                >
                  Download Report{" "}
                </a>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            show={isOpenSecond}
            style={{
              width: "700px",
              height: "600px",
              position: "absolute",
              left: "450px",
            }}
          >
            <Modal.Header>
              <button
                type="button"
                onClick={closeSecondModal}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </Modal.Header>
            <Modal.Body>
              <div className="application-heading-text-area">
                <h1>Download Hunters Report</h1>
                <p>Choose Type</p>
              </div>
              {/* <div className="application-input-text-box">
            <input
              type="text"
            //   onChange={(e) => setApplicationName(e.target.value)}
              placeholder="Application Name"
              className="form-control"
            />
          </div> */}
              <div className="create-application-btn-area">
                <a
                  href="javascript:void(0)"
                  onClick={downloadHunterReport}
                  className="create-application-btn"
                >
                  Download Report{" "}
                </a>
              </div>
            </Modal.Body>
          </Modal>

          <div className="add-location">
            <div className="booking-wrapper">
              <div className="row">
                <div className="py-2 d-flex justify-content-between align-items-center">
                  <div>
                    <div className="heading-top">
                      <h2>Basic Reports</h2>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={openAddApplicationModal}
                      type="button"
                      style={{
                        position: "relative",
                        gap: "10px",
                        left: "250px",
                        border: "none",
                        backgroundColor: "#912c00",
                        width: "110px",
                        height: "40px",
                        color: "white",
                        borderRadius: "8px",
                      }}
                    >
                      Hunts Report
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={openSecondModal}
                      type="button"
                      style={{
                        position: "relative",
                        left: "100px",
                        border: "none",
                        backgroundColor: "#912c00",
                        width: "110px",
                        height: "40px",
                        color: "white",
                        borderRadius: "8px",
                      }}
                    >
                      Hunters Report
                    </button>
                  </div>

                  <div>
                    <div className="table-data-search-box-manage">
                      <div className="search-bar">
                        <input
                          type="text"
                          onChange={(e) => setSearch(e.target.value)}
                          className="searchTerm-input"
                          placeholder="Search"
                        />

                        
                        <button type="submit" className="searchButtons">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {basicReport.length === 0 ?
            <div className="manage-admins-main-area">
<div className="manage-admins-table-area">
            <table className="table table-column-center" >
  <thead>
    <tr>
    <SkeletonTheme baseColor="#912c00" highlightColor="#777777">
    <th>
      <Skeleton width={80} height={40}/>
    </th>
    {/* <th>
      <Skeleton width={80} height={40}/>
    </th> */}
    <th>
      <Skeleton width={80} height={40}/>
    </th>
    <th>
      <Skeleton width={80} height={40}/>
    </th>
    <th>
      <Skeleton width={80} height={40}/>
    </th>
    <th>
      <Skeleton width={80} height={40}/>
    </th>
    <th>
      <Skeleton width={80} height={40}/>
    </th>
    <th>
      <Skeleton width={80} height={40}/>
    </th>

    </SkeletonTheme>

    </tr>
    
  </thead>
  <tbody>
    <tr>
      <td>
        <Skeleton count={5} width={80} height={45}/>
      </td>
      {/* <td>
        <Skeleton count={5} width={45} height={45} circle={true}/>
      </td> */}
      <td>
        <Skeleton count={5} width={80} height={45}/>
      </td>
      <td>
        <Skeleton count={5} width={80} height={45}/>
      </td>
      <td>
        <Skeleton count={5} width={80} height={45}/>
      </td>
      <td>
        <Skeleton count={5} width={80} height={45}/>
      </td>
      <td>
        <Skeleton count={5} width={80} height={45}/>
      </td>
      <td>
        <Skeleton count={5} width={80} height={45}/>
      </td>
    </tr>
  </tbody>
</table>
</div>
</div> :





            <div className="manage-admins-main-area">
              <table class="table table-column-center">
                <thead>
                  <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Hunt Name</th>
                    <th scope="col">No. of Registration</th>
                    <th scope="col">Total Shots</th>
                    <th scope="col">Top Hunter</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    {/* <th scope="col">Action</th> */}
                  </tr>
                </thead>
                <tbody>
          
                  {basicReport
                    .filter(
                      (row) =>
                        !search.length ||
                        row.huntName
                          .toString()
                          .toLowerCase()
                          .includes(search.toString().toLowerCase()),
                           
                    )
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    .map((Item, i) => {
                      return (
                        <tr>
                          <td>{i + pagesVisited + 1}</td>
                          <td>{Item.huntName}</td>
                          <td>{30}</td>
                          <td>{120}</td>
                          <td>{260}</td>
                          <td>{Item.startDate}</td>
                          <td>{Item.endDate}</td>
                          {/* <td> <DeleteForever style={{ color: "#912c00" }} /> </td> */}
                        </tr>
                      );
                    })}
                 
                </tbody>
              </table>
              <div
                style={{ display: basicReport.length > 5 ? "block" : "none" }}
              >
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </div>
            </div>
}
          </div>
        </div>
        <footer className="footer text-center">
          {" "}
          2023 © Admin Panel brought to you by
          <a href="https://www.webnmobappssolutions.com">
            webnmobappssolutions.com
          </a>
        </footer>
      </>
    );
}

export default BasicReports;