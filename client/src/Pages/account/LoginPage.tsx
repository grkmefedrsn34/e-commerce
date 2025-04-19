import { LockOutline } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import request from "../../api/Request";

export default function  LoginPage()
{
    //const [username,SetUserName] = useState("");
    //const [password,SetPassword] = useState("");

    const [value,SetValue] = useState({
        username:"",
        password:""
    })
    function handleSubmit(e:any){
        e.preventDefault();
        console.log(value)
        request.Account.login(value);
    }
    function handleChangeInput(e:any){
        const {name,value} = e.target;
        SetValue({...value,[name]:value});
    }

    return (
        <Container maxWidth="xs">
            <Paper sx={{marginTop:8,padding:2}} elevation={3}>
                <Avatar sx={{mx:"auto",color:"secondary.main",textAlign:"center",mb:1}}>
                    <LockOutline/>
                </Avatar>
                <Typography component="h1" variant="h5" sx={{textAlign:"center"}} >Login</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt:2}} >
                    <TextField label="Enter username" fullWidth required autoFocus sx={{mb:2}} size="small" name="userName" value={value.username} onChange={handleChangeInput} />
                    <TextField label="Enter password" fullWidth required sx={{mb:2}} autoFocus type="password" size="small" name="Password" value={value.password} onChange={handleChangeInput} />
                    <Button type="submit" variant="contained" sx={{mt:3,mb:2}}>Login</Button>
                </Box>
            </Paper>
        </Container>
    );
}