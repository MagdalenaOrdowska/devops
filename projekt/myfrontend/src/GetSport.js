import React, {useState, useEffect} from "react";
import axios from 'axios';

const GetSport = (props) => {

    const [sportID, setSportID] = useState("");
    const [sport, setSport] = useState([]);

    const handleSubmit = (event) =>{
        console.log(sportID);
        axios.get(`/api/sport/${sportID}`)
        .then(response => setSport(response.data))
        .catch(error => console.log(error));
        console.log(sport);
        event.preventDefault();
    };

    return (
        <>
        <div>
            <h1>Sport search</h1>
            <label htmlFor="getsportid">ID:</label>
            <input id="getsportid" type='number' value={sportID} onChange={event => setSportID(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
            <br/>
            Name: {sport.name}<br/>
            Type: {sport.type}
        </div>
        </>
    );
};

export default GetSport;
