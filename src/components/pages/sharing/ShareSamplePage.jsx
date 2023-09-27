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
        const toggledLocations = loc.map(element => {
            const sampleToLocation = samplesToLocations
            .filter(element => element.location_id === element.id);

            return{
                ...element,
                "sampleToLocation" : sampleToLocation.length > 0? sampleToLocation[0] : null
            }
        });
        alert(JSON.stringify(toggledLocations));
        setLocation(toggledLocations);

    }

    async function toggleLocationOn(locationID){ 
        await addSampleToLocation(sample.id, locationID); 
    }

    async function toggleLocationOff(sampleToLocationID){  
        removeSampleFromLocation(sampleToLocationID); 
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
            sampleToLocation={location.sampleToLocation}
            callbackOnToggleOn={toggleLocationOn}
            callbackOnToggleOff={toggleLocationOff}
            title={location.name}
            /> 
            )
            }

        </main>
    )
}

export default ShareSample;