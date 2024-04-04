import React, { useState } from 'react';
import './CSS/Search.css';
import { Link } from 'react-router-dom';

const Search = () => {
    const [searchKeywords, setSearchKeywords] = useState('');

    const handleKeywordsChange = (event) => {
        setSearchKeywords(event.target.value);
    };

    return (
        <div className='search'>
            <div className="search-container">
                <h1>Find what you want</h1>
                <div className="search-fields">
                    <input type="text" placeholder="Input keywords here"
                        value={searchKeywords}
                        onChange={handleKeywordsChange} />
                </div>
                <Link to={`/searchresult?keywords=${searchKeywords}`}><button> Search </button></Link>
            </div>

        </div>
    );
};

export default Search;