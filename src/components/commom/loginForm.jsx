import React, {Component} from 'react';
import Joi from 'joi-browser';
import Input from './input';
//if u need to access a dom element, in component have to define a propert;  username = React.createRef
//creates a re

class LoginForm extends Component { 
    state = {
        account: { username: '', password: ''},
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
 
    validate = () => {
        const options = { abortEarly: false };
        //destruc result.error
        const {error} = Joi.validate(this.state.account, this.schema, options);
        if (!error) return null;

        const errors = {};
        //maps an array into an obj
        for (let item of error.details)
            errors[item.path[0]] = item.message
        return errors;
    };

    validateProperty = ({ name, value }) => {
        //const obj = { username: value }; es6 dont want to hardcode name here
        //whatever name is @ runtim, it will set the key
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
        //used ternnary conditional operator above: ?if :otherwise
        //return error.details[0].message  
    }
 
    handleSubmit =   e => {
        e.preventDefault();

        const errors = this.validate();
        //if u dont have errors above will be null state was null wh/got a run time error
        //set error property to error obj OR an empty obj, errors prop should always
        //be st to an obj never to null
        console.log(errors);
        this.setState({ errors: errors || {} });
        if (errors) return;

        //call the server
        //const username = this.username.current.value;
        console.log('submitted');
    }

    validateProperty = ({ name, value}) =>{
        if (name === 'username') {
            if (value.trim() === '') return 'Username is required';
            //..
        }
        if (name ==='password') {
            if (value.trim() === '') return 'Password is required';
        }

    }

    handleChange = ({ currentTarget: input }) => {
        //need to update this state,1st clone errors property of our state obj
        const errors = {...this.state.errors};   
        const errorMessage =this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account ={...this.state.account};
        //returns our input filed and we get the va;ue property
        //account[e.currentTarget.name]= e.currentTarget.value;
        account[input.name]= input.value
        this.setState({ account, errors});
    }

    render() { 
        //obj destruct
        const { account, errors } =this.state;

        return (
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>  
                <Input 
                    name="username"
                    value={account.username}
                    label="Username"
                    onChange={this.handleChange}
                    //tried to access username property of null> handleSubmit
                    error={errors.username}
                />
                <Input 
                    name="password"
                    value={account.password}
                    label="Password"
                    onChange={this.handleChange}
                    error={errors.password}
                />      
                <button className="btn btn-primary">Login</button>
            </form>     
        </div>
        );
    }
}
 
export default LoginForm;

//if we want to work w/properties of obj dynamically instead of. use []

