import { useEffect, useState} from "react";
import SampleCard from "../samples/SampleCard";
import ShareLocationTogglefrom from "./ShareLocationToggle";
import { getSample } from "../../../api/songtrax.js";
import { getLocations, addSampleToLocation } from "../../../api/songtrax.js"


const ShareSample = () =>{
    const [sample, setSample] = useState(null);
    const [locations, setLocation] = useState(null);

    // Load pre-existing sample in if url has query parameter
    useEffect(() => { 
        const query = window.location.search;
        if(query !== null && query !== undefined && query.length > 0)
        {
            const urlParams = new URLSearchParams(query);
            const id = urlParams.get('id'); 
            if(id !== undefined) loadFromSampleID(id);
        } 
        loadLocations();
      }, []);

    async function loadFromSampleID(id){ 
        const sampleData = await getSample(id);
        if(sampleData !== undefined)
        {
            setSample(sampleData);
        }
    }  
    async function loadLocations(){
        const loc = await getLocations();
        setLocation(loc);
    }

    async function toggleLocation(locationID, toggle){
        if(toggle)
            alert(JSON.stringify( await addSampleToLocation(sample.id, locationID)));
    }

    return (
        <main>
            <h2 className="title">Share This Sample</h2>
            {sample != null
                && <SampleCard sample={sample}/>
            }
            
            {
            locations != null && 
            locations.map((location) => 
            <ShareLocationTogglefrom 
            id={location.id}
            callbackOnToggle={toggleLocation}
            title={location.name} 
            /> 
            )
                /*
                Object.keys(locationsList).map((location, index) => 
                    <ShareLocationTogglefrom 
                    index={index}
                    callbackOnToggle={toggleLocation}
                    title={location} 
                    /> 
                )
                */
            }

        </main>
    )
}

export default ShareSample;