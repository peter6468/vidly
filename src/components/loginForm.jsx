import React, {Component} from 'react';
import Joi from 'joi-browser';
import Form from './commom/form';

//if u need to access a dom element, in component have to define a propert;  username = React.createRef
//creates a re

class LoginForm extends Form { 
    state = {
        data: { username: '', password: ''},
        errors: {}
    };

    schema = {
        username: Joi.string()
            .required()
            .label('UserName'),
        password: Joi.string()
            .required()
            .label('Password')
    }; 

    doSubmit = () => {
         //call the server
        console.log('submitted');
    }
 
    render() {  
        return (
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>  
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Login")}     
            </form>     
        </div>
        );
    }
}
 
export default LoginForm;

//if we want to work w/properties of obj dynamically instead of. use []

//next time we use all we have 2 do is initialize state+set schema for that form
//deter what should hapen whne the form is submitted+ dedide what to render?return
//when form is submitted