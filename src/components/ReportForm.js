import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Criminal from "./Criminal"

function ReportForm({ handleAddSuspect }){
    const [name, setName] = useState("")
    const [bounty, setBounty] = useState(0)
    const [mugshot, setMugshot] = useState("")
    const [crimeDesc, setCrimeDesc] = useState("")
    const [suspectDesc, setSuspectDesc] = useState("")

    const [formErrorText, setFormErrorText] = useState("")

    function handleSubmit(e){
        e.preventDefault();

        if (name === "") {
            setFormErrorText("Must have a name")
            return;
        }if (bounty < 1) {
            setFormErrorText("Bounty must be greater than 1 dollar")
            return;
        }if (crimeDesc === "") {
            setFormErrorText("Must have a crime description")
            return;
        }if (suspectDesc === "") {
            setFormErrorText("Must have a suspect description")
            return;
        }
        setFormErrorText("")

        fetch("http://localhost:3000/items", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                name: name,
                bounty: bounty,
                crimeDesc: crimeDesc,
                suspectDesc: suspectDesc,
                mugshot: mugshot,
                id: uuidv4(),
            })
        })
        .then(r => r.json())
        .then((newSuspect) => handleAddSuspect(newSuspect))
    }

    return(
        <div id="report-form">
            <div class="form-container">
                <h2>Report A Crime</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="name or alias" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input type="number" name="bounty" placeholder="Bounty"
                        value={bounty}
                        onChange={(e) => setBounty(e.target.value)}
                    />
                    <textarea type="text" name="details" placeholder="Suspect Description"
                        value={suspectDesc}
                        onChange={(e) => setSuspectDesc(e.target.value)}
                    />
                    <textarea name="description" placeholder="Crime Description"
                        value={crimeDesc}
                        onChange={(e) => setCrimeDesc(e.target.value)}
                    />
                    <input type="text" name="image" placeholder="Mugshot URL"
                        value={mugshot}
                        onChange={(e) => setMugshot(e.target.value)}
                    />
                    <button type="submit">Submit Suspect</button>
                </form>
                <p style={{color:"red"}}>{formErrorText}</p>
            </div>
            <div id="form-preview">
                <h2>Report Preview:</h2>
                <Criminal criminal={{ name: name, bounty: bounty, crimeDesc: crimeDesc, suspectDesc: suspectDesc, mugshot: mugshot }} />
            </div>
        </div>
    )
}

export default ReportForm;