import React, { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import ReactPaginate from "react-paginate";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import DeleteForever from "@material-ui/icons/DeleteForever";
import axios from "axios";
import { URL } from "../../url/url";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import moment from 'moment';

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const HuntDetail = () => {

  //api for hunt details
  const { id } = useParams();
  const [huntData, setHuntData] = useState([]);
  const [details, setDetails] = useState([]);

  const getHuntDetails = () => {
    let request = { id: id };
    axios
      .post(URL + "/web/api/huntDetalis", request, {
        Accept: "Appllication",
        "Content-Type": "Application/Json",
      })
      .then((res) => {
        setHuntData(res.data.data[0]);
        setDetails(res.data.data[0].huntDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHuntDetails();
  }, []);

  //api for hunt details

  //pagination

  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(details.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //pagination

  return (
    <div className="container-fluid ">
      <div className="add-location">
        <div className="booking-wrapper">
          <div className="row">
            <div className="mb-5">
              <div className="py-2">
                <div className="heading-top">
                  <h2>Hunt Details</h2>
                </div>
              </div>
              <div className="row mx-0">
                <div className="col-lg-4 px-0">
                  <div className="d-flex">
                    <div>
                      <Stack direction="row" spacing={2}>
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <LazyLoadImage
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50px",
                            }}
                            src={
                              huntData.huntProfile == ""
                                ? "https://mui.com/static/images/avatar/2.jpg"
                                : `${URL}/image/${huntData.huntProfile}`
                            }
                            effect="blur"
                          />
                        </StyledBadge>
                      </Stack>
                    </div>
                    <div className="d-flex flex-column justify-content-center px-2 mx-2">
                      <div className="hunt-detail-information">
                        {" "}
                        <span className="hunt-detail-label">Hunt Name :</span>
                        {huntData.huntName}
                      </div>
                      <div className="hunt-detail-information">
                        {" "}
                        <span className="hunt-detail-label">Create Date :</span>
                        {moment(huntData.createdDate).format('L')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 px-0">
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    <div className="w-50 d-flex flex-column align-items-center">
                      <div>
                        <div className="hunt-detail-information">
                          {" "}
                          <span className="hunt-detail-label">
                            Total Killed :
                          </span>
                          {huntData.totalKilled}
                        </div>
                        <div className="hunt-detail-information">
                          {" "}
                          <span className="hunt-detail-label">
                            TotalMissed :
                          </span>
                          {huntData.totalMissed}
                        </div>
                      </div>
                    </div>
                    <div className="w-50 d-flex flex-column align-items-center">
                      <div>
                        <div className="hunt-detail-information">
                          {" "}
                          <span className="hunt-detail-label">
                            Total Wound :
                          </span>
                          {huntData.totalWound}
                        </div>
                        <div className="hunt-detail-information">
                          {" "}
                          <span className="hunt-detail-label">Total Fire:</span>
                          {huntData.totalFire}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 px-0">
                  <div>
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="hunt-detail-label">Live :</span>
                      <Switch checked={true} color="success" />
                    </div>
                    <div className="d-flex justify-content-end pe-2 align-items-center">
                      <span className="hunt-detail-label">
                        Total Participants :{" "}
                      </span>
                      <div className="hunt-detail-information">
                        {huntData.totalParticipants}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-2 d-flex justify-content-between align-items-center">
              <div>
                <div className="heading-top">
                  <h2>List of Hunters involved in Hunt</h2>
                </div>
              </div>
              <div>
                <div className="table-data-search-box-manage">
                  <div className="search-bar">
                    <input
                      type="text"
                      className="searchTerm-input"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
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
        <div className="manage-admins-main-area">
          <table class="table" style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Profile</th>
                <th scope="col">Hunter Name</th>
                <th scope="col">Total No of Shots</th>
                <th scope="col">No of Killed</th>
                <th scope="col">No of Missed</th>
                <th scope="col">No of Wound</th>
                <th scope="col">NO of Fire</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {details
                .filter(
                  (row) =>
                    !search.length ||
                    row.hunterName
                      .toString()
                      .toLowerCase()
                      .includes(search.toString().toLowerCase()),
                )
                .slice(pagesVisited, pagesVisited + usersPerPage)
                .map((Item, i) => (
                  // return (
                  <tr>
                    <td>{i + pagesVisited + 1}</td>
                    <td>{<LazyLoadImage
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50px",
                            }}
                            src={
                              Item.hunterProfile == ""
                                ? "https://mui.com/static/images/avatar/2.jpg"
                                : `${URL}/image/${Item.hunterProfile}`
                            }
                            effect="blur"
                          />}</td>
                    <td>{Item.hunterName}</td>
                    <td>{Item.totalShots}</td>
                    <td>{Item.noOfKilled}</td>
                    <td>{Item.noOfMissed}</td>
                    <td>{Item.noOfWound}</td>
                    <td>{Item.noOfFire}</td>
                    <td>
                      <DeleteForever style={{ color: "#912c00" }} />
                    </td>
                  </tr>
                  //)
                ))}
            </tbody>
          </table>
          <div>
            <ReactPaginate
              reviousLabel={"Previous"}
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
  );
};

export default HuntDetail;
