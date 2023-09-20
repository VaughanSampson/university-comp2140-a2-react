import { useState } from "react";
import { playSequence, stopSequence, setInstrumentWithName} from "../../helper/music.js";

const PreviewButton = ({noteSequence, instrument}) => {
    const [playing, setPlaying] = useState(false);

    const setPlayingFalse = () => setPlaying(false);

    function togglePlaying(){
        if(playing)
            stopSequence();
        else
        {
            setInstrumentWithName(instrument); 
            playSequence(noteSequence, setPlayingFalse);
        }
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