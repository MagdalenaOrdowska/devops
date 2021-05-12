import React, {useState, useEffect} from "react";
import axios from 'axios';

const Sport = (props) => {
    const [sport, setSports] = useState([]);
    const[number, setNumber] = useState(-1);
    useEffect(() =>{
        axios.get('/api/sport')
        .then(response => setSports(response.data))
        .catch(error => console.log(error));
    }, []);

    const handleSportClick = (event) => {
        console.log(event.target);
    }

    return (
    <>
    <h1>Sports list</h1>
        <div>
            {sport.map(sport => (<div key={sport.id} onClick={handleSportClick}>{sport.id}. {sport.name}</div>))}
        </div>
    </>
    );
}

export default Sport;
