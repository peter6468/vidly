import React, { Component } from 'react';

const ListGroup = (props) => {
    const { items, textProperty, valueProperty } = props;

    return <ul className="list-group">
       {items.map(item => (
       <li key={item[valueProperty]}  className="list-group-item">
       {item[textProperty]}
       </li>
       ))}
    </ul>;
    
}
 
ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}
//w/this we no longer have to pass these 2 props when using our list group,
//this simplifies the interface of r list group

export default ListGroup;