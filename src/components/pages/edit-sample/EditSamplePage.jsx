import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleRowSelection from "./ToggleRowSelection.jsx";
import EditSamplePageForm from "./EditSamplePageForm.jsx"
import { playNote, setInstrumentWithName } from "../../../helper/music.js";
import { instruments, notesList } from "../../../data/instruments.js";
import { getSample } from "../../../api/songtrax-handler.js";
 
const instrumentList = Object.keys(instruments);
const emptySequence = [];
for(let i = 0; i < 16; i++)
    emptySequence.push(false);

const EditSample = ({callback_create, callback_overwrite}) =>{
    const navigate = useNavigate();
     
    const [sampleTitle, setSampleTitle] = useState("New Track");
    const [instrument, setInstrument] = useState("");
    const [noteSequence, setNoteSequence] = useState(
        notesList.map(note =>  ({[note]: [...emptySequence]}))
    ); 
    const [id, setID] = useState(-1);

    useEffect(() => {
        if(id !== -1)
        navigate(`/edit-sample?id=${id}`)
    }, [id, navigate]);
 
    useEffect(() => { 
        selectInstrument(instrumentList[0], false);
        const query = window.location.search;
        if(query !== null && query !== undefined && query.length > 0)
        {
            const urlParams = new URLSearchParams(query);
            const id = urlParams.get('id'); 
            if(id !== undefined && id != -1) loadFromSampleID(id);
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
    
    async function createSave(){ 
        const save = {
            "id": id,
            "name": sampleTitle,
            "recording_data": JSON.stringify(noteSequence),
            "type": instrument
        }
        const getID = await callback_create(save);
        if(getID !== null) setID(getID);
    }

    async function overwriteSave(){
        const save = {
            "id": id,
            "name": sampleTitle,
            "recording_data": JSON.stringify(noteSequence),
            "type": instrument
        }
        callback_overwrite(save);
    }

    function selectInstrument(instrument, playNoise = true){
        setInstrument(instrument);
        setInstrumentWithName(instrument); 
        if(playNoise) playNote("C");
    }
 
    function toggleNote(note, index, playNoise = true){
        for(let i = 0; i < notesList.length; i++)
            if(notesList[i] === note) 
            { 
                const updatedNoteSet = noteSequence;
                updatedNoteSet[i][notesList[i]][index] 
                = !updatedNoteSet[i][notesList[i]][index]; 
                setNoteSequence([...updatedNoteSet]);
            }
        if(playNoise) playNote(note);
    } 

    return (
        <main> 
            <h2 className="title">Edit Sample:</h2>

            {/* Top of the page form */}
            <EditSamplePageForm id={id} title={sampleTitle} 
            instrument={instrument} noteSequence={noteSequence}
            callback_overwriteSave={overwriteSave} callback_createSave={createSave}
            callback_setTitle={setSampleTitle}/>
            
            {/* Instrument radio toggle */}
            <ToggleRowSelection
            title="Type" 
            radio={true} 
            selected={instrument} 
            titles={instrumentList} 
            callback={selectInstrument}/> 

            {/* Notes toggle */}
            {notesList.map((note, index) => 
                <ToggleRowSelection 
                key={index}
                title={note}
                radio={false} 
                truthMap={noteSequence[index][note]} 
                callback={toggleNote}/>
            )}

        </main>
    )
}

export default EditSample;