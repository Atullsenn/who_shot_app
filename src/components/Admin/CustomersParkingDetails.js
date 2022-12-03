import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const top100Films = [
    { label: 'noida 45' },
    { label: 'noida 22' },
    { label: 'noida 22' },
    { label: 'noida 22' },
    { label: 'noida 22' },
    { label: 'noida 22' },
    { label: 'noida 22' },
    {
        label: 'noida 22'
    },
    { label: 'noida 22' },
]

const CustomersParkingDetails = () => {
    const [activeInactive, setActiveInactive] = useState(true)

    return (
        <>
            <div className="page-wrapper" style={{ minHeight: "250px" }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="application-detail-heading-area " style={{ position: "relative", padding: "20px", top: "20px" }} >
                                <h2>Manage Coustomers</h2>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Location" />}
                                />
                            </div>

                            <div className="table-data-search-box" >
                                <div className="search">
                                    <input type="text" className="searchTerm" placeholder="Search" />
                                    <button type="submit" className="searchButton">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="manage-admins-main-area">
                                <div className="manage-admins-table-area">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>Parking Name</th>
                                                <th>Parking Location</th>
                                                <th>Visited</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr >
                                                <td>1</td>
                                                <td>Snp</td>
                                                <td>Noida 59 kirtiman Tower</td>
                                                <td>444</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <Pagination count={100} color="primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer text-center"> 2021 © Ample Admin brought to you by <a
                    href="https://www.wrappixel.com/">wrappixel.com</a>
                </footer>
            </div>
        </>
    );
};

export default CustomersParkingDetails;
