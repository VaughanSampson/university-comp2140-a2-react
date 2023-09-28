
/**
 * Creates a radio selection component.
 * @param {JSON} props display data and callback function to
 * inform parent of input. 
 * @returns React DOM of radio row selection.
 */
export default function RadioRowSelection({ title, titles, callback, selected }) {
    return (
        <div className="toggle-row-container">
            <div className="row-label">
                <h4>{title}</h4>
            </div> 
            <div className="sequence-row-container">
                {titles.map((text, index) =>
                    <button
                        key={index}
                        className={"toggle" + ((text === selected) ? "-selected" : "")}
                        onClick={() => { callback(text) }}
                    >
                        {text}
                    </button>
                )}
            </div>
        </div>
    ); 
}


