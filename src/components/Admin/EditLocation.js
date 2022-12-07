import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { URL } from '../../url/url';
import {useHistory } from 'react-router-dom';
import { useState } from 'react';
import {toast} from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },


}));

function BootstrapDialogTitle(props) {
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

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({sendId}) {
    // console.log(sendId, 'send it id');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    
    const [data,setData] = useState([])

    //Get Location By ID Api
    const getLocationById = ()=>{
        let req = {id:sendId}
       
        axios.post(URL + '/getLocationByID',req,{
            Accept:'Application',
            'Content-type': 'application/json'
        }).then((res)=>{
            setData(res.data.data[0])
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        getLocationById()
    },[])


   
    
    //Get Location By ID APi


    //update Location
    const [locationValue,setLocationValue] = useState("")
    
    const updateLocation= async(res)=>{
        let request = {
            id:sendId,
            location:locationValue,
        }
        await axios.post(URL + '/updateLocation',request,{
            Accept: 'Application',
            'Content-Type': 'Application/json'
        }).then(()=>{
            toast.success('Location updated')
        }).catch((err)=>{
            toast.error(err)

    })
    if(res){
        setOpen(false)
    }
    }


    //update Location

    return (
        <div>
            <Link onClick={handleClickOpen} className="mange-admins-edit-btn"><i className="fas fa-edit"></i></Link>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Location
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <input  type="text" onChange={(e)=>setLocationValue(e.target.value)}  placeholder='Enter Location' defaultValue={data.location}/>
                </DialogContent>
                <DialogActions className=''>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={(e)=>updateLocation(e)}>
                        Update
                    </Button>

                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}


