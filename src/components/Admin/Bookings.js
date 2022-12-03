import React, { useState, useEffect } from "react";
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { URL } from "../../url/url";
import axios from 'axios';



const Bookings = () => {
    const [age, setAge] = React.useState('');
    const [dataName, setDataName] = useState([])
    const getData = async () => {
        await axios.get(URL + '/getallbooking').then(res => {
            setDataName(res.data.message)
            console.log("cheking booking data")
            console.table(dataName)
            console.log("cheking booking data")
            
        }).catch(err => {
            console.log(err)
            console.log("err")
        })
    }
    useEffect(() => {
        getData()
    }, [])

    const handleChange = (event) => {
        setAge(event.target.value);
    };

   

    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const [search,setSearch] = useState("");

    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(dataName.length / usersPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };


    //pagination
    return (
        <>
            <div className="container-fluid ">
                <div className="add-location">
                    <div className="booking-wrapper">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="heading-top" >
                                    <h2>Booking</h2>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="table-data-search-box-manage">
                                    <div className="search-bar" >
                                        <input type="text" onChange={(e)=>setSearch(e.target.value)} className="searchTerm-input" placeholder="Search" />
                                        <button type="submit" className="searchButtons">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="manage-admins-main-area">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Customer  Name</th>
                                    <th scope="col">Parking Name</th>
                                    <th scope="col">Parking Location</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>

                                    <th scope="col">Time</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataName.filter(
                                        (row) =>
                                          !search.length ||
                                          row.parking_id
                                            .toString()
                                            .toLowerCase()
                                            .includes(search.toString().toLowerCase()),
                                      )
                                      .slice(pagesVisited, pagesVisited + usersPerPage).map((item,i) => (
                                        <tr>
                                            <th scope="row">{i + pagesVisited + 1}</th>
                                            <td>{item.first_name}</td>
                                            <td>{item.parking_name}</td>
                                            <td>{item.location}</td>
                                            <td>{item.start_time}</td>

                                            <td>{item.end_time}</td>
                                            <td>{item.booking_date}</td>
                                            <td>
                                                <Link className="mange-admins-dlt-btn">                       <DeleteForever style={{ color: '#FF5C93' }} />
                                                </Link></td>
                                        </tr>
                                    ))
                                }
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
                </div>

            </div>
            <footer className="footer text-center"> 2022 © Admin Panel brought to you by <a
                href="https://https://www.webnmobappssolutions.com">webnmobappssolutions.com</a>
            </footer>
        </>
    )
}

export default Bookings;