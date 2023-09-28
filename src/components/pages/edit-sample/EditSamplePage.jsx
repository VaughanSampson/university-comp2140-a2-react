import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { playNote, setInstrumentWithName } from "../../../helper/music.js";
import { instruments, notesList } from "../../../data/instruments.js";
import { getSample, postSample, putSample } from "../../../api/songtrax-handler.js";
import ToggleRowSelection from "./ToggleRowSelection.jsx";
import RadioRowSelection from "./RadioRowSelection.jsx";
import EditSamplePageForm from "./EditSamplePageForm.jsx"

// Constants
const instrumentList = Object.keys(instruments);
const emptySequence = [];
for (let i = 0; i < 16; i++) emptySequence.push(false);

/**
 * Creates an edit sample page.  
 * @returns An edit sample React DOM page.
 */
export default function EditSample() {
    // useNavigation hook for reloading page with different query string.
    const navigate = useNavigate();

    // useState hooks for maintaining complex data.
    const [sampleTitle, setSampleTitle] = useState("New Track");
    const [instrument, setInstrument] = useState("");
    const [noteSequence, setNoteSequence] = useState(notesList
        .map(note => ({ [note]: [...emptySequence] })));
    const [id, setID] = useState(-1);

    /**
     * useEffect hook which reloads the page with a new query string
     * when the samples id has been updated. This maintains
     * a link to the API for overwriting samples.
     */
    useEffect(() => {
        if (id !== -1) navigate(`/edit-sample?id=${id}`)
    }, [id]);

    /**
     * useEffect hook which loads the sample data reliably from the API
     * when (and only when) the page is first loaded or reloaded.
     * It does this by reading the sample ID from the query string.
     */
    useEffect(() => {
        selectInstrument(instrumentList[0], false);
        const query = window.location.search;
        if (query !== null && query !== undefined && query.length > 0) {
            const urlParams = new URLSearchParams(query);
            const id = urlParams.get('id');
            if (id !== undefined && id != -1) loadFromSampleID(id);
        }
    }, []);

    /**
     * Uses the songtrax-handler script to load sample save.
     * Relies on setting state with useState.
     * @param {int} id ID of sample save to load.
     */
    async function loadFromSampleID(id) {
        const sampleData = await getSample(id);
        if (sampleData !== undefined) {
            setSampleTitle(sampleData.name);
            setInstrument(sampleData.type);
            setNoteSequence(JSON.parse(sampleData.recording_data));
            setID(sampleData.id);
        }
    }

    /**
     * Accumulates all state into a JSON object.
     * @returns JSON object with all get state values.
     */
    function createSampleSaveObject() {
        return {
            "id": id,
            "name": sampleTitle,
            "recording_data": JSON.stringify(noteSequence),
            "type": instrument
        }
    }

    /**
     * Posts a new sample to the API, saving its ID to
     * allow overwriting.
     */
    async function createSave() {
        const saveSample = createSampleSaveObject();
        const createdSample = await postSample(saveSample);
        if (createdSample !== null) { setID(createdSample.id); }
    }

    /**
     * Puts the sample to the API, overwriting the sample
     * of the same ID.
     */
    function overwriteSave() {
        const saveSample = createSampleSaveObject();
        putSample(saveSample, saveSample.id);
    }

    /**
     * Set the current instrument, updating the local state
     * and the state of the music.js helper script.
     * @param {string} instrument Name of instrument type.
     * @param {boolean} playNoise Should a noise be played.
     */
    function selectInstrument(instrument, playNoise = true) {
        setInstrument(instrument);
        setInstrumentWithName(instrument); // From music.js
        if (playNoise) playNote("C"); // From music.js
    }

    /**
     * Toggles a specific note of the sample.
     * @param {string} note Musical note (For example, "B");
     * @param {int} index Bar where note is played.
     * @param {boolean} playNoise Should a noise be played.
     */
    function toggleNote(note, index, playNoise = true) {
        if (playNoise) playNote(note); // From music.js

        // Loop till the correct place is found to flip the note.
        for (let i = 0; i < notesList.length; i++) {
            if (notesList[i] === note) {
                const updatedNoteSet = noteSequence;
                updatedNoteSet[i][notesList[i]][index]
                    = !updatedNoteSet[i][notesList[i]][index];
                // Respan the array out to ensure re-render
                setNoteSequence([...updatedNoteSet]);
                return;
            }
        }
    }

    // Return the React DOM edit sample page
    return (
        <main>
            <h2 className="title">Edit Sample</h2>

            {/* Top of the page form */}
            <EditSamplePageForm id={id} title={sampleTitle}
                instrument={instrument} noteSequence={noteSequence}
                callback_overwriteSave={overwriteSave} callback_createSave={createSave}
                callback_setTitle={setSampleTitle} />

            {/* Instrument radio toggle */}
            <RadioRowSelection
                title="Type"
                selected={instrument}
                titles={instrumentList}
                callback={selectInstrument} />

            {/* Notes toggle */}
            {notesList.map((note, index) =>
                <ToggleRowSelection
                    key={index}
                    title={note}
                    map={noteSequence[index][note]}
                    callback={toggleNote} />
            )}

        </main>
    )
}
