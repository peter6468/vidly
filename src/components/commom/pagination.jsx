//starting w/a functional component: not going to have any local state+can pass all
//yhe data this component needs via props
//shortcuts:imtr,sfc

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
 

    const pagesCount = Math.ceil(itemsCount / pageSize);
    //console.log(pagesCount);
    if (pagesCount ===   1) return null;
    const pages = _.range(1, pagesCount + 1);

    //[1,2,3].map(  )
    return (
    <nav>
        <ul className="pagination">
            {pages.map(page=> (
                <li key={page} className ={ page === currentPage ? 'page-item active' : 'page-item'}>
                    <a className="page-link" onClick={() => onPageChange(page)}>
                    {page}
                    </a>
                </li>
            ))}
        </ul>
    </nav>  
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
 
export default Pagination;

//props.onPageChange destrucutre this, drop props and out it in 
//const{itmeCount,..,onPageChange}



//whenever u want to build a resuable component b4 implementing that you should think abt the tinerfacee
//what are the iputs the component is going to receive, what are the events its going to raise
//best way to decide the interface of a compnent is to use it b4 implementing it
//goto movies.jsx and import it