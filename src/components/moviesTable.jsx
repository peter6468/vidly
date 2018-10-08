import React, { Component } from 'react';
import Table from './commom/table';
import Like from './commom/like';

class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Title' },
        {path: 'genre.name', label: 'Genre' },
        {path: 'numberInStock', label: 'Stock' },
        {path: 'dailyRentalRate'  , label: 'Rate' },
        {
            key : 'like', 
            content: movie => 
                //replace w/funct, instaed of setting to react element, takes parameter
                //movie + returns a react element
                <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}/>
        },
        {
            key: 'delete', 
            content: movie =>(
                <button 
                    onClick={() => this.props.onDelete(movie)} 
                    className="btn btn-danger btn-sm"
                >
        Delete
        </button>   
            )
        }
    ];
    //what we're ref in jsx expr is essentiall a plain js obj, so just like we can
    //pass any obj to funct or use them as values of props, columnsns array add 
    // anew prop set a jsx expression

    render() { 
        const { movies, onSort, sortColumn } = this.props; 

        return ( 
            <Table 
            columns={this.columns} 
            data={movies} 
            sortColumn={sortColumn} 
            onSort={onSort} />
   
        );  
    }
 }

  
 export default MoviesTable;