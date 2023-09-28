
/**
 * Creates a toggle switch component to allow the user to share a sample
 * to a specific location.
 * @param {JSON} props Data about location and shared state as well as
 * a callback function to send data to parent.
 * @returns Share location toggle React DOM.
 */
export default function ShareLocationToggle({ id, toggledOn, onToggle, title }) {
    return (
        <div className="toggle-row-container share-location-toggle">
            <div className="location-name-label">
                <h4>{title}</h4>
            </div>
            <div className="sequence-row-container share-location-sequence">
                <button
                    onClick={() => onToggle(id, true)}
                    className={`toggle${toggledOn ? "-selected" : ""}`} 
                >
                    Shared
                </button>

                <button
                    onClick={() => onToggle(id, false)}
                    className={`toggle${!toggledOn ? "-selected" : ""}`}
                >
                    Not Shared
                </button>
            </div>
        </div>
    );
}