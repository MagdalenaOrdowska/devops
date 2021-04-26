import React, {useState, useEffect} from "react";
import axios from 'axios';

const UpdateSport = (props) => {

    const [sportID, setSportID] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (event) =>{
        axios.put(`http://localhost:9090/api/sport/${sportID}`,{
            name: title,
            type: body,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
            <h1>Sport update</h1>
            <label for="updatesportid">ID:</label>
            <input id="updatesportid" type='number' value={sportID} onStar onChange={event => setSportID(event.target.value)}/><br/>
            <label for="updatesportname">Name:</label>
            <input id="updatesportname" type='text' value={title} onChange={event => setTitle(event.target.value)}/><br/>
            <label for="updatesporttype">Type:</label>
            <input id="updatesporttype" type='number' value={body} onChange={event => setBody(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default UpdateSport;