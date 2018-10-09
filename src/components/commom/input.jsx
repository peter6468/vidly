import React from 'react';

const Input = ({name, label, value, onChange, account}) => {
    return ( 
        <div className="form-group">
                    <label htmlFor={name}>{label}</label>
                    <input 
                        //input no longer has its own state, used props to set its value
                        value={account.username}
                        onChange={onChange}
                        id={name}
                        name={name}
                        type="text" 
                        className="form-control"
                    />
                </div>
     );
}
 
export default Input;