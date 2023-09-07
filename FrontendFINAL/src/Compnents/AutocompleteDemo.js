import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import axios from 'axios';
import useState from 'react';
import useEffect from 'react';

export default function AutocompleteDemo() {
    const [stateList, setStateList] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchStateData() {
            try {
                const response = await fetch("http://localhost:8080/api/states");
                const result = await response.json();
                setStateList(result); 

                // const response = await axios.get('http://localhost:8080/api/states');
                // setStateList(response.data); 

                // Extract stateName values and populate the data array 
                result.map(state => setData(state.stateName)) 
                // const stateNames = response.data.map(state => state.stateName); 
                // setData(stateNames); 
            } catch (error) {
                console.error('Error fetching state data:', error);
            }
        }

        fetchStateData();
    }, []);


    // const data = ['Option 1', 'Option 2']; 

    function handelOnSelect() {
        console.log("hello");
    }

    return (
        <div>
            <p>hello</p>
            <Autocomplete options={data} onChange={handelOnSelect} />
        </div>


    )
}
