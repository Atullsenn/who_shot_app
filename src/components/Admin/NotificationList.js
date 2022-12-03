import * as React from 'react';
import { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';

import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { URL } from '../../url/url';
import {toast} from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },


}));

function NotificationList(props) {


    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

NotificationList.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {


    const [currency, setCurrency] = React.useState();
    const [user_id, setUser_id] = useState("");
    const [message,setMessage] = useState("");
    const [subject,setSubject] = useState("");

    const handleChange = (event) => {
        setCurrency(event.target.value);
       
    };



    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    //get all customer api
    const [currencies,setCurrencies] = useState([])
    const getAllCustomerList = ()=>{
        axios.get(URL + '/getAllCustomers',{
            Accept:'Application',
            'Content-Type': 'application/json'
        }).then((res)=>{
            setCurrencies(res.data.message)
            // console.log('chekkk')
            // console.log(res)
            // console.log('chekkk')
        }).catch(err=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        getAllCustomerList()
    },[])


    //get all customer api


    //send Notification
    const sendNotifications = async (e) => {
        //e.preventDefault();
    
        await axios
          .post(
            URL + "/addNotifications",
            {
            //   user_type: user_id,
              user_id: currency,
              description: message,
              title: subject,
            },
           
            {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          )
          .then((res) => {
            toast.success("Notification Send Successfully");
            handleClose()
            // console.log("response checking for notification")
            // console.log(res);
            // console.log("response checking for notification")
            //console.log("data submitted")
           
    
          })
          .catch((err) => {
            console.log(err);
          });
          setSubject('')
          setMessage('')
        
          
      };


    //send Notification

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Add Notification
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <NotificationList id="customized-dialog-title" onClose={handleClose}>
                    Notification
                </NotificationList>
                <DialogContent dividers>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='notification-field'>

                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Customer Name"
                                value={currency}
                                onChange={(e)=>handleChange(e)}
                            >
                                <MenuItem key={'All'} value={'All'}>All</MenuItem>
                                {currencies.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.first_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            


                     

                        </div>


                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='notification-field'>

                        </div>
                        <div className='notification-field'>

                            <TextField
                                id="outlined-textarea"
                                label="Title"
                                placeholder="Placeholder"
                                fullWidth
                                multiline
                                onChange={(e)=>setSubject(e.target.value)}
                            />
                        </div>
                        <div className='notification-field'>
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"

                                multiline
                                rows={4}
                                onChange={(e)=>setMessage(e.target.value)}
                            />
                        </div>


                    </Box>


                </DialogContent>
                <DialogActions className=''>
                    <Button autoFocus onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button autoFocus onClick={sendNotifications}>
                        Send
                    </Button>

                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
