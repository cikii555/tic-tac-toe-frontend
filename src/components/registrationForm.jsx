import React, { Component } from 'react';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import  Button  from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { registration } from '../services/userService'; 
class RegistrationForm extends Component {
    state = { account:{
        username:'',
        password: '',
        name:''
    } ,
errors:{}} 
    handleSubmit = async (e)=>{
        e.preventDefault()
    try{
      const response =  await  registration(this.state.account)
      const token  = response.headers.get('X-Auth-Token')
        localStorage.setItem('token', token)
        //this.props.history.push()

      
    }
    catch(ex){
        if (ex.response && ex.response.status === 400){
            const errors = {...this.state.errors}
            errors.username = ex.response.data
            this.setState({errors})
        }
    }

    }
    handleChange = e =>{
        const account  = {...this.state.account}
        account[e.currentTarget.name] = e.currentTarget.value
        this.setState({account})
    }
    render() { 
        return <div>
                   <h2>Register Form</h2>
            <form onSubmit={this.handleSubmit} >
            <TextField
                    type="name"
                    variant='outlined'
                    color='secondary'
                    label="Name"
                    name = "name"
                    onChange={this.handleChange}
                    value={this.state.account.name}
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
                    onChange={this.handleChange}
                    value={this.state.account.username}
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
                    value={this.state.account.password}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
               
                <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>
            <small>Already have an account? <Link to="/login">Login Here</Link></small>
            
        </div>;
    }
}
 
export default RegistrationForm;