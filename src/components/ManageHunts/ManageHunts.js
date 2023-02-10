import React, { useEffect, useState } from "react";
import DeleteForever from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import "reactjs-popup/dist/index.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URL } from "../../url/url";
import InfoIcon from '@mui/icons-material/Info';
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

toast.configure()

const ManageHunts = ({ label }) => {
  const [dataName, setDataName] = useState([]);
  const [search, setSearch] = useState("");

  const [activeStatus, setActiveStatus] = useState(true);
  const [status, setStatus] = useState(0)
  const [pageNumber, setPageNumber] = useState(0);
  const id = useParams();
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(dataName.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  const getHuntData = ()=>{
    axios.get(URL + '/web/api/getHunts',{
      Accept: 'Application',
      'Content-Type': 'application/json'
    }).then(res=>{
      setDataName(res.data.Hunts)
    }).catch(err=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    getHuntData()
  },[])



  //Handle Status
  const handleStatus = async(hunt_status, huntID) => {
    var getStatus = "";
    if (hunt_status === 0) {
      getStatus = '1';
    } else {
      getStatus = '0';
    }

    // console.log(hunt_status+" , "+ huntID);
    const request = {
      id: huntID,
      hunt_status: getStatus,
    };

    await axios
      .post(URL + '/web/api/huntStatus', request)
      .then((res) => {
        if(res){
          getHuntData() 
          toast.success(res.data.message)

        }
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Handle Status


  //notifiacation Delete
  const huntDelete = (th) => {
    axios
      .post(URL + "/web/api/deleteHunt", { id: th })
      .then((res) => {
        getHuntData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleremove = (e, th) => {
    const text = "Are you sure want to delete"
    if (window.confirm(text) == true) {
      toast.success("Data deleted successfully");
      huntDelete(th);
      return true
    } else {
      toast.warn("You cancelled!");
      return false
    }
    
  };
  //notification Delete

  

  return (
    <>
      <div className="container-fluid ">
        <div className="add-location">
          <div className="booking-wrapper">
            <div className="row">
              <div className="py-2 d-flex justify-content-between align-items-center">
                <div>
                  <div className="heading-top">
                    <h2>Manage Hunts</h2>
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
          </div>

          {dataName.length === 0 ? 

<div className="manage-admins-main-area">
<div className="manage-admins-table-area">
            <table className="table table-column-center" >
  <thead>
    <tr>
    <SkeletonTheme baseColor="#912c00" highlightColor="#777777">
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
      <td>
        <Skeleton count={5} width={45} height={45} circle={true}/>
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
      <td>
        <Skeleton count={5} width={80} height={45}/>
      </td>
    </tr>
  </tbody>
</table>
</div>
</div> : 




          <div className="manage-admins-main-area">
            <table class="table" style={{ textAlign: 'center' }}>
              <thead>
                <tr>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Hunt Name</th>
                  <th scope="col">Total Participants</th>
                  <th scope="col">Created Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Action</th>
                  <th scope="col">Active/Inactive</th>
                </tr>
              </thead>
             
              
              <tbody>
               
                {dataName.filter(
                    (row) =>
                      !search.length ||
                      row.huntName
                        .toString()
                        .toLowerCase()
                        .includes(search.toString().toLowerCase()),
                  )
                  .slice(pagesVisited, pagesVisited + usersPerPage).map((Item,i) => {
                  return (
                    <tr>
                      <td>{i + pagesVisited + 1}</td>
                      <td>
                        {
                          <LazyLoadImage
                            src={
                              Item.huntProfile === ""
                                ? "https://mui.com/static/images/avatar/2.jpg"
                                : `${URL}/image/${Item.huntProfile}`
                            }
                            style={{
                              width: "45px",
                              height: "45px",
                              borderRadius: "50px",
                            }}
                            effect="blur"
                            visibleByDefault={false}
                          />
                        }
                      </td>
                      <td>{Item.huntName}</td>
                      <td>{Item.totalParticipants}</td>
                      <td>{moment(Item.createdDate).format("L")}</td>
                      <td>{Item.endDate || "-----"}</td>
                      <td>
                        <Link
                          to={`/app/manage-hunts`}
                          datalist={Item.huntID}
                          onClick={(e) => handleremove(e, Item.huntID)}
                        >
                          <DeleteForever style={{ color: "#912c00" }} />
                        </Link>
                        {/* <EditIcon style={{ color: "#912c00" }} /> */}
                        <Link
                          to={`/app/hunt-details/${Item.huntID}`}
                          className="mange-admins-dlt-btn"
                        >
                          {/* <InfoIcon style={{ color: "#912c00" }} /> */}
                          <i
                            className="fas fa-eye"
                            style={{ color: "#912c00" }}
                          ></i>
                        </Link>
                      </td>
                      <td>
                        <BootstrapSwitchButton
                          onlabel="Active"
                          checked={Item.huntStatus == 0 ? true : false}
                          width={100}
                          offlabel="Inactive"
                          onstyle="success"
                          onChange={(checked) => {
                            handleStatus(Item.huntStatus, Item.huntID);
                            setStatus(checked);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
                {/* {dataName
                  .filter(
                    (row) =>
                      !search.length ||
                      row.location
                        .toString()
                        .toLowerCase()
                        .includes(search.toString().toLowerCase()),
                  )
                  .slice(pagesVisited, pagesVisited + usersPerPage)
                  .map((item, i) => (
                    <tr>
                      <th className="manage-location-count" scope="row">{i + pagesVisited + 1}</th>
                      <td>{item.location}</td>
                      <td className="action-btn-inline">
                        <Link>
                          <EditLocation sendId={item.id} />
                        </Link>
                        <Link
                          to={`/app/managelocation`}
                          datalist={item.id}
                          onClick={(e) => handleremove(e, item.id)}
                          className="mange-admins-dlt-btn"
                        >
                          <DeleteForever
                            onClick={() => {
                              Abc("Manish");
                            }}
                            style={{ color: "#FF5C93" }}
                          />
                        </Link>
                      </td>
                      <td> */}
                {/* <input type="checkbox" onClick={()=>handleStatus(item.status,item.id)} data-toggle="toggle" data-on="Enabled" data-off="Disabled"/> */}
                {/*                       
                        <BootstrapSwitchButton
                          onlabel="Active"
                          checked={item.status == 0 ? true : false}
                          width={100}
                          offlabel="Inactive"
                          onstyle="success"
                          onChange={(checked) => {
                            handleStatus(item.status,item.id)
                            setStatus(checked)
                          }}
                        />
                      </td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
            <div style={{ display: dataName.length > 5 ? "block" : "none" }}>
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
        2023 ©Admin Panel brought to you by <i> </i>
        <a href="https://www.webnmobappssolutions.com">
          webnmobappssolutions.com
        </a>
      </footer>
    </>
  );
};

export default ManageHunts;