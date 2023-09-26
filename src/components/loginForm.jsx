import React, { Component } from 'react';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import  Button  from '@mui/material/Button';
import { login } from '../services/authService';
class LoginForm extends Component {
    state = { 
        data : {username:'', password:''},
        errors:{}
     } 
     handleSubmit = async (e)=>{
        e.preventDefault()
        const {data} = this.state
       const response = await  login(data.username,data.password)
       const token  = response.headers.get('X-Auth-Token')
       localStorage.setItem('token', token)
       //this.props.history.push()
    
   

    }
    handleChange = e =>{
        const data  = {...this.state.data}
        data[e.currentTarget.name] = e.currentTarget.value
        this.setState({data})
    }

    render() { 
        return (<div>
                   <h2>Login </h2>
            <form onSubmit={this.handleSubmit} >
                <TextField
                    type="username"
                    variant='outlined'
                    color='secondary'
                    label="Username"
                    name = "username"
                    onChange={this.handleChange}
                    value={this.state.data.username}
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
                    onChange={this.handleChange}
                    value={this.state.data.password}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
               
                <Button variant="outlined" color="secondary" type="submit">Login </Button>
            </form>
        </div>);
    }
}
 
export default LoginForm;