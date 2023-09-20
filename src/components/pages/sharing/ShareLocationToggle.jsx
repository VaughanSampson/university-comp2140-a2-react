import { useState, useEffect } from 'react';

export default function ShareLocationToggle({index, callbackOnToggle, title})
{   
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        callbackOnToggle(index, toggle);
    }, [toggle, callbackOnToggle, index]);

    return(
        <div className="toggle-row-container">
            <div className="location-name-label">
                <h4>{title}</h4>
            </div>
            <div className="sequence-row-container">

                <button 
                onClick={() => setToggle(true)} 
                className={`toggle${toggle? "-selected" : ""}`} >
                    Shared
                </button>

                <button 
                onClick={() => setToggle(false)} 
                className={`toggle${!toggle? "-selected" : ""}`}>
                    Not Shared
                </button>

            </div>
        </div>
    );
}