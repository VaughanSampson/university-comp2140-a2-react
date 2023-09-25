import { useState } from "react";
import { playSequence, stopSequence, setInstrumentWithName} from "../../helper/music.js";

const PreviewButton = ({recording_data, instrument}) => {
    const [playing, setPlaying] = useState(false);

    const setPlayingFalse = () => setPlaying(false);

    function togglePlaying(){
        if(playing)
            stopSequence();
        else
        { 
            setInstrumentWithName(instrument); 
            playSequence(recording_data, setPlayingFalse);
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