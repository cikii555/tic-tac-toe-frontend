import React, { useState } from 'react';
import { TextField } from '@mui/material';
import  Button  from '@mui/material/Button';
import {Link} from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import { registration } from '../services/userService'; 
function RegistrationForm () {
    /*state = { account:{
        username:'',
        password: '',
        name:''
    } ,
errors:{}} */
const [data, setData] = useState({ username: '', password: '', name:'',errors:{} });
   const handleSubmit = async (e)=>{
        e.preventDefault()
    try{
      const response =  await  registration(this.state.account)
      const token  = response.headers.get('X-Auth-Token')
        localStorage.setItem('token', token)
       // this.props.history.push('game')

      
    }
    catch(ex){
        if (ex.response && ex.response.status === 400){
            const errors = {...this.state.errors}
            errors.username = ex.response.data
            this.setState({errors})
        }
    }

    }
    const handleChange = e =>{
        const newData = { ...data };
        newData[e.currentTarget.name] = e.currentTarget.value;
        setData(newData);
    }
   
        return (
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', 
          minHeight: '100vh',
        }}
      >
                   <h2>Register Form</h2>
            <form onSubmit={this.handleSubmit} >
            <TextField
                    type="name"
                    variant='outlined'
                    color='secondary'
                    label="Name"
                    name = "name"
                    onChange={handleChange}
                    value={data.name}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="username"
                    variant='outlined'
                    color='secondary'
                    label="Username"
                    name = "username"
                    onChange={handleChange}
                    value={data.username}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />

                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    name = "password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
               
                <Button variant="contained"
              color="secondary"
              fullWidth
             
              style={{ marginTop: '1rem' }} type="submit">Register</Button>
            </form>
            <small>Already have an account? <Link to="/">Login Here</Link></small>
            
        </Box>
    )
}
 
export default RegistrationForm;