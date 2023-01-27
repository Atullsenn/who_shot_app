import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';

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
    // const [user_id, setUser_id] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const [type, setType] = useState("");
    const [subType, setSubType] = useState("");

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
    const [currencies, setCurrencies] = useState([])
    const [hunterData, setHunterData] = useState([])



    const getAllHuntList = () => {
        axios.get(URL + '/web/api/getAllHunt', {
            Accept: 'Application',
            'Content-Type': 'application/json'
        }).then((res) => {
            setCurrencies(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllHuntList()
    }, [])

    //get all Hunt api

    //get all hunter list api
    const getAllhunterList = ()=>{
        axios.get(URL + '/web/api/getHunter', {
            Accept: 'Application',
            'Content-Type': 'application/json'
        }).then(res=>{
            setHunterData(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        getAllhunterList()
    },[])


    //get all hunter list api

    //send Notification
    const sendNotifications = async (e) => {
        await axios
            .post(
                URL + "/web/api/sendNotifications",
                {
                    //   user_type: user_id,
                    user_id: currency,
                    type: type,
                    subject: subject,
                    description: message,
                    sub_type: subType,
                   
                },
                {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            )
            .then((res) => {
                if(res){
                toast.success("Notification Send Successfully");
                handleClose()
                }
                else{
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            });
        setSubject('')
        setMessage('')
    };
    //send Notification




    const [selected, setSelected] = React.useState("");
  
  /** Function that will set different values to state variable
   * based on which dropdown is selected
   */
  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
    setType(event.target.value);
  };
  
  /** Different arrays for different dropdowns */
  
  let typee = null;
  
  /** This will be used to create set of options that user will see */
  let options = null;
  let isShow = false;
  
  /** Setting Type variable according to dropdown */
  if (selected === '1') {
    typee = currencies;
    isShow = true;
    options = typee.map((el) => <option key={el.id} value={el.id}>{el.hunt_name}</option>);
  } else if (selected === '2') {
    typee = hunterData;
    options = typee.map((el) => <option key={el.id} value={el.id}>{el.hunter}</option>);
  } 
  



    return (
        <div>
            <Button onClick={handleClickOpen}>
                Send Notification
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <NotificationList id="customized-dialog-title" onClose={handleClose}>
                    Notifications
                </NotificationList>

                <DialogContent dividers>
              
                {/* <Box
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
                                label="Choose Type"
                                value={currency}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem key={'Hunt'} value={algorithm[0].value}>{algorithm[0].label}</MenuItem>
                                <MenuItem key={'Hunter'} value={algorithm[1].value}>{algorithm[1].label}</MenuItem>
                                
                            </TextField>
                        </div>
                    </Box> */}

                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px'}}
    
    >
     
        <div>
          <select style={{width: '61ch', padding: '16px', borderRadius:'5px'}} onChange={changeSelectOptionHandler}>
            <option>Choose..</option>
            <option value={'1'}>Hunt</option>
            <option value={'2'}>Hunter</option>
            {/* <option>Data Structure</option> */}
          </select>
        </div>

        <div>
        {isShow === true ? 
          <select style={{width: '61ch', padding: '16px', borderRadius: '5px'}} onChange={(e)=>setSubType(e.target.value)}>
           <option>choose..</option>
           <option value='1'>Hunt Admin</option>
           <option value='2'>Hunt User</option>
          </select> 
          : ''
}
        </div>

        <div>
          
          <select style={{width: '61ch', padding: '16px', borderRadius: '5px'}} onChange={(e) => handleChange(e)}>
          <option value='All'>ALL</option>
            {
              /** This is where we have used our options variable */
              options
            }
            
          </select>

        </div>

       

     
    </div>
    
                   
                    {/* <Box
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
                                label="Select User"
                                value={currency}
                                onChange={(e) => handleChange(e)}
                                
                            >
                               
                                <MenuItem key={'All'} value={'All'}>ALL</MenuItem>
                                
                                {currencies.map((option) => (
                                    
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.hunt_name}
                                    </MenuItem>
                                    
                                ))}

                                

<MenuItem key={'All'} value={'All'}>ALL</MenuItem>
                                {hunterData.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.hunter}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </div>

                    </Box> */}
                                
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
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <div className='notification-field'>
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                rows={4}
                                onChange={(e) => setMessage(e.target.value)}
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