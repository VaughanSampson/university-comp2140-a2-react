import {Link} from 'react-router-dom';
import PreviewButton from "../../preview/PreviewButton.jsx"

const CreateCard = ({sample, editOption, shareOption}) => {
    return( 
        <section className="sample">
                <div className="card">
                    <div className="song-details">
                        <h3>{sample.name}</h3>
                        <p>{sample.datetime}</p> 
                    </div>
                    <div className="button-group-container">
                        {shareOption && <Link to={`/share-sample?id=${sample.id}`} className="bright-button">Share</Link>}
                        <PreviewButton instrument={sample.instrument} noteSequence={sample.noteSequence}></PreviewButton>
                        {editOption && <Link to={`/edit-sample?id=${sample.id}`} className="bright-button">Edit</Link>}
                    </div>
                </div>
            </section>
    );
}

export default CreateCard;