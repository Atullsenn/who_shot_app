import React from "react";

const Dashboard = () => {
    return (
        <>
            <div className="page-wrapper">
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-9 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Dashboard</h4>
                        </div>
                        <div className="col-lg-3 col-sm-8 col-md-8 col-xs-12">
                            <div className="create-applications-btn-area">
                                <a href="#" className="create-application-btn" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal-search">
                                    <i className="fa fa-plus-circle" aria-hidden="true"></i> Create Application</a>
                                <div className="modal fade" id="exampleModal-search" tabindex="-1"
                                    aria-labelledby="exampleModal-search" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="application-heading-text-area">
                                                    <h1>Create An Application</h1>
                                                    <p>Pick a name and get started!</p>
                                                </div>
                                                <div className="application-input-text-box">
                                                    <input type="text" placeholder="Application Name" className="form-control" />
                                                </div>
                                                <div className="create-application-btn-area">
                                                    <a href="#" className="create-application-btn">Create Application</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-12">
                            <div className="white-box analytics-info">
                                <h3 className="box-title">Total Visit</h3>
                                <ul className="list-inline two-part d-flex align-items-center mb-0">
                                    <li>
                                        <div id="sparklinedash"><canvas width="67" height="30"
                                            style={{ display: "inline-block", width: '67px', height: "30px", verticalAlign: 'top' }}></canvas>
                                        </div>
                                    </li>
                                    <li className="ms-auto"><span className="counter text-success">659</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="white-box analytics-info">
                                <h3 className="box-title">Total Page Views</h3>
                                <ul className="list-inline two-part d-flex align-items-center mb-0">
                                    <li>
                                        <div id="sparklinedash2"><canvas width="67" height="30"
                                            style={{ display: "inline-block", width: '67px', height: "30px", verticalAlign: 'top' }}></canvas>
                                        </div>
                                    </li>
                                    <li className="ms-auto"><span className="counter text-purple">869</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="white-box analytics-info">
                                <h3 className="box-title">Unique Visitor</h3>
                                <ul className="list-inline two-part d-flex align-items-center mb-0">
                                    <li>
                                        <div id="sparklinedash3"><canvas width="67" height="30"
                                            style={{ display: "inline-block", width: '67px', height: "30px", verticalAlign: 'top' }}></canvas>
                                        </div>
                                    </li>
                                    <li className="ms-auto"><span className="counter text-info">911</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <div className="white-box">
                                <h3 className="box-title">Products Yearly Sales</h3>
                                <div className="d-md-flex">
                                    <ul className="list-inline d-flex ms-auto">
                                        <li className="ps-3">
                                            <h5><i className="fa fa-circle me-1 text-info"></i>Mac</h5>
                                        </li>
                                        <li className="ps-3">
                                            <h5><i className="fa fa-circle me-1 text-inverse"></i>Windows</h5>
                                        </li>
                                    </ul>
                                </div>
                                <div id="ct-visits" style={{ height: '405px' }}>
                                    <div className="chartist-tooltip" style={{ top: "-17px", left: '-12px' }}><span
                                        className="chartist-tooltip-value">6</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="white-box">
                                <div className="d-md-flex mb-3">
                                    <h3 className="box-title mb-0">Recent sales</h3>
                                    <div className="col-md-3 col-sm-4 col-xs-6 ms-auto">
                                        <select className="form-select shadow-none row border-top">
                                            <option>March 2021</option>
                                            <option>April 2021</option>
                                            <option>May 2021</option>
                                            <option>June 2021</option>
                                            <option>July 2021</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table no-wrap">
                                        <thead>
                                            <tr>
                                                <th className="border-top-0">#</th>
                                                <th className="border-top-0">Name</th>
                                                <th className="border-top-0">Status</th>
                                                <th className="border-top-0">Date</th>
                                                <th className="border-top-0">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td className="txt-oflo">Elite admin</td>
                                                <td>SALE</td>
                                                <td className="txt-oflo">April 18, 2021</td>
                                                <td><span className="text-success">$24</span></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td className="txt-oflo">Real Homes WP Theme</td>
                                                <td>EXTENDED</td>
                                                <td className="txt-oflo">April 19, 2021</td>
                                                <td><span className="text-info">$1250</span></td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td className="txt-oflo">Ample Admin</td>
                                                <td>EXTENDED</td>
                                                <td className="txt-oflo">April 19, 2021</td>
                                                <td><span className="text-info">$1250</span></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td className="txt-oflo">Medical Pro WP Theme</td>
                                                <td>TAX</td>
                                                <td className="txt-oflo">April 20, 2021</td>
                                                <td><span className="text-danger">-$24</span></td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td className="txt-oflo">Hosting press html</td>
                                                <td>SALE</td>
                                                <td className="txt-oflo">April 21, 2021</td>
                                                <td><span className="text-success">$24</span></td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td className="txt-oflo">Digital Agency PSD</td>
                                                <td>SALE</td>
                                                <td className="txt-oflo">April 23, 2021</td>
                                                <td><span className="text-danger">-$14</span></td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td className="txt-oflo">Helping Hands WP Theme</td>
                                                <td>MEMBER</td>
                                                <td className="txt-oflo">April 22, 2021</td>
                                                <td><span className="text-success">$64</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-8 col-sm-12">
                            <div className="card white-box p-0">
                                <div className="card-body">
                                    <h3 className="box-title mb-0">Recent Comments</h3>
                                </div>
                                <div className="comment-widgets">
                                    <div className="d-flex flex-row comment-row p-3 mt-0">
                                        <div className="p-2"><img src={process.env.PUBLIC_URL + "/assets/images/user-img.jpg"} alt="user" width="50" className="rounded-circle" />
                                        </div>
                                        <div className="comment-text ps-2 ps-md-3 w-100">
                                            <h5 className="font-medium">James Anderson</h5>
                                            <span className="mb-3 d-block">Lorem Ipsum is simply dummy text of the printing and
                                                type setting industry.It has survived not only five centuries. </span>
                                            <div className="comment-footer d-md-flex align-items-center">
                                                <span className="badge bg-primary rounded">Pending</span>
                                                <div className="text-muted fs-2 ms-auto mt-2 mt-md-0">April 14, 2021</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row comment-row p-3">
                                        <div className="p-2"><img src={process.env.PUBLIC_URL + "/assets/images/user-img.jpg"} alt="user" width="50" className="rounded-circle" />
                                        </div>
                                        <div className="comment-text ps-2 ps-md-3 active w-100">
                                            <h5 className="font-medium">Michael Jorden</h5>
                                            <span className="mb-3 d-block">Lorem Ipsum is simply dummy text of the printing and
                                                type setting industry.It has survived not only five centuries. </span>
                                            <div className="comment-footer d-md-flex align-items-center">

                                                <span className="badge bg-success rounded">Approved</span>

                                                <div className="text-muted fs-2 ms-auto mt-2 mt-md-0">April 14, 2021</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row comment-row p-3">
                                        <div className="p-2">
                                            <img src={process.env.PUBLIC_URL + "/assets/images/user-img.jpg"} alt="user" width="50" className="rounded-circle" />
                                        </div>
                                        <div className="comment-text ps-2 ps-md-3 w-100">
                                            <h5 className="font-medium">Johnathan Doeting</h5>
                                            <span className="mb-3 d-block">Lorem Ipsum is simply dummy text of the printing and
                                                type setting industry.It has survived not only five centuries. </span>
                                            <div className="comment-footer d-md-flex align-items-center">

                                                <span className="badge rounded bg-danger">Rejected</span>

                                                <div className="text-muted fs-2 ms-auto mt-2 mt-md-0">April 14, 2021</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="card white-box p-0">
                                <div className="card-heading">
                                    <h3 className="box-title mb-0">Chat Listing</h3>
                                </div>
                                <div className="card-body">
                                    <ul className="chatonline">
                                        <li>
                                            <div className="call-chat">
                                                <button className="btn btn-success text-white btn-circle btn" type="button">
                                                    <i className="fas fa-phone"></i>
                                                </button>
                                                <button className="btn btn-info btn-circle btn" type="button">
                                                    <i className="far fa-comments text-white"></i>
                                                </button>
                                            </div>
                                            <a href="javascript:void(0)" className="d-flex align-items-center"><img
                                                src={process.env.PUBLIC_URL + "/assets/images/user-img.jpg"} alt="user-img" className="img-circle" />
                                                <div className="ms-2">
                                                    <span className="text-dark">Varun Dhavan <small
                                                        className="d-block text-success d-block">online</small></span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="call-chat">
                                                <button className="btn btn-success text-white btn-circle btn" type="button">
                                                    <i className="fas fa-phone"></i>
                                                </button>
                                                <button className="btn btn-info btn-circle btn" type="button">
                                                    <i className="far fa-comments text-white"></i>
                                                </button>
                                            </div>
                                            <a href="javascript:void(0)" className="d-flex align-items-center"><img
                                                src={process.env.PUBLIC_URL + "/assets/images/user-img.jpg"} alt="user-img" className="img-circle" />
                                                <div className="ms-2">
                                                    <span className="text-dark">Genelia
                                                        Deshmukh <small className="d-block text-warning">Away</small></span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="call-chat">
                                                <button className="btn btn-success text-white btn-circle btn" type="button">
                                                    <i className="fas fa-phone"></i>
                                                </button>
                                                <button className="btn btn-info btn-circle btn" type="button">
                                                    <i className="far fa-comments text-white"></i>
                                                </button>
                                            </div>
                                            <a href="javascript:void(0)" className="d-flex align-items-center"><img
                                                src={process.env.PUBLIC_URL + "/assets/images/user-img.jpg"} alt="user-img" className="img-circle" />
                                                <div className="ms-2">
                                                    <span className="text-dark">Ritesh
                                                        Deshmukh <small className="d-block text-danger">Busy</small></span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="call-chat">
                                                <button className="btn btn-success text-white btn-circle btn" type="button">
                                                    <i className="fas fa-phone"></i>
                                                </button>
                                                <button className="btn btn-info btn-circle btn" type="button">
                                                    <i className="far fa-comments text-white"></i>
                                                </button>
                                            </div>
                                            <a href="javascript:void(0)" className="d-flex align-items-center"><img
                                                src={process.env.PUBLIC_URL + "/assets/images/user-img.jpg"} alt="user-img" className="img-circle" />
                                                <div className="ms-2">
                                                    <span className="text-dark">Arijit
                                                        Sinh <small className="d-block text-muted">Offline</small></span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="call-chat">
                                                <button className="btn btn-success text-white btn-circle btn" type="button">
                                                    <i className="fas fa-phone"></i>
                                                </button>
                                                <button className="btn btn-info btn-circle btn" type="button">
                                                    <i className="far fa-comments text-white"></i>
                                                </button>
                                            </div>
                                            <a href="javascript:void(0)" className="d-flex align-items-center"><img
                                                src={process.env.PUBLIC_URL + "/assets/images/user-img.jpg"} alt="user-img"
                                                className="img-circle" />
                                                <div className="ms-2">
                                                    <span className="text-dark">Govinda
                                                        Star <small className="d-block text-success">online</small></span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <div className="call-chat">
                                                <button className="btn btn-success text-white btn-circle btn" type="button">
                                                    <i className="fas fa-phone"></i>
                                                </button>
                                                <button className="btn btn-info btn-circle btn" type="button">
                                                    <i className="far fa-comments text-white"></i>
                                                </button>
                                            </div>
                                            <a href="javascript:void(0)" className="d-flex align-items-center">
                                                <img
                                                    src={process.env.PUBLIC_URL + "/assets/images/user-img.jpg"} alt="user-img" className="img-circle" />
                                                <div className="ms-2">
                                                    <span className="text-dark">John
                                                        Abraham<small className="d-block text-success">online</small></span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
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
    )
}

export default Dashboard;
