import { useEffect, useState} from "react";
import SampleCard from "../samples/SampleCard";
import ShareLocationTogglefrom from "./ShareLocationToggle";
import { getSample } from "../../../api/songtrax.js";
import { getLocations, getOneSampleToLocationBySampleID, deleteSampleToLocationBySampleID, 
    updateSampleToLocationBySampleID } from "../../../api/songtrax.js" 


const ShareSample = () =>{
    const [sample, setSample] = useState(null);
    const [locations, setLocations] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(-1);

    // Load sample
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
        if(sampleData !== undefined) setSample(sampleData); 
    }  
    
    // Load locations
    useEffect(() => { 
        if(sample != null) loadLocations(); 
      }, [sample]); 

    async function loadLocations(){
        const locations = await getLocations();  
        setLocations(locations); 

        const sampleToLocation = await getOneSampleToLocationBySampleID(sample.id);
        if(sampleToLocation != null) setSelectedLocation(sampleToLocation.location_id); 
    }

    // Toggle locations
    async function toggleLocation(locationID, toggle){ 
        if(!toggle && selectedLocation == locationID)
            setSelectedLocation(-1); 
        else
            setSelectedLocation(locationID); 
    }

    useEffect(() => { 
        if(!sample) return;  
        if(selectedLocation === -1) 
            deleteSampleToLocationBySampleID(sample.id)
        else
            updateSampleToLocationBySampleID(sample.id, selectedLocation);  
      }, [selectedLocation]); 
  
    // DOM
    return (
        <main>
            <h2 className="title">Share This Sample</h2>
            { sample != null && <SampleCard sample={sample}/> } 
            {
                locations != null && locations.map((location, index) => 
                    <ShareLocationTogglefrom 
                    toggledOn={location.id == selectedLocation}
                    id={location.id} 
                    callbackOnToggle={toggleLocation} 
                    title={location.name}
                    key={index}
                />)
            }

        </main>
    )
}

export default ShareSample;