import PreviewButton from "../../preview/PreviewButton.jsx";

const EditSamplePageForm = ({id, title, instrument, noteSequence, 
    callback_overwriteSave, callback_createSave, callback_setTitle}) => {

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
                    <button  type="button"  className="bright-button" onClick={() => callback_overwriteSave()}>
                        Overwrite Save
                    </button>
                    }
                    <button  type="button"  className="bright-button" onClick={() => callback_createSave()}>
                        Save as New
                    </button>
                </div> 
        </form>
    )
}

export default EditSamplePageForm;