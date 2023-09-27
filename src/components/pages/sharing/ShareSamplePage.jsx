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
        if(sampleData !== undefined) setSample(sampleData); 
    }  

    async function loadLocations(){
        const locations = await getLocations();  
        const samplesToLocations = await getSamplesToLocations();  
        const locationsOfSample = samplesToLocations.filter(element => element.sample_id === sample.id)
        .map(element => element.location_id); 
        const toggledLocations = locations.map((element) =>
        ({...element, "toggledOn" : locationsOfSample.includes(element.id) }));  
        setLocation(await toggledLocations);
    }

    async function toggleLocation(locationID, toggle){ 
        if(toggle) await addSampleToLocation(sample.id, locationID); 
        else removeSampleFromLocation(sample.id, locationID);  
    }
 

    return (
        <main>
            <h2 className="title">Share This Sample</h2>
            { sample != null && <SampleCard sample={sample}/> } 
            {
                locations != null && locations.map((location, index) => 
                    <ShareLocationTogglefrom 
                    toggledOn={location.toggledOn}
                    id={location.id}
                    sampleToLocation={location.sampleToLocation}
                    callbackOnToggle={toggleLocation} 
                    title={location.name}
                    key={index}
                />)
            }

        </main>
    )
}

export default ShareSample;