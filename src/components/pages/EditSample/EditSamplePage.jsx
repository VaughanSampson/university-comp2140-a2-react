import { useState } from "react";
import ToggleRowSelection from "./ToggleRowSelection.jsx";

const notesList = ['B', 'A', 'G', 'F', 'E', 'D', 'C'];

const EditSample = () =>{
    const [typeIndex, setTypeIndex] = useState(2);
    const [noteSet, setNoteSet] = useState(
        [
            {"B": [false, false, false, false, false, false, false, false,
                 false, false, false, false, false, false, false, false]},
            {"A": [false, false, false, false, false, false, false, false,
                 false, false, false, false, false, false, false, false]},
            {"G": [false, false, false, false, false, false, false, false,
                 false, false, false, false, false, false, false, false]},
            {"F": [false, false, false, false, false, false, false, false,
                 false, false, false, false, false, false, false, false]},
            {"E": [false, false, false, false, false, false, false, false,
                 false, false, false, false, false, false, false, false]},
            {"D": [false, false, false, false, false, false, false, false,
                 false, false, false, false, false, false, false, false]},
            {"C": [false, false, false, false, false, false, false, false,
                 false, false, false, false, false, false, false, false]}
        ]
    ); 
 
    const flipNote = (note, index) =>{
        for(let i = 0; i < notesList.length; i++){
            if(notesList[i] === note) 
            { 
                const updatedNoteSet = noteSet;
                updatedNoteSet[i][notesList[i]][index] = !updatedNoteSet[i][notesList[i]][index]; 
                setNoteSet([...updatedNoteSet]);
            }
        }
    }

    return (
        <main>
            <h2 className="title">Edit Sample:</h2>
            <form className="card edit-card">
                <input type="text"></input>
                <div className="button-group-container">
                        <button type="button" className="bright-button">Preview</button>
                        <button type="button" className="bright-button">Save</button>
                </div>
            </form>

            <ToggleRowSelection
            title="Type" 
            radio={true} 
            index={typeIndex} 
            titles={["guitar", "piano", "violin", "drums"]} 
            callback={setTypeIndex}
            /> 

            { notesList.map((note, index) => 
                    <ToggleRowSelection 
                    key={index}
                    title={note}
                    radio={false} 
                    truthMap={noteSet[index][note]} 
                    callback={flipNote}
                    />
            )}
        </main>
    )
}

export default EditSample;