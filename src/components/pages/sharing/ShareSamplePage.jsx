import { useEffect, useState} from "react";
import SampleCard from "../samples/SampleCard";
import ShareLocationTogglefrom from "./ShareLocationToggle";
import { getSample } from "../../../api/songtrax.js";
import { getLocations, addSampleToLocation, 
    removeSampleFromLocation, getSamplesToLocations } from "../../../api/songtrax.js"


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
      }, []);

      useEffect(() => { 
        if(sample != null) loadLocations(); 
      }, [sample]);

    async function loadFromSampleID(id){ 
        const sampleData = await getSample(id);
        if(sampleData !== undefined)
        {
            setSample(sampleData);
        }
        
    }  
    async function loadLocations(){
        const loc = await getLocations();
        const locationIDList = loc.map(location => location.id);
        const samplesToLocations = await getSamplesToLocations(sample.id, locationIDList);
        // Filter
        const sampleLocations = samplesToLocations
        .filter(element => element.sample_id === sample.id)
        .map(element => element.location_id);

        const toggledLocations = loc.map(element => {
            return{
                ...element,
                "toggled" : sampleLocations.includes(element.id)
            }
        });
        alert(toggledLocations);
        setLocation(toggledLocations);

    }

    async function toggleLocation(locationID, toggle){
        if(toggle)
        {
            await addSampleToLocation(sample.id, locationID);
        }
        else
        {
            removeSampleFromLocation(sample.id);
        }
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
            toggled={location.toggled}
            /> 
            )
            }

        </main>
    )
}

export default ShareSample;