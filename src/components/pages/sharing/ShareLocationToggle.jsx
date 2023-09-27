 
export default function ShareLocationToggle({id, toggledOn, callbackOnToggle, title})
{     
    return(
        <div className="toggle-row-container">
            <div className="location-name-label">
                <h4>{title}</h4>
            </div>
            <div className="sequence-row-container"> 
                <button 
                onClick={() => callbackOnToggle(id, true)} 
                className={`toggle${toggledOn? "-selected" : ""}`} >
                    Shared
                </button>

                <button 
                onClick={() => callbackOnToggle(id, false)} 
                className={`toggle${!toggledOn? "-selected" : ""}`}>
                    Not Shared
                </button> 
            </div>
        </div>
    );
}