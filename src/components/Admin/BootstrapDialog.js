import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
//import { Axios } from 'axios';
import axios from 'axios';
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

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const [address, setAddress] = useState([]);
    const addlocation = () => {
        axios.post("http://localhost:5000/addlocation",{
            address:address

        }, {
            Accept: "Application",
            "Content-Type": "Application/json",
        }).then((res) => {
            console.log(res)
            alert('success')
           
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Add Location
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Location
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <input type="text" placeholder='Enter Location' defaultValue={'location'} onChange={(e) => { setAddress(e.target.value) }} />
                </DialogContent>
                <DialogActions className=''>
                    <Button autoFocus onClick={handleClose}>
                        Cancle
                    </Button>
                    <Button autoFocus
                        // onClick={handleClose}
                        onClick={addlocation}>
                        Ok
                    </Button>

                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
