import {useEffect, useState} from 'react'
import PreviewButton from "../../preview/PreviewButton.jsx";
import spinner from '../../../icons/spinner-solid.svg'

const EditSamplePageForm = ({id, title, instrument, noteSequence, 
    callback_overwriteSave, callback_createSave, callback_setTitle}) => {
    const [saving, setSaving] = useState(false); 
     
    async function doSavingAnimation(){
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 400));
        setSaving(false);
    }

    return (
        <form className="card edit-card">
                <input 
                type="text" 
                name="sampleTitle" 
                onChange={(e)=>callback_setTitle(e.target.value)} 
                value={title}
                > 
                </input>

                <div className="button-group-container">
                    <PreviewButton instrument={instrument} recording_data={noteSequence} />
                    {(id !== -1) &&
                    <button  type="button"  className="bright-button" onClick={() => {
                        callback_overwriteSave();
                        doSavingAnimation(); 
                    }}>
                        Overwrite Save
                    </button>
                    }
                    <button  type="button"  className="bright-button" onClick={() => {
                        callback_createSave();
                        doSavingAnimation();
                    }}>
                        Save as New
                    </button> 

                    {saving && <img className="icon spinner" src={spinner}></img>}
                    
                </div> 
                
        </form>
    )
}

export default EditSamplePageForm;