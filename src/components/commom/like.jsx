import React, { Component } from 'react';

 //Input: liked: booleanT/F
 //Output: onClick

 const Like = (props ) => {
    let classes = "fa fa-heart";
    if (!props.liked) classes += "-o";
    //we should handle the onClick event of the DOM element +raise 
    //a custom event wh/also happens to be called onClick
    //these 2 events are DIFFERENT 
    //     we're responding to the cleck of DOM elements, we are raising another
                                    //custom event called onClick
    return (
            <i 
            onClick={props.onClick} 
            style={{cursor: "pointer"}}  
            className={classes} 
            aria-hidden="true" 
            />
    );
}
 
//when u conver a class to a functional compnent u have to get rid of all the references
//th this
 
export default Like;