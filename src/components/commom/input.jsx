import React from 'react';

//def props here
const Input = ({name, label, value, error, onChange}) => {
    return ( 
        <div className="form-group">
                    <label htmlFor={name}>{label}</label>
                    <input 
                        //input no longer has its own state, used props to set its value
                        //value={account.username}
                        value={value}
                        onChange={onChange}
                        id={name}
                        name={name}
                        type="text" 
                        className="form-control"
                    /> 
                    {/*conditonal rendering */}
                    {/*if error is truthy, then expressin error will b returned, othersie falsey ignore it */}
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
     );
}
 
export default Input;