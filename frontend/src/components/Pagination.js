import React from 'react';
import "./Pagination.css"

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className='pagination-container'>
        {pages.map((page) => (
            <button key={page} className={`page-item ${page === currentPage ? 'active' : ''}`} onClick={() => onPageChange(page)}>
              {page}
            </button>
        ))}
    </div>
  );
};

export default Pagination;
