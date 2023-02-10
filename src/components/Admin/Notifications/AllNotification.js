import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NotificationList from "../../Admin/NotificationList";
import axios from "axios";
import { URL } from "../../../url/url";
import DeleteForever from "@material-ui/icons/DeleteForever";
import moment from "moment";
import { toast } from "react-toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllNotification = () => {
  // const [type, setType] = useState(1);
  // const [data, getData] = useState([]);
  const id = useParams();
  const [data, setDataName] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.length / usersPerPage);

  //get notification api
  const getNotification = () => {
    axios
      .get(URL + "/web/api/getNotification", {
        Accept: "Application",
        "Content-Type": "Application/Json",
      })
      .then((res) => {
        setDataName(res.data.data);
        getNotification();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNotification();
  }, []);

  //get notification api

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getUserTypeName = (userType) => {
    if (userType == 0) {
      return "All";
    }
    return data[0].first_name;
  };

  //notifiacation Delete
  const notificationDeleteStatus = (th) => {
    axios
      .post(URL + "/web/api/deleteNotification", { id: th })
      .then((res) => {
        getNotification();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleremove = (e, th) => {
    const text = "Are you sure want to delete"
    if (window.confirm(text) == true) {
      toast.success("Data deleted successfully");
      notificationDeleteStatus(th);
      return true
    } else {
      toast.warn("You cancelled!");
      return false
    }
  };
  //notification Delete

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="add-location notification-page">
          <div className="row">
            <div className="py-2 px-0 d-flex justify-content-between align-items-center">
              <div className="heading-top">
                <h2>Notification List</h2>
              </div>
              <div className="col-md-3 add-notification">
                <NotificationList />
              </div>
            </div>
            {data.length === 0 ? (
              <div className="manage-admins-main-area">
                <div className="manage-admins-table-area">
                  <table className="table table-column-center">
                    <thead>
                      <tr>
                        <SkeletonTheme
                          baseColor="#912c00"
                          highlightColor="#777777"
                        >
                          <th>
                            <Skeleton width={150} height={40} />
                          </th>
                          <th>
                            <Skeleton width={150} height={40} />
                          </th>
                          <th>
                            <Skeleton width={150} height={40} />
                          </th>
                          <th>
                            <Skeleton width={150} height={40} />
                          </th>
                          <th>
                            <Skeleton width={150} height={40} />
                          </th>
                          <th>
                            <Skeleton width={150} height={40} />
                          </th>
                        </SkeletonTheme>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Skeleton count={5} width={150} height={45} />
                        </td>
                        <td>
                          <Skeleton count={5} width={150} height={45} />
                        </td>
                        <td>
                          <Skeleton count={5} width={150} height={45} />
                        </td>
                        <td>
                          <Skeleton count={5} width={150} height={45} />
                        </td>
                        <td>
                          <Skeleton count={5} width={150} height={45} />
                        </td>
                        <td>
                          <Skeleton count={5} width={150} height={45} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="manage-admins-main-area">
                <div className="manage-admins-table-area">
                  <table className="table table-column-center">
                    <thead>
                      <tr>
                        <th>Sr. no.</th>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((Item, i) => {
                          return (
                            <tr>
                              <td>{i + pagesVisited + 1}</td>
                              <td>
                                <img
                                  src={
                                    Item.profile === ""
                                      ? "https://mui.com/static/images/avatar/2.jpg"
                                      : `${URL}/image/${Item.profile}`
                                  }
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "red 1px solid",
                                    borderRadius: "30px",
                                  }}
                                  alt="profile"
                                />
                              </td>
                              <td>{Item.Name}</td>
                              <td>{Item.subject.substr(0, 25) + ".."}</td>
                              <td>{Item.description.substr(0, 25) + ".."}</td>
                              <td>{moment(Item.date).format("L")}</td>
                              <td>
                                <Link
                                  to={`/app/notificationDetails/${Item.id}`}
                                  className="mange-admins-edit-btn"
                                >
                                  <i
                                    class="fas fa-eye"
                                    style={{ color: "#912c00" }}
                                  ></i>
                                </Link>
                                <Link
                                  to={`/app/notifications`}
                                  datalist={Item.id}
                                  onClick={(e) => handleremove(e, Item.id)}
                                >
                                  <DeleteForever
                                    style={{ color: "#912c00", height: "25px" }}
                                  />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div style={{ display: data.length > 5 ? "block" : "none" }}>
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
            )}
          </div>
        </div>
      </div>
      <footer className="footer text-center">
        {" "}
        2023 © Admin Panel brought to you by <i></i>
        <a href="https://www.webnmobappssolutions.com">
          webnmobappssolutions.com
        </a>
      </footer>
    </div>
  );
};

export default AllNotification;
