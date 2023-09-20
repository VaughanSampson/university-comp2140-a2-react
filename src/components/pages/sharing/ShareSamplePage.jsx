import { useEffect, useState} from "react";
import SampleCard from "../samples/SampleCard";
import ShareLocationTogglefrom from "./ShareLocationToggle";
import { getSample } from "../../../api/songtrax.js";

const locations = {"loc1": true, "loc2": false}

const ShareSample = () =>{
    const [sample, setSample] = useState(null);

    // Load pre-existing sample in if url has query parameter
    useEffect(() => { 
        const query = window.location.search;
        if(query !== null && query !== undefined && query.length > 0)
        {
            const urlParams = new URLSearchParams(query);
            const id = urlParams.get('id'); 
            if(id !== undefined) loadFromSampleID(id);
        }
      }, []);

    async function loadFromSampleID(id){ 
        const sampleData = await getSample(id);
        if(sampleData !== undefined)
        {
            setSample(sampleData);
        }
    } 

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