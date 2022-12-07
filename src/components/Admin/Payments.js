import React, { useState } from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination'
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateRangePicker } from 'rsuite';
import "react-datepicker/dist/react-datepicker.css";


const Payments = () => {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const data = [
        { id: '1', add: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522 (257) 563-7401', cap: '100', ic1: <i className="fas fa-edit"></i>, ic2: <DeleteForever style={{ color: '#FF5C93' }} /> },
        { id: '2', add: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522 (257) 563-7401', cap: '100', ic1: <i className="fas fa-edit"></i>, ic2: <DeleteForever style={{ color: '#FF5C93' }} /> },
        { id: '3', add: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522 (257) 563-7401', cap: '100', ic1: <i className="fas fa-edit"></i>, ic2: <DeleteForever style={{ color: '#FF5C93' }} /> },
        { id: '4', add: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522 (257) 563-7401', cap: '100', ic1: <i className="fas fa-edit"></i>, ic2: <DeleteForever style={{ color: '#FF5C93' }} /> },
        { id: '5', add: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522 (257) 563-7401', cap: '100', ic1: <i className="fas fa-edit"></i>, ic2: <DeleteForever style={{ color: '#FF5C93' }} /> },

    ]
    return (
        <>
            <div className="container-fluid ">
                <div className="add-location">
                    <div className="Payment">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="heading-top" >
                                    <h2>Manage Payment</h2>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <DateRangePicker fullWidth />
                            </div>
                            <div className="col-md-3">
                                <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
                                    <InputLabel fullwidth id="demo-select-small">Select</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >

                                        <MenuItem value={10}>Booking ID</MenuItem>
                                        <MenuItem value={20}>Cust Name</MenuItem>
                                        <MenuItem value={30}>Date</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>

                            <div className="col-md-2">
                                <button class="head-button">Export</button>
                            </div>
                        </div>
                    </div>
                    <div className="manage-admins-main-area">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Booking ID</th>

                                    <th scope="col">Customer Name</th>
                                    <th scope="col">Payments</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item) => (
                                        <tr>
                                            <th scope="row">{item.id}</th>
                                            <td>656565</td>
                                            <td>Vishal Singh</td>
                                            <td>$ 852</td>
                                            <td>22/12/2032</td>
                                            <td>09:04 pm</td>
                                            <td>
                                                <Link className="mange-admins-dlt-btn">                       <DeleteForever style={{ color: '#FF5C93' }} />
                                                </Link></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Pagination count={10} color="primary" />
                    </div>
                </div>
            </div>
            <footer className="footer text-center"> 2022 © Admin Panel brought to you by <a
                href="https://https://www.webnmobappssolutions.com">webnmobappssolutions.com</a>
            </footer>
        </>
    )
}

export default Payments;