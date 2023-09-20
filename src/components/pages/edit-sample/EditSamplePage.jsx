import { useEffect, useState } from "react";
import ToggleRowSelection from "./ToggleRowSelection.jsx";
import PreviewButton from "../../preview/PreviewButton.jsx";
import { playNote, setInstrumentWithName } from "../../../helper/music.js";
import { instruments } from "../../../data/instruments.js";
import { getSample } from "../../../api/songtrax.js";
 
const notesList = ['B', 'A', 'G', 'F', 'E', 'D', 'C'];
const instrumentList = Object.keys(instruments);
const emptySequence = [];
for(let i = 0; i < 16; i++)
    emptySequence.push(false);

const EditSample = ({callback_save}) =>{
     
    const [sampleTitle, setSampleTitle] = useState("New Track");
    const [instrument, setInstrument] = useState("");
    const [noteSequence, setNoteSequence] = useState(
        notesList.map(note =>  ({[note]: [...emptySequence]}))
    ); 
    const [id, setID] = useState(-1);
 
    useEffect(() => { 
        selectInstrument(instrumentList[0], false);
        const query = window.location.search;
        if(query !== null && query !== undefined && query.length > 0)
        {
            const urlParams = new URLSearchParams(query);
            const id = urlParams.get('id'); 
            if(id !== undefined) loadFromSampleID(id);
        }
      }, []);

    async function loadFromSampleID(id){ 
        const sampleData = await getSample(id);
        if(sampleData !== undefined)
        {
            setSampleTitle(sampleData.name);
            setInstrument(sampleData.type);
            setNoteSequence(JSON.parse(sampleData.recording_data));
            setID(sampleData.id);
        }
    } 
    
    function createSave(){ 
        const save = {
            "id": id,
            "name": sampleTitle,
            "recording_data": JSON.stringify(noteSequence),
            "type": instrument
        }
        callback_save(save);
    }

    function selectInstrument(instrument, playNoise = true){
        setInstrument(instrument);
        setInstrumentWithName(instrument); 
        if(playNoise)
            playNote("C");
    } 
 
    function toggleNote(note, index, playNoise = true){
        if(playNoise)
            playNote(note);
        for(let i = 0; i < notesList.length; i++){
            if(notesList[i] === note) 
            { 
                const updatedNoteSet = noteSequence;
                updatedNoteSet[i][notesList[i]][index] 
                = !updatedNoteSet[i][notesList[i]][index]; 
                setNoteSequence([...updatedNoteSet]);
            }
        }
    }
 
    const saveText = (id === -1)? "Save New" :  "Overwrite Save"; 
 
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
                    <PreviewButton instrument={instrument} noteSequence={noteSequence} />
                    <button  type="button"  className="bright-button" onClick={() => createSave()}>
                        {saveText}
                    </button>
                </div>
 
            </form>

            <ToggleRowSelection
            title="Type" 
            radio={true} 
            selected={instrument} 
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