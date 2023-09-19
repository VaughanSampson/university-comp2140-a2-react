import { useState } from "react";
import ToggleRowSelection from "./ToggleRowSelection.jsx";
import PreviewButton from "../../preview/PreviewButton.jsx";
import { playNote, setInstrument } from "../../../helper/music.js";
 

const notesList = ['B', 'A', 'G', 'F', 'E', 'D', 'C'];
const instrumentList = ["guitar", "piano", "cello", "harmonium"];
const emptySequence = [];
for(let i = 0; i < 16; i++)
    emptySequence.push(false);

const EditSample = () =>{
 
    const [typeIndex, setTypeIndex] = useState(2);
    const [noteSequence, setNoteSequence] = useState(
        [
            {"B": [...emptySequence]}, {"A": [...emptySequence]},
            {"G": [...emptySequence]}, {"F": [...emptySequence]},
            {"E": [...emptySequence]}, {"D": [...emptySequence]},
            {"C": [...emptySequence]}
        ]
    ); 

    function selectInstrument(index){
        setInstrument(instrumentList[index]);
        setTypeIndex(index); 
    } 
 
    function toggleNote(note, index){
        playNote(note);
        for(let i = 0; i < notesList.length; i++){
            if(notesList[i] === note) 
            { 
                const updatedNoteSet = noteSequence;
                updatedNoteSet[i][notesList[i]][index] = !updatedNoteSet[i][notesList[i]][index]; 
                setNoteSequence([...updatedNoteSet]);
            }
        }
    }
 
    return (
        <main> 
            <h2 className="title">Edit Sample:</h2>
            <form className="card edit-card">
                <input type="text"></input>
                <div className="button-group-container">
                    <PreviewButton noteSequence={noteSequence} />
                    <button type="button" className="bright-button">Save</button>
                </div>
            </form>

            <ToggleRowSelection
            title="Type" 
            radio={true} 
            index={typeIndex} 
            titles={instrumentList} 
            callback={selectInstrument}
            /> 

            { notesList.map((note, index) => 
                    <ToggleRowSelection 
                    key={index}
                    title={note}
                    radio={false} 
                    truthMap={noteSequence[index][note]} 
                    callback={toggleNote}
                    />)
            }
        </main>
    )
}

export default EditSample;