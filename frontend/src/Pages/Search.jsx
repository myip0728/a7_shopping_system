import React, { useState, useContext, useEffect } from 'react';
import './CSS/Search.css';
import { ShopContext } from '../Context/ShopContext';
import SearchResult from './SearchResult';
import { Link } from 'react-router-dom';

const Search = () => {
    const { all_product } = useContext(ShopContext);
    const [firstSearch, setFirstSearch] = useState(true);
    const [searchResult, setSearchResult] = useState([]);
    const [keywords, setKeywords] = useState('');

    const [searchKeywords, setSearchKeywords] = useState('');

    useEffect(() => {
        setSearchResult(all_product);
    }, [all_product]);

    const findProduct = (event) => {
        if (firstSearch) {
            setFirstSearch(false);
            setKeywords(event.target.value.toLowerCase());
        } else {
            setKeywords((prevKeywords) => prevKeywords.toLowerCase());
        }

        const filteredProducts = all_product.filter((product) =>
            product.name.toLowerCase().includes(keywords)
        );

        setSearchResult(filteredProducts);
    };

    const handleKeywordsChange = (event) => {
        setSearchKeywords(event.target.value);
    };

    return (
        <div className={firstSearch === true ? 'search' : ''}>
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