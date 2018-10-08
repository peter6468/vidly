import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import Pagination from './commom/pagination';
import ListGroup from './commom/listGroup';
//use {} because we are dealing w/named exports
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc'  }
     };

     componentDidMount () {
         const genres =[{ _id: "", name: "All Genres"}, ...getGenres()]
         this.setState({ movies: getMovies(),genres });

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

     handleGenreSelect = genre => {
         this.setState({ selectedGenre: genre, currentPage: 1 });
     };

     handleSort = sortColumn => {
        this.setState ({ sortColumn });
        };

    render() { 
        //obj destructuring
        const { length:count } = this.state.movies;
        const { 
            pageSize, 
            currentPage, 
            sortColumn,
            selectedGenre, 
            movies: allMovies } =this.state; 

        if (count === 0) return <p>There are no movies in the database.</p>;

        //if selected genre is truthy, apply a filter so we get all movies+filter them
        //so m goes to m.genr_id should be = selectedGenre._id otherwise return allMovies
        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies =  paginate(sorted, currentPage, pageSize);
 
            return (
            <div className="row">
                <div className="col-3">
                 <ListGroup 
                    items={this.state.genres} 
                    selectedItem={this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect}  
                    />
                </div>
                <div className="col">
                <p>Showing {filtered.length} movies in the database.</p>
                {/* //zen coding table.table.thead>tr>th*4*/}
                <MoviesTable 
                    movies={movies} 
                    sortColumn={sortColumn}
                    onLike={this.handleLike} 
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                  />
                <Pagination 
                    itemsCount={filtered.length} 
                    pageSize={pageSize}
                    currentPage={currentPage} 
                    onPageChange={this.handlePageChange} />
                </div>       
                
            </div>
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

