import { useEffect, useState } from 'react'
import PreviewButton from "../../preview/PreviewButton.jsx";
import spinner from '../../../icons/spinner-solid.svg'

/**
 * Creates the form to sit at the top of the edit sample page.
 * @param {JSON} props Set of properties to render and callbacks
 * to interact with parent component. 
 * @returns React DOM of edit sample page form.
 */
export default function EditSamplePageForm({ id, title, instrument, noteSequence,
    onOverwriteSave, onCreateSave, onSetTitle }) {

    // State for storing whether to render loading wheel.
    const [saving, setSaving] = useState(false);

    /**
     * Displays loading wheel for 0.4 seconds to make the application
     * feel responsive to input.
     */
    async function doSavingAnimation() {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 400));
        setSaving(false);
    }

    // Returns edit sample page React DOM.
    return (
        <form className="card edit-card">
            <input
                type="text"
                name="sampleTitle"
                onChange={(e) => onSetTitle(e.target.value)}
                value={title}
            />

            <div className="button-group-container">
                <PreviewButton instrument={instrument} recording_data={noteSequence} />
                {(id !== -1) &&
                    <button type="button" className="bright-button" onClick={() => {
                        onOverwriteSave();
                        doSavingAnimation();
                    }}>
                        Overwrite Save
                    </button>
                }
                <button type="button" className="bright-button" onClick={() => {
                    onCreateSave();
                    doSavingAnimation();
                }}>
                    Save as New
                </button>

                {saving && <img className="icon spinner" src={spinner}></img>}
            </div>
        </form>
    )
} 