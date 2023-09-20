import {Link} from 'react-router-dom';
import PreviewButton from "../../preview/PreviewButton.jsx"

const CreateCard = ({index, sample, editOption, shareOption}) => {
    return( 
        <section className="sample">
                <div className="card">
                    <div className="song-details">
                        <h3>{sample.title}</h3>
                        <p>{sample.date.toDateString()}</p> 
                    </div>
                    <div className="button-group-container">
                        {shareOption && <Link to={`/share-sample?sample=${index}`} className="bright-button">Share</Link>}
                        <PreviewButton instrument={sample.instrument} noteSequence={sample.noteSequence}></PreviewButton>
                        {editOption && <Link to={`/edit-sample?sample=${index}`} className="bright-button">Edit</Link>}
                    </div>
                </div>
            </section>
    );
}

export default CreateCard;