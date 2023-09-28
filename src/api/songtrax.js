const APIKEY = process.env.REACT_APP_SONGTRAX_KEY;
const baseURL = 'https://comp2140.uqcloud.net/api/';

/**
 * Gets all samples from the Songtrax API.
 * @returns Array of fetched JSON samples.
 */
export async function getSamples(){
    const url = `${baseURL}sample/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

/**
 * Gets one sample from the Songtrax API matching the given sample ID.
 * @param {int} id The sample ID.
 * @returns The JSON of the selected sample.
 */
export async function getSample(id){
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

/**
 * Posts one sample to the Songtrax API.
 * @param {JSON} sample The JSON sample to post.
 * @returns The generated sample with an additional ID and date.
 */
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

/**
 * Updates a sample in the Songtrax database.
 * @param {JSON} sample The updated sample data.
 * @param {int} id The id of the sample at the Songtrax API.
 * @returns The updated sample data.
 */
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

/**
 * Removes a sample from the Songtrax database. Also removes it's
 * sample-location relationship/s.
 * @param {int} id ID of sample to remove.
 */
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

    // Remove SampleToLocation relationships of the sample.
    deleteSampleToLocationBySampleID(id);
}

/**
 * Gets all locations from the Songtrax API.
 * @returns All locations from the Songtrax API.
 */
export async function getLocations(){
    const url = `${baseURL}location/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
} 
 
/**
 * Gets all sample-location relationships from the Songtrax API.
 * @returns All the sample-location relationships.
 */
export async function getAllSampleToLocations( ){ 
    const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
    const response = await fetch(url);
    return await response.json(); 
}

/**
 * Gets the sample-location relationship of a single sample by filtering 
 * all samples on their sample id.
 * @param {int} sampleID ID of the sample in the Songtrax database.
 * @returns Null if there is no relationship, otherwise the JSON
 * storing the relationship.
 */
export async function getOneSampleToLocationBySampleID(sampleID){  
    const allSampleToLocations = await getAllSampleToLocations();    
    const sampleToLocation = allSampleToLocations.filter(element => element.sample_id == sampleID); 
    return sampleToLocation? sampleToLocation[0] : null; 
}
 
/**
 * Deletes one sample-location relationship on the given ID by selecting
 * that relationship's id then calling a delete operation.
 * @param {int} sampleID ID of the sample which needs its relationship deleted.
 * @returns void if there is no sample at the given ID.
 */
export async function deleteSampleToLocationBySampleID(sampleID){ 
    const sample = await getOneSampleToLocationBySampleID(sampleID);
    if(sample === null) return;
    const id = sample.id;
    const url = `${baseURL}sampletolocation/${id}/?api_key=${APIKEY}`;;
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } 
    }); 
} 

/**
 * Update the relationship of a sample id with different location.
 * @param {int} sampleID ID of sample which has the relationship.
 * @param {int} locationID ID of the location to write to the relationship.
 * @returns The updated relationship.
 */
export async function updateSampleToLocationBySampleID(sampleID, locationID){ 
    const sample = await getOneSampleToLocationBySampleID(sampleID);  

    const url = `${baseURL}sampletolocation${sample? `/${sample.id}` : ""}/?api_key=${APIKEY}`;
    const response = await fetch(url, {
        method: sample? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sample_id: sampleID, location_id: locationID})
    });
    const json = await response.json();
    return json;
}
 


 