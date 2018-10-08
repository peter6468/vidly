import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
    renderCell =(item, column) => {
        if (column.content) return column.content(item);

        return _.get(item, column.path);
    };

    createKey =(item, column) => {
        return item._id + (column.path || column.key)
    }
     

    render() { 
        //obj destructing, pick all the props we need
        const {data, columns} =this.props;

        return  (
            <tbody>
                {data.map(item => (
                    <tr key={item._id}>
                        {columns.map(column => (
                        <td key={this.createKey(item, column)}>{
                            this.renderCell(item, column)}
                        </td>
                        ))}  
                    </tr>
            ))}
            </tbody>  
        );
    }
}
 
export default TableBody;

//in td we want to render a prop of thid current item, so we get item wh/ is our
//current obj,use [] to access a property dynamically, that prop is column.path
//**only works for SIMPLE PROPS , if ur dealing w/nested PROPS WONT WORK*/

//have to use loash _.get)item, column.path