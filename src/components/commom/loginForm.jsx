import React, {Component} from 'react';
import Input from './input'
//if u need to access a dom element, in component have to define a propert;  username = React.createRef
//creates a re

class LoginForm extends Component { 
    state = {
        account: { username: '', password: ''},
        errors: {}
    };

    validate = () => {
        const errors = {};

        const { account } = this.state
        if (account.username.trim() === '')
            errors.username = 'Username is required.';

        if (account.password.trim() === '')
            errors.password = 'Password is required.';

        return Object.keys(errors).length === 0 ? null : errors; 
    }
 
    handleSubmit =   e => {
        e.preventDefault();

        const errors = this.validate();
        console.log(errors);
        this.setState({ errors});
        if (errors) return;

        //call the server
        //const username = this.username.current.value;
        console.log('submitted');
    }

    handleChange = ({ currentTarget: input }) => {
        const account ={...this.state.account};
        //returns our input filed and we get the va;ue property
        //account[e.currentTarget.name]= e.currentTarget.value;
        account[input.name]= input.value
        this.setState({ account});
    }

    render() { 
        //obj destruct
        const { account } =this.state;

        return (
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                <Input 
                    name="username"
                    value={account.username}
                    label="Username"
                    onChange={this.handleChange}
                />
                <Input 
                    name="password"
                    value={account.password}
                    label="Password"
                    onChange={this.handleChange}
                />      
                <button className="btn btn-primary">Login</button>
            </form>     
        </div>
        );
    }
}
 
export default LoginForm;

//if we want to work w/properties of obj dynamically instead of. use []

