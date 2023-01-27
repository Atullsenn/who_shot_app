import React, { useState, useEffect } from "react";
import DeleteForever from "@material-ui/icons/DeleteForever";
import { Link, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReactPaginate from "react-paginate";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "axios";
import { URL } from "../../url/url";
import { toast } from "react-toastify";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AllHunters = () => {
  // const id = useParams()
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(datas.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //getHunterData
  const getHuntData = () => {
    axios
      .get(URL + "/web/api/getAllHunters", {
        Accept: "Application",
        "Content-Type": "application/json",
      })
      .then((res) => {
        setDatas(res.data.hunters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHuntData();
  }, []);

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
                      <h2>All Hunters</h2>
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


              {datas.length === 0 ? 

<div className="manage-admins-main-area">
<div className="manage-admins-table-area">
            <table className="table table-column-center" >
  <thead>
    <tr>
    <SkeletonTheme baseColor="#912c00" highlightColor="#777777">
    <th>
      <Skeleton width={150} height={40}/>
    </th>
    <th>
      <Skeleton width={150} height={40}/>
    </th>
    <th>
      <Skeleton width={150} height={40}/>
    </th>
    <th>
      <Skeleton width={150} height={40}/>
    </th>
    <th>
      <Skeleton width={150} height={40}/>
    </th>
    <th>
      <Skeleton width={150} height={40}/>
    </th>

    </SkeletonTheme>

    </tr>
    
  </thead>
  <tbody>
    <tr>
      <td>
        <Skeleton count={5} width={150} height={45}/>
      </td>
      <td>
        <Skeleton count={5} width={45} height={45} circle={true}/>
      </td>
      <td>
        <Skeleton count={5} width={150} height={45}/>
      </td>
      <td>
        <Skeleton count={5} width={150} height={45}/>
      </td>
      <td>
        <Skeleton count={5} width={150} height={45}/>
      </td>
      <td>
        <Skeleton count={5} width={150} height={45}/>
      </td>
    </tr>
  </tbody>
</table>
</div>
</div> : 




              <div className="manage-admins-main-area">
                <div className="manage-admins-table-area">
                  <table className="table table-column-center">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Profile </th>
                        <th> Name </th>
                        <th>Total Hunts</th>
                        <th>Recent Active(Date)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datas
                        .filter(
                          (row) =>
                            !search.length ||
                            row.fullName
                              .toString()
                              .toLowerCase()
                              .includes(search.toString().toLowerCase()),
                        )

                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((Item, i) => {
                          return (
                            <tr>
                              <td>{i + pagesVisited + 1}</td>
                              <td>
                                <div className="d-flex align-items-center justify-content-center">
                                  <LazyLoadImage
                                    src={
                                      Item.profile === ""
                                        ? "https://mui.com/static/images/avatar/2.jpg"
                                        : `${URL}/image/${Item.profile}`
                                    } 
                                    style={{
                                      width: "45px",
                                      height: "45px",
                                      borderRadius: "50px",
                                    }}
                                    effect="blur"
                                    visibleByDefault={false}
                                  />
                                </div>
                              </td>
                              <td>{Item.fullName}</td>
                              <td>{Item.totalJoinedHunts}</td>
                              <td>05/01/2023</td>
                              <td>
                                <DeleteForever style={{ color: "#912c00" }} />
                                {/* <EditIcon style={{ color: "#912c00" }} /> */}
                                {/* <InfoIcon style={{ color: "#912c00" }} /> */}
                                <Link
                                  to={`/app/hunter-details/${Item.id}`}
                                  className="mange-admins-dlt-btn"
                                >
                                  <i
                                    className="fas fa-eye"
                                    style={{ color: "#912c00" }}
                                  ></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div style={{ display: datas.length > 5 ? "block" : "none" }}>
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
}
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

export default AllHunters;
