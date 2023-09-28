import { Link } from 'react-router-dom';
import PreviewButton from "../../preview/PreviewButton.jsx"
import { deleteSample } from "../../../api/songtrax-handler.js";

/**
 * Creates sample card to represent a sample.
 * @param {JSON} props display values and callback function for
 * sending input to parent.
 * @returns Sample card React DOM.
 */
export default function SampleCard({ sample, editOption, shareOption, shared, onDelete }) {
    // Gets data for date display
    const date = new Date(sample.datetime);
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Returns react component
    return (
        <section className="sample">
            <div className="card">
                <div className="song-details">
                    <h3>{sample.name}</h3>
                    <p>{`Updated last: ${hours}:${minutes} ${day}/${month}/${year}`}</p>
                </div>
                <div className="button-group-container">
                    {shareOption &&
                        <Link to={`/share-sample?id=${sample.id}`} className="bright-button">
                            {shared ? "Shared" : "Share"}
                        </Link>}

                    <PreviewButton
                        instrument={sample.type}
                        recording_data={JSON.parse(sample.recording_data)}
                    />

                    {editOption && <Link to={`/edit-sample?id=${sample.id}`} className="bright-button">Edit</Link>}

                    {onDelete && <button className="bright-button"
                        onClick={() => { onDelete(sample.id); }}>
                        Delete
                    </button>
                    }
                </div>
            </div>
        </section>
    );
}
