import React from 'react';
import Joi from 'joi-browser';
import Form from './commom/form';

class RegistrationForm extends Form {
    state = {
        data: { username: '', password: ''},
        errors: {}
    };

    schema = {
        username: Joi.string()
            .required()
            .email()
            .label('UserName'),
        password: Joi.string()
            .required()
            .min(5)
            .label('Password'),
        name: Joi.string()
            .required()
            .label('Name')
    };

    doSubmit = () => {
        //call the server
       console.log('Submitted');
   }
    
    render() { 
        return ( 
        <div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>  
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {this.renderInput("name", "Name")}
                {this.renderButton("Register")}     
            </form>     
        </div>
        );
    }
}
 
export default RegistrationForm;

