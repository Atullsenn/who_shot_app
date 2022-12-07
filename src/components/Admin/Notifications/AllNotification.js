import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NotificationList from '../../Admin/NotificationList'
import axios from "axios";
import { URL } from "../../../url/url";
import moment from "moment";
import {toast} from 'react-toastify';

const AllNotification = () => {

  // const [type, setType] = useState(1);

  // const [data, getData] = useState([]);
  const [data, setDataName] = useState([])
  const id  = useParams()
  const getData = async () => {
    await axios.get(URL + '/getNotifications').then(res => {
      setDataName(res.data.data)
      console.log(res.data.data)
      console.log("checking dataaaaaaaaaaaaaa")
    }).catch(err => {
      console.log(err)
      console.log("err")
    })
  }
  useEffect(() => {
    getData()
  }, [])

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [search,setSearch] = useState("");
  
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  //pagination

  const getUserTypeName = (userType)=>{
    if(userType == 0){
      return "All"
    }
   
      return data[0].first_name
    
  }


  //notifiacation Delete
  const notificationDeleteStatus = (th) => {
    axios
      .post(URL + "/notificationDelete", { id: th })
      .then((res) => {
        // console.log(res);
        getData();
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleremove = (e, th) => {
    //console.log(th);
    const text = "Are you sure want to delete"
    if (window.confirm(text) == true) {
        toast.success("Data deleted successfully");
        notificationDeleteStatus(th);
        return true
      } else {
        toast.warn("You canceled!");
        return false
      }
   
  };

  //notification Delete

  return (
    <div className="page-wrapper" >
      <div className="container-fluid">
        <div className="add-location">

          <div className="row">
            <div className="col-md-6">
              <div className="heading-top" >
                <h2>Notification List</h2>
              </div>
            </div>
            <div className="col-md-3">
            </div>
            <div className="col-md-3 add-notification">
              <NotificationList />
            </div>
            <div className="manage-admins-main-area">
              <div className="manage-admins-table-area">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr. no.</th>
                      <th>Customer Name</th>
                      <th>Title</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    data.filter(
                                        (row) =>
                                          !search.length ||
                                          row.parking_id
                                            .toString()
                                            .toLowerCase()
                                            .includes(search.toString().toLowerCase()),
                                      )
                                      .slice(pagesVisited, pagesVisited + usersPerPage).map((item,i)=>(

                    
                  
                    <tr>
                      <td>{i + pagesVisited + 1}</td>
                      <td>
                      {/* {item.user_id === 0 ? 'All' : item.first_name} */}
                      {item.customerName === 'All' ? item.customerName : item.customerName[0].first_name + ' ' + item.customerName[0].last_name}
                      </td>
                      <td>{item.title.substr(0,25) + ".."}</td>
                      <td>{item.description.substr(0, 20) + ".."}</td>
                      <td>
                        {moment(item.date).format('YYYY-MM-DD : HH:MM')}
                      </td>
                      <td>
                        <Link
                          to={`/app/notificationDetails/${item.id}`}
                          className="mange-admins-edit-btn"
                        >
                          <i class="fas fa-eye"></i>
                        </Link>
                        <Link
                          to={`/app/notifications`}
                          datalist={item.id}
                          onClick={(e) => handleremove(e, item.id)}


                          className="mange-admins-dlt-btn"
                        >
                          <i class="far fa-trash-alt"></i>
                        </Link>
                      </td>
                    </tr>
                     
                    ))}
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

          </div>

        </div>
      </div>
      <footer className="footer text-center"> 2022 © Admin Panel brought to you by <a
        href="https://https://www.webnmobappssolutions.com">webnmobappssolutions.com</a>
      </footer>
    </div >
  );
};

export default AllNotification;
