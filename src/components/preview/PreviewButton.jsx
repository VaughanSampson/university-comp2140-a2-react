import { useState } from "react";
import { playSequence, stopSequence } from "../../helper/music.js";

const PreviewButton = ({noteSequence}) => {
    const [playing, setPlaying] = useState(false);

    const setPlayingFalse = () => setPlaying(false);

    function togglePlaying(){
        if(playing)
            stopSequence();
        else
            playSequence(noteSequence, setPlayingFalse);
        setPlaying(!playing);
    }

    return( 
        <button 
        type="button" 
        className="bright-button"
        onClick={() => { togglePlaying() }}
        >
            {playing? "Stop Preview" : "Preview"}
        </button>
    )

}

export default PreviewButton;