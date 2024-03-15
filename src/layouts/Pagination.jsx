import React from "react";
import { useSearchParams } from 'react-router-dom';

const Pagination = ({totalPages, currentPage}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Update Search Params
    const paginate = (pageNumber) => {
        const newSearchParams = new URLSearchParams(searchParams); 
        newSearchParams.set('page', pageNumber);
        setSearchParams(newSearchParams); 
    };

    return (
        <div className="flex justify-center pb-10">
            <div className="flex space-x-2">
                {[...Array(totalPages).keys()].map(number => (
                    <button key={number+1} onClick={() => paginate(number + 1)} className={`px-4 py-2 ${currentPage === number + 1 ? 'bg-gray-300' : 'bg-white'} rounded shadow`}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    )
};

export default Pagination;