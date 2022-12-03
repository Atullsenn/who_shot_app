import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
// styles
import useStyles from "./styles";

// logo
//import Logo1 from "../../images/Logo1.png"
import Logo1 from "../../images/Logo1.png"

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [loginValue, setLoginValue] = useState("mobapps@gmail.com");
  var [passwordValue, setPasswordValue] = useState("adminn");
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={Logo1} alt="logo" className={classes.logotypeImage} />
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Fade in={error}>
              <Typography color="secondary" className={classes.errorMessage}>
                Something is wrong with your login or password :(
              </Typography>
            </Fade>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={e => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="Email Adress"
              type="email"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Password"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                
             
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button className={classes.loginButton}
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  onClick={() =>
                    loginUser(
                      userDispatch,
                      loginValue,
                      passwordValue,
                      props.history,
                      setIsLoading,
                      setError,
                    )
                  }
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
              )}
              
            </div>
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="#" rel="noopener noreferrer" target="_blank">Who Shot</a>, LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);

//pankajmobapps@gmail.com
//Kumar@123
