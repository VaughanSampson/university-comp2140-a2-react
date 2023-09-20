import { useEffect, useState } from "react";
import ToggleRowSelection from "./ToggleRowSelection.jsx";
import PreviewButton from "../../preview/PreviewButton.jsx";
import { playNote, setInstrument } from "../../../helper/music.js";
import { instruments } from "../../../data/instruments.js"
 
const notesList = ['B', 'A', 'G', 'F', 'E', 'D', 'C'];
const instrumentList = Object.keys(instruments);
const emptySequence = [];
for(let i = 0; i < 16; i++)
    emptySequence.push(false);

const EditSample = ({callbackOnSave, samples}) =>{
 
    const [sampleTitle, setSampleTitle] = useState("New Track");
    const [instrumentIndex, setInstrumentIndex] = useState(0);
    const [noteSequence, setNoteSequence] = useState(
        notesList.map(note =>  ({[note]: [...emptySequence]}))
    ); 

    // Load pre-existing sample in if url has query parameter
    useEffect(() => { 
        const query = window.location.search;
        if(query !== null && query !== undefined && query.length > 0)
        {
            const urlParams = new URLSearchParams(query);
            const index = urlParams.get('sample');
            if(index >= samples.length) return;
            const sampleSave = samples[index];
            setSampleTitle(sampleSave.title);
            setInstrumentIndex(sampleSave.instrumentIndex);
            setNoteSequence(sampleSave.noteSequence);
        }
      }, []);

    
    function generateSave(){ 
        const save = {
            "title": sampleTitle,
            "instrumentIndex": instrumentIndex,
            "date": new Date(),
            "noteSequence": noteSequence
        }
        callbackOnSave(save);
    }

    function selectInstrument(index){
        setInstrument(instrumentList[index]);
        setInstrumentIndex(index); 
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

    const titles = samples.find(sample => sample.title === sampleTitle);
    const saveText = titles?  "Overwrite Save" : "Save New"; 
    
 
    return (
        <main> 
            <h2 className="title">Edit Sample:</h2>
            <form className="card edit-card">
                <input 
                type="text" 
                name="sampleTitle" 
                onChange={(e)=>setSampleTitle(e.target.value)} 
                value={sampleTitle}
                > 
                </input>

                <div className="button-group-container">
                    <PreviewButton noteSequence={noteSequence} />
                    <button 
                    type="button" 
                    className="bright-button" 
                    onClick={() => generateSave()}>
                        {saveText}
                    </button>
                </div>
 
            </form>

            <ToggleRowSelection
            title="Type" 
            radio={true} 
            index={instrumentIndex} 
            titles={instrumentList} 
            callback={selectInstrument}
            /> 

            {       
                notesList.map((note, index) => 
                    <ToggleRowSelection 
                    key={index}
                    title={note}
                    radio={false} 
                    truthMap={noteSequence[index][note]} 
                    callback={toggleNote}/>
                )
            }
        </main>
    )
}

export default EditSample;