import { useState } from "react";
import {
    playSequence, 
    stopSequence,
    setInstrumentWithName
} from "../../helper/music.js";

/**
 * Creates a preview button for playing a sample.
 * @param {JSON} props Data of recording to play. 
 * @returns React DOM preview button.
 */
export default function PreviewButton({ recording_data, instrument }) {
    const [playing, setPlaying] = useState(false);

    /**
     * Toggle whether the preview is active or not.
     */
    function togglePlaying() {
        if (playing) {
            stopSequence();
        }
        else {
            setInstrumentWithName(instrument);
            playSequence(recording_data, () => setPlaying(false));
        }
        setPlaying(!playing);
    }

    // Return React DOM componeent.
    return (
        <button
            type="button"
            className="bright-button"
            onClick={() => { togglePlaying() }}
        >
            {playing ? "Stop Preview" : "Preview"}
        </button>
    )
} 