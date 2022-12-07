import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  ArrowBack as ArrowBackIcon,
  SupervisorAccount,
  VpnKey,
  Security,
  ContactSupport,
  Payment,
  Settings,

} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ReportIcon from '@mui/icons-material/Report';
import ArticleIcon from '@mui/icons-material/Article';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import GroupsIcon from '@mui/icons-material/Groups';
import DetailsIcon from '@mui/icons-material/Details';
// styles
import useStyles from "./styles";
import PeopleIcon from '@mui/icons-material/People';
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  {
    id: 0,
    label: "Dashboard",
    link: "/app/dashboard",
    icon: <HomeIcon />
  },
  {
    id: 783,
    label: "Manage Hunts ",
    link: "/app/managelocation",
    icon: <Diversity3Icon />,
  },

  {
    id: 5,
    label: "All Hunters ",
    link: "/app/admin",
    icon: <PeopleIcon />,
  },
  {
    id: 6,
    label: "Statistics",
    link: "/app/merchants",
    icon: <EqualizerIcon />,
  },
  {
    id: 29,
    label: "Basic Reports",
    link: "/app/bookings",
    icon: <ReportIcon />
  },
  {
    id: 31,
    label: "Detail Of Groups ",
    link: "/app/detailsgroup",
    icon: < DetailsIcon/>
  },
  { 
    id: 32,
    label: "Manage Groups ",
    link: "/app/managegroups",
    icon: <GroupsIcon />
  },

  {
    id: 292,
    label: "Setting",
    link: "/app/settings",
    icon: <Settings />
  },
  // {
  //   id: 3003,
  //   label: "payment",
  //   link: "/app/payment",
  //   icon: <Payment />
  // },
  // {
  //   id: 2,
  //   label: "Settings",
  //   link: "/app/settings",
  //   icon: <SettingsApplications />
  // },
  {
    id: 1,
    label: "Notifications",
    link: "/app/notifications",
    icon: <NotificationsIcon />
  },
  // {
  //   id: 50,
  //   label: "Subscriptions",
  //   link: "/app/subscriptions",
  //   icon: <Subscriptions/>,
  // },
  {
    id: 7,
    label: "Contact Us",
    link: "/app/create-contact-details",
    icon: <ContactSupport />,
  },
  // {
  //   id: 15,
  //   label: "FAQ",
  //   link: "/app/faq",
  //   icon: <QuestionAnswer />,
  // },
  {
    id: 9,
    label: "Terms & Services",
    link: "/app/create-terms-and-services",
    icon: <Security />,
  },
  {
    id: 8,
    label: "Privacy Policy",
    link: "/app/create-privacy-policy",
    icon: <VpnKey />,
  },
  {
    id: 78,
    label: "About ",
    link: "/app/about-us",
    icon: <ArticleIcon />,
  },

];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
