import React, { Component } from 'react';
import Joi from 'joi-browser';   
import  Input from './input';
import Select from './select';


class Form extends Component {
    state = { 
        data: {},
        errors: {}   
     };

     validate = () => {
        const options = { abortEarly: false };
        //destruc result.error
        const {error} = Joi.validate(this.state.data, this.schema, options);
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
    }; 

    handleSubmit =  e => {
        e.preventDefault();

        const errors = this.validate();
        //if u dont have errors above will be null state was null wh/got a run time error
        //set error property to error obj OR an empty obj, errors prop should always
        //be st to an obj never to null
        console.log(errors);
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit()
    }; 

    handleChange = ({ currentTarget: input }) => {
        //need to update this state,1st clone errors property of our state obj
        const errors = {...this.state.errors};   
        const errorMessage =this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data ={...this.state.data};
        //returns our input filed and we get the va;ue property
        //data[e.currentTarget.name]= e.currentTarget.value;
        data[input.name]= input.value
        this.setState({ data, errors});
    }; 

    renderButton(label) {
        return (
            <button 
                disabled={this.validate()} 
                className="btn btn-primary">
                    {label}
            </button>
        );
    }

    renderSelect(name, label, options) {
        const { data, errors } = this.state;
    
        return (
          <Select
            name={name}
            value={data[name]}
            label={label}
            options={options}
            onChange={this.handleChange}
            error={errors[name]}
          />
        );
      }

    renderInput(name, label, type = 'text') {
        //obj destruct
        const { data, errors } =this.state;

         return (
           <Input 
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                //tried to access username property of null> handleSubmit
                error={errors[name]}
                />
        );

    }
 }
    
export default Form;