import {Link} from 'react-router-dom';
import PreviewButton from "../../preview/PreviewButton.jsx"

const CreateCard = ({sample, editOption, shareOption, callback_delete}) => {
    const date = new Date(sample.datetime);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return( 
        <section className="sample">
                <div className="card">
                    <div className="song-details">
                        <h3>{sample.name}</h3>
                        <p>{`Updated last: ${hours}:${minutes} ${day}/${month}/${year}`}</p> 
                    </div>
                    <div className="button-group-container">
                        {shareOption && 
                        <Link to={`/share-sample?id=${sample.id}`} className="bright-button">Share</Link>}
                        <PreviewButton 
                        instrument={sample.type} 
                        recording_data={JSON.parse(sample.recording_data)}>
                        </PreviewButton>
                        {editOption && 
                        <Link to={`/edit-sample?id=${sample.id}`} className="bright-button">Edit</Link>}
                        {callback_delete && 
                        <button className="bright-button" onClick={() => (callback_delete(sample.id))}>Delete</button>}
                    </div>
                </div>
            </section>
    );
}

export default CreateCard;