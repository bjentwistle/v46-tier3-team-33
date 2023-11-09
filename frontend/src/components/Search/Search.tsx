import './search.css'
import { useContext, useState } from 'react'
import SearchResultCard from './searchResultCard';
import UserContext from '../../utils/UserContext';


const SearchBar = () => {
    const currentUser = useContext(UserContext);
    
    const [message, setMessage] = useState('')
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState<any[]>([]); // Use 'any' as a temporary type
    const [searchSelection, setSearchSelection] = useState('')
    
    const fetchData = async () => {
        
        try {
            
            const response = await fetch('http://localhost:8081/product', 
            {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setData(data);
                
                
                // Apply filtering here
                const filtered = data.filter((item: any) =>
                    item.name.toLowerCase().includes(value.toLowerCase())
                );
                setFilteredData(filtered);


                // If no matches on search term setMessage to no results found.
                if ( filteredData.length === 0) {
                    setMessage("No results found")
                } 
                
            } else {
                setMessage("Please login to search");
                console.error('API request failed with status:', response.status);
            }
        } catch (error: any) {
            console.error('API request error:', error.message);
            setMessage("Server Error - Please come back later");
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        if (currentUser === null) {
            setMessage("Please login to search")

        } else {
            // Call the fetchData function to make the API request and apply filtering
            fetchData();
        }
    }

    return (

        <>
        <form onSubmit={handleSubmit}>
            <div className="search_bar">
                <input required
                    type="text"
                    className="search_text"
                    placeholder="Search for veggies..."
                    value={value}
                    onChange={(e) => {
                    setValue(e.target.value);
                    }}
                    
                />
                <div className = 'search_submit' >
                    <button className="button" type="submit" >Search</button>
                </div>
            </div>
        </form>
        {/* Conditionally render the filtered data */}
        {filteredData.length > 0 ? (
                <div className="filtered_data">
                    <ul>
                        {filteredData.map((item: any) => (
                            <SearchResultCard key={item._id} item={item} />
                        ))}
                    </ul>
                </div>
            ) : (
                <div>{message}</div>
            )}
        </>
    )
}


export default SearchBar

