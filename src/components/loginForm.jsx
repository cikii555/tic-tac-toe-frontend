import React,  { useState } from 'react';
import { TextField } from '@mui/material';
import  Button  from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
 function  LoginForm () {
   
     const navigate = useNavigate()
     const [data, setData] = useState({ username: '', password: '' });
     
    const handleSubmit = async (e)=>{
        e.preventDefault()
       const response = await  login(data.username,data.password)
       const token  = response.headers.get('X-Auth-Token')
       localStorage.setItem('token', token)
       navigate('/game')
    
   

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
              <Typography variant="h2" gutterBottom>
                Login
              </Typography>
              <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  value={data.username}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
              style={{ marginTop: '1rem' }}
            >
              Login
            </Button>
            <Link to="/registration" style={{ position: 'absolute', top: 0, right: 0, margin: '1rem' }}>
        <Button variant="contained" color="secondary">
          Registration
        </Button>
      </Link>
          </form>
            </Box>
          );
        
            }
 
export default LoginForm