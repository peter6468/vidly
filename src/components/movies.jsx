import React, { Component } from 'react';
import Like from './commom/like';
import Pagination from './commom/pagination';
//use {} because we are dealing w/named exports
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = { 
        movies: getMovies(),
        currentPage: 1,
        pageSize: 4
     }

     handleDelete = (movie) => {
         const movies = this.state.movies.filter(m =>m._id !== movie._id)
         this.setState({ movies });
     };

     handleLike = movie => {
        //we dont want to change the state directly, we want to take a copy
        //+give the new state to the setsState mehtod of our component
            //cloning movie
        const movies = [...this.state.movies];
        //here we have an array of objects, so we dont want to modify one of 
        //those objs directly, we want to clone that obj so in this array we need
        //to find the index of that obj
        const index = movies.indexOf(movie);
        //we goto movies of index, ser this to a new obj+ here we use spread ooperator    
        //to clone this obj 
        movies[index] = {...movies[index]}
        //change movies of index btoggle it, if its t it becomes f otherwise it becomes t
        movies[index].liked =!movies[index].liked
        //passing the movies array
        this.setState({ movies})
        //in the future this is where we are going to call the server to persist the changes
     }

     handlePageChange = page => {
         this.setState({ currentPage: page });
         //console.log(page);
     };

    render() { 
        //obj destructuring
        const { length:count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies } =this.state; 

        if (count === 0) return <p>There are no movies in the database.</p>;

        const movies =  paginate(allMovies, currentPage, pageSize);
 
        return (
            <React.Fragment>
            <p>Showing {count} movies in the database.</p>
            {/* //zen coding table.table.thead>tr>th*4*/}
             <table className="table">
                <thead>
                    <tr> 
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th /> 
                        <th /> 
                    </tr>
                </thead>
                <tbody>
                    { movies.map(movie => 
                    <tr key={movie._id} > 
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                            <Like liked={movie.liked} onClick={() => this.handleLike(movie)}/>
                        </td>
                        <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>)}
                </tbody>
            </table>
            <Pagination 
                itemsCount={count} 
                pageSize={pageSize}
                currentPage={currentPage} 
                onPageChange={this.handlePageChange} />
            </React.Fragment>
        );
    }
}

 
export default Movies;

//**we used obj destructing method earlier, extracted length property to count
// so {this.state.movies.length} can be simplified to count
//pages size will be used in multiple paces so its better to store it state

//every react component has a property called props wh/ are plain js obj, th inc all the attributes
//that we set in component

//state is data that is local or private to that component so other compnents cant 
//access that state, its completely internal to th/component
//props is read only we cannot change the input 2 this componet inside of the component

