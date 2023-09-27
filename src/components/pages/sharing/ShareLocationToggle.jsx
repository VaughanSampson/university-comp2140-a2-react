
export default function ShareLocationToggle({id, sampleToLocation, 
    callbackOnToggleOff, callbackOnToggleOn, title})
{   
    return(
        <div className="toggle-row-container">
            <div className="location-name-label">
                <h4>{title}</h4>
            </div>
            <div className="sequence-row-container">

                <button 
                onClick={() => callbackOnToggleOn(id)} 
                className={`toggle${sampleToLocation? "-selected" : ""}`} >
                    Shared
                </button>

                <button 
                onClick={() => callbackOnToggleOff(sampleToLocation)} 
                className={`toggle${!sampleToLocation? "-selected" : ""}`}>
                    Not Shared
                </button>

            </div>
        </div>
    );
}