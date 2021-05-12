import React, {useState, useEffect} from "react";
import axios from 'axios';

const AddSport = (props) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (event) =>{
        console.log(`Send ${title} ${body}`);
        axios.post('http://localhost:9090/api/sport',{
            name: title,
            type: body,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
            <h1>Add new sport</h1>
            <label htmlFor="addsportname">Name:</label>
            <input id="addsportname" type='text' value={title} onChange={event => setTitle(event.target.value)}/><br/>
            <label htmlFor="addsporttype">Type:</label>
            <input id="addsporttype" type='number' value={body} onChange={event => setBody(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default AddSport;
