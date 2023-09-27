import { useState, useEffect } from 'react';

export default function ShareLocationToggle({id, toggledOn, 
    callbackOnToggle, title})
{   
    const [toggled, setToggled] = useState(toggledOn);

    useEffect(() => {
        callbackOnToggle(id, toggled);
    }, [toggled])

    function toggle(value){ 
        setToggled(value);
    }

    return(
        <div className="toggle-row-container">
            <div className="location-name-label">
                <h4>{title}</h4>
            </div>
            <div className="sequence-row-container"> 
                <button 
                onClick={() => toggle(true)} 
                className={`toggle${toggled? "-selected" : ""}`} >
                    Shared
                </button>

                <button 
                onClick={() => toggle(false)} 
                className={`toggle${!toggled? "-selected" : ""}`}>
                    Not Shared
                </button> 
            </div>
        </div>
    );
}