import React, { Component } from 'react';

const ListGroup = ({ 
    items, 
    textProperty, 
    valueProperty, 
    selectedItem, 
    onItemSelect 
}) => {
   
    return (
        <ul className="list-group">
            {items.map(item => (
                <li 
                    onClick={() => onItemSelect(item)} 
                    key={item[valueProperty]}  
                    //if this item we are rendering=selected item, return list group item
                    //class + active class, otherwise return list-group-item
                    className={ 
                        item === selectedItem ? "list-group-item active" : "list-group-item"}
                    
            >
                {item[textProperty]}
            </li>
        ))}
        </ul>
    );
}
 
ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}
//w/this we no longer have to pass these 2 props when using our list group,
//this simplifies the interface of r list group

export default ListGroup;