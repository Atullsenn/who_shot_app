import React, { useState, useEffect } from "react";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Pagination from '@mui/material/Pagination'
import { Link } from "react-router-dom";
import DeleteForever from '@material-ui/icons/DeleteForever';
import ReactPaginate from 'react-paginate'
import { URL } from "../../url/url";
import axios from "axios";
import { toast } from 'react-toastify';

const Statistics = () => {
  const [status, setStatus] = useState(0)
  const [custmerData, setCustomerData] = useState([])
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(custmerData.length / usersPerPage);

  const GetAllCoustomer = () => {
    axios.get(URL + '/getAllCustomers', {
      Accept: 'Application',
      'Content-type': 'Application/json'
    }).then((res) => {
      setCustomerData(res.data.message)
    }).catch(err => console.log('err'))
  }

  useEffect(() => {
    GetAllCoustomer()
  }, [])

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
      .post(URL + "/updateStatus", request)
      .then((res) => {
        GetAllCoustomer()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Handle Status

  //customer Delete
  const customerDeleteStatus = (th) => {
    axios
      .post(URL + "/customerDelete", { id: th })
      .then((res) => {
        GetAllCoustomer()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleremove = (e, th) => {
    const text = "Are you sure want to delete"
    if (window.confirm(text) == true) {
      toast.success("Data deleted successfully");
      customerDeleteStatus(th);
      return true
    } else {
      toast.warn("You canceled!");
      return false
    }
  };
  //customer Delete

  const data = [
    { status: 0, id: '1', activityName: 'Himanshu Suratiya', profile: 'its_himanshu_0007', noOfActivities: '125', noOfParticipation: '5', noOfTransaction: '2' },
    { status: 1, id: '2', activityName: 'Vishal Singh', profile: 'vishal09862', noOfActivities: '254', noOfParticipation: '12', noOfTransaction: '8' },
    { status: 1, id: '3', activityName: 'Sourabh Shukla', profile: '123_Sourabh', noOfActivities: '45', noOfParticipation: '17', noOfTransaction: '4' },
    { status: 0, id: '4', activityName: 'Shivam Suratiya', profile: 'Shivam_007', noOfActivities: '27', noOfParticipation: '3', noOfTransaction: '2' },
    { status: 1, id: '5', activityName: 'Pintu Kashyap', profile: 'Pintu_@#45', noOfActivities: '256', noOfParticipation: '7', noOfTransaction: '0' },
    { status: 0, id: '6', activityName: 'Virender Kumar', profile: 'Kumar123&', noOfActivities: '0', noOfParticipation: '4', noOfTransaction: '7' },
  ]

  return (
    <>
      <div className="page-wrapper" style={{ minHeight: "250px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="py-2 d-flex justify-content-between align-items-center">
                  <div>
                    <div className="heading-top">
                      <h2>Statistics</h2>
                    </div>
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
              <div className="manage-admins-main-area">
                <div className="manage-admins-table-area">
                  <table className="table table-column-center">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Activity Name</th>
                        <th>No. of Participation</th>
                        <th>No. Of Activites</th>
                        <th>No. of Transaction</th>
                        <th>View Details</th>
                        <th>Action</th>
                        <th>Active/Inactive</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((Item) => {
                        return (
                          <tr>
                            <td>{Item.id}</td>
                            <td>{Item.activityName}</td>
                            <td>{Item.noOfParticipation}</td>
                            <td>{Item.noOfActivities}</td>
                            <td>{Item.noOfTransaction}</td>
                            <td><span>View</span></td>
                            <td> <DeleteForever style={{ color: "#912c00" }} /> </td>
                            <td>
                              <BootstrapSwitchButton
                                onlabel="Active"
                                checked={Item.status == 0 ? true : false}
                                width={100}
                                offlabel="Inactive"
                                onstyle="success"
                                onChange={(checked) => {
                                  handleStatus(Item.status, Item.id);
                                  setStatus(checked);
                                }}
                              />
                            </td>
                          </tr>
                        )
                      })}
                      {/* {custmerData
                        .filter(
                          (row) =>
                            !search.length ||
                            row.first_name
                              .toString()
                              .toLowerCase()
                              .includes(search.toString().toLowerCase()),
                        )
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((item, i) => (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.first_name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td className="parking-number">
                              <Link to={`/app/customersparkingdetails`}>
                                133
                              </Link>
                            </td>
                            <td className="parking-number">
                              <Link to={`/app/customersdetails/${item.id}`}>
                                <VisibilityIcon />
                              </Link>
                            </td>
                            <td className="parking-number">
                              <Link
                                to={`/app/merchants`}
                                datalist={item.id}
                                onClick={(e) => handleremove(e, item.id)}
                                className="mange-admins-dlt-btn"
                              >
                                <DeleteForever style={{ color: "#FF5C93" }} />
                              </Link>
                            </td>
                            <td>
                              <BootstrapSwitchButton
                                onlabel="Active"
                                checked={item.status == 0 ? true : false}
                                width={100}
                                offlabel="Inactive"
                                onstyle="success"
                                onChange={(checked) => {
                                  handleStatus(item.status, item.id);
                                  setStatus(checked);
                                }}
                              />
                            </td>
                          </tr>
                        ))} */}
                    </tbody>
                  </table>
                  <div
                    style={{
                      display: custmerData.length > 5 ? "block" : "none",
                    }}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center">
        2022 © Admin Panel brought to you by
        <a href="https://https://www.webnmobappssolutions.com">
          webnmobappssolutions.com
        </a>
      </footer>
    </>
  );
};

export default Statistics;