import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotypeContainer: {
    backgroundColor: "#fff",
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  logotypeImage: {
    width: 785,
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    width: "40%",
    height: "100%",
    backgroundImage: "linear-gradient(#912c00 , #f6f7ff) !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  form: {
    width: 320,
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  googleButton: {
    marginTop: theme.spacing(6),
    boxShadow: theme.customShadows.widget,
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    textAlign: "center",
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    color: "#912c00 ",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  },
  loginButton: {
    backgroundColor: "#0e2259",
    color: '#fff !important',
    width: '100%',
    outline: 'none !important',
    "& a": {
      color: '#fff !important'
    },
  },
  textField: {
    padding: '10px 10px',
  },
  textFieldUnderline: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0e2259 !important",
      borderBottom: "2px solid #0e2259 !important",
    },
    "& .makeStyles-textFieldUnderline-69:after": {
      borderBottomColor: "#0e2259 !important",
      borderBottom: "2px solid #0e2259 !important",
    }, "& .MuiInput-underline:before": {
      borderBottomColor: "#0e2259 !important",
      borderBottom: "2px solid #0e2259 !important",
    },
    "& .makeStyles-textFieldUnderline-69:before": {
      borderBottomColor: "#0e2259 !important",
      borderBottom: "2px solid #0e2259 !important",
    }
  }
}));
