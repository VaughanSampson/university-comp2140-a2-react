const APIKEY = process.env.REACT_APP_SONGTRAX_KEY;
const baseURL = 'https://comp2140.uqcloud.net/api/';
const apiKeySuffix = `?api_key=${APIKEY}`;
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

/**
 * Gets all samples with the APIKEY from the Songtrax API.
 * @returns Array of fetched JSON samples.
 */
export async function getSamples() {
    const url = `${baseURL}sample/${apiKeySuffix}`;
    const response = await fetch(url);
    return await response.json(); 
}

/**
 * Gets one sample from the Songtrax API matching the given sample ID.
 * @param {int} id The sample ID.
 * @returns The JSON of the selected sample.
 */
export async function getSample(id) {
    const url = `${baseURL}sample/${id}/${apiKeySuffix}`;
    const response = await fetch(url);
    return await response.json(); 
}

/**
 * Posts one sample to the Songtrax API.
 * @param {JSON} sample The JSON sample to post.
 * @returns The generated JSON sample with an ID and date.
 */
export async function postSample(sample) {
    const url = `${baseURL}sample/${apiKeySuffix}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(sample)
    });
    return await response.json(); 
}

/**
 * Updates a sample through the Songtrax API.
 * @param {JSON} sample The updated sample data.
 * @param {int} id The id of the sample to update.
 * @returns The updated JSON of the sample.
 */
export async function putSample(sample, id) {
    const url = `${baseURL}sample/${id}/${apiKeySuffix}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(sample)
    });
    return await response.json(); 
}

/**
 * Removes a sample from the Songtrax database. Also removes it's
 * sample-location relationship.
 * @param {int} id ID of sample to remove.
 */
export async function deleteSample(id) {
    const url = `${baseURL}sample/${id}/${apiKeySuffix}`;
    await fetch(url, {
        method: 'DELETE',
        headers: headers,
        body: {}
    });

    // Also remove SampleToLocation relationships of the sample.
    deleteSampleToLocationBySampleID(id);
}

/**
 * Gets all locations from the Songtrax API.
 * @returns Array of location JSON data.
 */
export async function getLocations() {
    const url = `${baseURL}location/${apiKeySuffix}`;
    const response = await fetch(url);
    return await response.json();
}

/**
 * Gets all sample-location relationships from the Songtrax API.
 * @returns Array of sample-location relationship JSON.
 */
export async function getAllSampleToLocations() {
    const url = `${baseURL}sampletolocation/${apiKeySuffix}`;
    const response = await fetch(url);
    return await response.json();
}

/**
 * Gets the sample-location relationship of a sample by filtering 
 * all samples over their sample id.
 * @param {int} sampleID ID of the sample.
 * @returns Null if there is no relationship, otherwise the JSON
 * of the relationship.
 */
export async function getOneSampleToLocationBySampleID(sampleID) {
    const allSampleToLocations = await getAllSampleToLocations();
    const sampleToLocation = allSampleToLocations.filter(element => element.sample_id == sampleID);
    return sampleToLocation ? sampleToLocation[0] : null;
}

/**
 * Deletes one sample-location relationship on the given sample ID by selecting
 * that relationship's id then calling a delete operation.
 * @param {int} sampleID ID of the sample which needs its relationship deleted. 
 */
export async function deleteSampleToLocationBySampleID(sampleID) {
    const sample = await getOneSampleToLocationBySampleID(sampleID); 
    if (sample !== undefined) {
        const id = sample.id;
        const url = `${baseURL}sampletolocation/${id}/${apiKeySuffix}`;;
        await fetch(url, {
            method: 'DELETE',
            headers: headers
        });
    }
}

/**
 * Update the relationship of a sample with a different location.
 * @param {int} sampleID ID of sample which has the relationship.
 * @param {int} locationID ID of the location to write to the relationship.
 * @returns The JSON of the updated relationship.
 */
export async function updateSampleToLocationBySampleID(sampleID, locationID) {
    const sample = await getOneSampleToLocationBySampleID(sampleID);

    const url = `${baseURL}sampletolocation${sample ? `/${sample.id}` : ""}/${apiKeySuffix}`;
    const response = await fetch(url, {
        method: sample ? 'PUT' : 'POST',
        headers: headers,
        body: JSON.stringify({ sample_id: sampleID, location_id: locationID })
    });
    return await response.json(); 
}
