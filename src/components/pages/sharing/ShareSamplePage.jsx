import { useEffect, useState} from "react";
import SampleCard from "../samples/SampleCard";
import ShareLocationTogglefrom from "./ShareLocationToggle";

const locations = {"loc1": true, "loc2": false}

const ShareSample = ({samples}) =>{
    const [sample, setSample] = useState(null);

    // Load pre-existing sample in if url has query parameter
    useEffect(() => { 
        const query = window.location.search;
        if(query !== null && query !== undefined && query.length > 0)
        {
            const urlParams = new URLSearchParams(query);
            const index = urlParams.get('sample');
            if(index >= samples.length) return;
            setSample(samples[index]);
        }
      }, []);

    function toggleLocation(index, toggle){
        locations[Object.keys(locations)[index]] = toggle;
    }

    return (
        <main>
            <h2 className="title">Share This Sample</h2>
            {sample != null
                && <SampleCard sample={sample} editOption={false} shareOptions={false}/>
            }
            
            {
                Object.keys(locations).map((location, index) => 
                    <ShareLocationTogglefrom 
                    index={index}
                    callbackOnToggle={toggleLocation}
                    title={location} 
                    /> 
                )
            }

        </main>
    )
}

export default ShareSample;