import React from "react";
import { Route, Switch, Redirect, withRouter, } from "react-router-dom";
import classnames from "classnames";
import { Box } from '@material-ui/core'
import '../../vishal.css'
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../Admin/Dashboard/Dashboard";
import ManageAdmin from "../Admin/Manage Admin/ManageAdmin";
import ManageMerchants from "../Admin/Manage Merchants/ManageMerchants";
import NotificationDetails from "../Admin/notificatonDetails";
// i   
import EditParking from "../Admin/Manage Admin/EditParking";
import Maps from "../../pages/maps";
import Charts from "../../pages/charts";
import AddAdmin from "../Admin/AddAdmin";
import Settings from "../Admin/Settings/Settings";
import CreateTermsandservices from "../Admin/Terms and Services/CreateTermsandservices";
import CreatePrivacypolicy from "../Admin/Privacy Policy/CreatePrivacypolicy";
import PrivacyPolicy from "../Admin/Privacy Policy/PrivacyPolicy";
// context
import { useLayoutState } from "../../context/LayoutContext";
import CustomersDetails from '../Admin/CustomersDetails'
import ContactDetails from "../Admin/Contactus/ContactDetails";
import AllNotification from "../Admin/Notifications/AllNotification";
import Bookings from "../Admin/Bookings";
import Payments from "../Admin/Payments";
import ManageLocation from "../Admin/ManageLocation";
import CustomersParkingDetails from "../Admin/CustomersParkingDetails";
import AboutPage from "../Admin/AboutPage";
import '../../vishal.css'
function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>

            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/admin/" component={ManageAdmin} />
            <Route path="/app/merchants" component={ManageMerchants} />
            <Route path='/app/editparking/:id' component={EditParking}/>
            <Route path="/app/customersdetails/:id" component={CustomersDetails} />
            <Route path="/app/customersparkingdetails" component={CustomersParkingDetails} />
            <Route path="/app/add-admin" component={AddAdmin} />
            <Route exact path="/app/ui" render={() => <Redirect to="/app/ui/icons" />} />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/charts" component={Charts} />
            <Route path="/app/managelocation/" component={ManageLocation} />

            <Route path="/app/bookings/" component={Bookings} />
            <Route path="/app/payment/" component={Payments} />

            <Route path="/app/settings/" component={Settings} />
            <Route path="/app/notifications" component={AllNotification} />
            {/* <Route path="/app/contact-us" component={Contactus} /> */}
            <Route path="/app/about-us" component={AboutPage} />

            <Route path="/app/create-contact-details/" component={ContactDetails} />
            <Route path="/app/create-terms-and-services" component={CreateTermsandservices} />
            <Route path="/app/privacy-policy" component={PrivacyPolicy} />
            <Route path="/app/create-privacy-policy" component={CreatePrivacypolicy} />
            <Route path="/app/notificationDetails/:id" component={NotificationDetails}/>
          </Switch>
          <Box
            mt={0}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
          </Box>
        </div>
      </>
    </div >
  );
}

export default withRouter(Layout);
