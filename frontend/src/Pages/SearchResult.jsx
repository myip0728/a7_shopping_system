import React, { useContext, useState, useEffect } from 'react'
import './CSS/SearchResult.css'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import { ShopContext } from '../Context/ShopContext';
import { useSearchParams } from 'react-router-dom'


export const SearchResult = () => {
    const { all_product } = useContext(ShopContext);; //using context to receive the product list
    const [numToShow, setNumToShow] = useState(12); //Indicating how many product are showing currently
    const [filteredProducts, setFilteredProducts] = useState([]); //Indicating the Product list the are current showing to the user
    const [formVisble, setFormvisble] = useState(false); //Setting the visibility of the sort options 
    const [selectedSortOption, setSelectedSortOption] = useState("1"); //Indicating the sort option

    const [searchParams] = useSearchParams(); //Getting the Keywords searched from the url
    const old_keywords = searchParams.get("keywords");
    const old_minPrice = searchParams.get("minPrice");
    const old_maxPrice = searchParams.get("maxPrice");
    const old_searchType = searchParams.get("searchType");
    const [old_searchTypeString, setOldSearchTypeString] = useState("") //For showing search result


    //State variable for undergoing a new search
    const [new_searchType, setNewSearchType] = useState("name");
    const [new_keywords, setNewKeywords] = useState("");
    const [new_minPrice, setNewMinPrice] = useState();
    const [new_maxPrice, setNewMaxPrice] = useState();
    const [Result, setResult] = useState([]);



    useEffect(() => { //This ensures that the returned array of product is contains the keywords
        const searchResult = all_product.filter((product) => {
            const keywords = old_keywords.toLowerCase(); //Getting the keyword we are searching

            const productName = product.name.toLowerCase(); //Getting the product name in all_product
            const category = product.category.toLowerCase(); //Getting the product category in all_product
            const id = product.id; //Getting the product category in all_product
            const price = product.new_price;

            switch (old_searchType) {
                case "name":
                    setOldSearchTypeString("Product Name");
                    return (productName.includes(keywords));
                case "productId":
                    setOldSearchTypeString("Product Id");
                    return (id.toString() === keywords);
                case "category":
                    setOldSearchTypeString("Category");
                    return (category === keywords);
                case "priceRange":
                    setOldSearchTypeString("Price Range");
                    return (price >= old_minPrice && price <= old_maxPrice);
                default:
                    return all_product;
            }
        });
        setResult(searchResult);
        setFilteredProducts(searchResult);
        setNumToShow(Math.min(12, searchResult.length));
        // eslint-disable-next-lin
    }, [all_product, old_keywords, old_maxPrice, old_minPrice, old_searchType]);


    useEffect(() => { //This ensure rerendering when the web application switch page in different categories

        // The below is for filtered product to reorder
        let sortedProducts = [...Result];
        switch (selectedSortOption) {
            case "0":
                sortedProducts = [...Result];
                break;
            case "1": // highest to lowest rating
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            case "2": // lowest to highest rating
                sortedProducts.sort((a, b) => a.rating - b.rating);
                break;
            case "3": // highest to lowest price
                sortedProducts.sort((a, b) => b.new_price - a.new_price);
                break;
            case "4": // lowest to highest price
                sortedProducts.sort((a, b) => a.new_price - b.new_price);
                break;
            case "5": // alphabetical name order
                sortedProducts.sort((a, b) =>
                    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
                );
                break;
            case "6": // newest to oldest based on update_time
                sortedProducts.sort((a, b) => new Date(b.update_time) - new Date(a.update_time));
                break;
            default:
                break;
        }
        setFilteredProducts(sortedProducts);
        setNumToShow(Math.min(12, sortedProducts.length));
        console.log(sortedProducts);
    }, [Result, selectedSortOption]);

    const productsToShow = filteredProducts.slice(0, numToShow);

    const handleLoadMore = () => {
        setNumToShow(numToShow + 12);
    };

    const handleSortby = () => {
        setFormvisble(!formVisble);
        if (!formVisble) {
            setSelectedSortOption("1"); // Reset the selected sorting option
        } else { setSelectedSortOption("0"); }
    };

    const handleSortOptionChange = (event) => { //handle the change of sorting option when the user change
        setSelectedSortOption(event.target.value);
    };

    const handleKeywordsChange = (event) => { //handle the change of inputting of the new keyword when user wish to search one more time
        setNewKeywords(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setNewSearchType(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        setNewMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setNewMaxPrice(event.target.value);
    };

    const handleButtonClick = () => {
        if (new_searchType === "priceRange") {
            setNewKeywords("");
        } else {
            setNewMaxPrice();
            setNewMinPrice();
        }
        window.location.href = `/searchresult?searchType=${new_searchType}&keywords=${new_keywords}&minPrice=${new_minPrice}&maxPrice=${new_maxPrice}`
    }

    return (
        <div className='search-result'>
            <div className="searchResult">
                <div className="search-option">
                    <p>Search again by:</p>
                    <form>
                        <label>
                            <input
                                type="radio"
                                name="searchType"
                                value="name"
                                checked={new_searchType === "name"}
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
                <div className='search-bar-component'>
                    {new_searchType === "name" || new_searchType === "category" ?
                        <div className="search-result-fields">
                            <input type="text" placeholder={new_searchType === "name" ? "Enter Product name here" : "Enter Category here"}
                                value={new_keywords}
                                onChange={handleKeywordsChange} />
                        </div> : null
                    }
                    {new_searchType === "productId" ?
                        <div className="search-result-fields">
                            <input type="number" placeholder="Enter Product id here"
                                value={new_keywords}
                                onChange={handleKeywordsChange} />
                        </div> : null
                    }
                    {new_searchType === "priceRange" ?
                        <div className="search-result-price-range">
                            <input type="number" placeholder="Minimum Price"
                                value={new_minPrice}
                                min="0"
                                onChange={handleMinPriceChange} />
                            <div>To</div>
                            <input type="number" placeholder="Maximum Price"
                                value={new_maxPrice}
                                min="0"
                                onChange={handleMaxPriceChange} />
                        </div> : null
                    }

                    <button onClick={handleButtonClick}> Search </button>
                </div>
            </div>
            {filteredProducts.length !== 0 ?
                <div>
                    <h1>Here is the search result of {old_searchType === "priceRange" ? `"${old_searchTypeString}: From ${old_minPrice} to ${old_maxPrice}"` : `${old_searchTypeString}: "${old_keywords}"`}</h1>

                    <div className="search-result-indexSort">

                        <p><span>Showing 1-{Math.min(numToShow, filteredProducts.length)}</span> out of {filteredProducts.length} products</p>

                        <div className='search-result-sort' >
                            <div onClick={handleSortby} >Sort by </div>
                            {!formVisble && <img src={dropdown_icon} alt="" onClick={handleSortby} />}
                            {formVisble && <form action="">
                                <select value={selectedSortOption} onChange={handleSortOptionChange}>
                                    <option value="1">highest to lowest rating</option>
                                    <option value="2">lowest to hightest rating</option>
                                    <option value="3">highest to lowest price</option>
                                    <option value="4">lowest to highest price</option>
                                    <option value="5">alphabetical name order</option>
                                    <option value="6">newest to oldest</option>
                                </select>
                            </form>}
                        </div>
                    </div>
                    <div className="search-result-products">
                        {productsToShow.map((item, i) => {
                            return <Item key={i} id={item.id} name={item.name} images={item.images} new_price={item.new_price} old_price={item.old_price} />
                        })}
                    </div>
                    {numToShow < filteredProducts.length && (
                        <div className='search-result-loadmore' onClick={handleLoadMore}>
                            Explore more
                        </div>
                    )}
                </div> : null
            }
            {filteredProducts.length === 0 ?
                <h1>Sorry, we don't have product that matched the criterion. Please try other search term</h1> : null
            }

        </div >
    )
}

export default SearchResult