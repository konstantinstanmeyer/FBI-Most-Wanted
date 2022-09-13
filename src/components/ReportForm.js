import React, { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Criminal from "./Criminal"

function ReportForm({ handleAddSuspect }){
    const [alias, setAlias] = useState("")
    const [reward, setReward] = useState("")
    const [crimeDesc, setCrimeDesc] = useState("")
    const [suspectDesc, setSuspectDesc] = useState("")
    const [warning, setWarning] = useState("")
    const [caution, setCaution] = useState("")
    const [url, setUrl] = useState("")

    function handleSubmit(e){
        e.preventDefault();
        fetch("http://localhost:3000/items", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "aliases": [alias],
                "description": suspectDesc,
                "image": url,
                "details": crimeDesc,
                "warning": warning,
                "reward": reward,
                "caution": caution,
                "id": uuidv4(),
            })
        })
        .then(r => r.json())
        .then((newSuspect) => handleAddSuspect(newSuspect))
    }

    return(
        <div id="report-form">
            <div>
                <h2>Report A Crime</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="alias" placeholder="Alias" 
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                    />
                    <input type="text" name="reward" placeholder="Reward"
                        value={reward}
                        onChange={(e) => setReward(e.target.value)}
                    />
                    <textarea name="description" placeholder="Crime Description"
                        value={crimeDesc}
                        onChange={(e) => setCrimeDesc(e.target.value)}
                    />
                    <input type="text" name="details" placeholder="Suspect Description"
                        value={suspectDesc}
                        onChange={(e) => setSuspectDesc(e.target.value)}
                    />
                    <input type="text" name="warning" placeholder="Warning Information"
                        value={warning}
                        onChange={(e) => setWarning(e.target.value)}
                    />
                    <input type="text" name="caution" placeholder="Caution Information"
                        value={caution}
                        onChange={(e) => setCaution(e.target.value)}
                    />
                    <input type="text" name="image" placeholder="Headshot URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button type="submit">Submit Suspect</button>
                </form>
            </div>
            <div>
                <h2>Report Preview:</h2>
                <Criminal criminal={{ aliases: [alias], description: suspectDesc, images: [{thumb:url}], details: crimeDesc, warning: warning, reward: reward, caution: caution}} />
            </div>
        </div>
    )
}

export default ReportForm;