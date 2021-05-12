import React, {useState, useEffect} from "react";
import axios from 'axios';

const DeleteSport = (props) => {

    const [sportID, setSportID] = useState("");

    const handleSubmit = (event) =>{
        axios.delete(`http://localhost:9090/api/sport/${sportID}`)
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
            <h1>Sport deletion</h1>
            <label htmlFor="deletesportid">ID:</label>
            <input id="deletesportid" type='number' value={sportID} onChange={event => setSportID(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default DeleteSport;
