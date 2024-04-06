import React, { useState } from 'react';
import './CSS/Search.css';
import { Link } from 'react-router-dom';

const Search = () => {
    const [searchType, setSearchType] = useState("name");
    const [searchKeywords, setSearchKeywords] = useState("");
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState()

    const handleKeywordsChange = (event) => {
        setSearchKeywords(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    return (
        <div className='search'>
            <div className="search-container">
                <h1>Find what you want</h1>
                <div className='search-option'>
                    <p>Search by:</p>
                    <form>
                        <label>
                            <input
                                type="radio"
                                name="searchType"
                                value="name"
                                checked={searchType === "name"}
                                onChange={handleSearchTypeChange}
                            />
                            Name
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="searchType"
                                value="productId"
                                onChange={handleSearchTypeChange}
                            />
                            Product ID
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="searchType"
                                value="category"
                                onChange={handleSearchTypeChange}
                            />
                            Category
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="searchType"
                                value="priceRange"
                                onChange={handleSearchTypeChange}
                            />
                            Price Range
                        </label>
                    </form>
                </div>
                {searchType === "name" || searchType === "category" ?
                    <div className="search-fields">
                        <input type="text" placeholder={searchType === "name" ? "Enter Product name here" : "Enter Category here"}
                            value={searchKeywords}
                            onChange={handleKeywordsChange} />
                    </div> : null
                }
                {searchType === "productId" ?
                    <div className="search-fields">
                        <input type="number" placeholder="Enter Product id here"
                            value={searchKeywords}
                            onChange={handleKeywordsChange} />
                    </div> : null
                }
                {searchType === "priceRange" ?
                    <div className="search-fields-price-range">
                        <input type="number" placeholder="Minimum Price"
                            value={minPrice}
                            min="0"
                            onChange={handleMinPriceChange} />
                        <div>To</div>
                        <input type="number" placeholder="Maximum Price"
                            value={maxPrice}
                            min="0"
                            onChange={handleMaxPriceChange} />
                    </div> : null
                }

                <Link to={`/searchresult?searchType=${searchType}&keywords=${searchKeywords}&minPrice=${minPrice}&maxPrice=${maxPrice}`}><button> Search </button></Link>
            </div>

        </div>
    );
};

export default Search;