const APIKEY = process.env.REACT_APP_SONGTRAX_KEY;
const baseURL = 'https://comp2140.uqcloud.net/api/';

export async function getSamples(){
    const url = `${baseURL}sample/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function getSample(id){
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function postSample(sample){
    const url = `${baseURL}sample/?api_key=${APIKEY}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sample)
    });
    const json = await response.json(); 
    return json;
}

export async function putSample(sample, id){
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sample)
    });
    const json = await response.json();
    return json;
}

export async function deleteSample(id){
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: {}
    });
}

export async function getLocations(){
    const url = `${baseURL}location/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export async function getSamplesToLocations(sampleID = -1){
    // Get
    const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();

    if(sampleID === -1) return json;

    json.filter(element => element.sample_id == sampleID);
}
 
async function getSampleToLocationIDFromIDs(sampleID, locationID){
    // Get from API
    const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json(); 

    // Filter to get only the record of matching IDs
    const filteredResponse = json.filter(element => (element.sample_id === sampleID && element.location_id === locationID))
    .map(element => element.id); 
    return filteredResponse[0] ?? -1;
}

export async function removeSampleFromLocation(sampleID, locationID){
    const preexistingRelationshipID = await getSampleToLocationIDFromIDs(sampleID, locationID);
    if(preexistingRelationshipID == -1) return null;

    const url = `${baseURL}sampletolocation/${preexistingRelationshipID}/?api_key=${APIKEY}`;;
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } 
    });
} 

export async function addSampleToLocation(sampleID, locationID){
    const preexistingRelationshipID = await getSampleToLocationIDFromIDs(sampleID, locationID);
    if(preexistingRelationshipID != -1) return null;

    const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sample_id: sampleID, location_id: locationID})
    });
    const json = await response.json();
    return json;
}