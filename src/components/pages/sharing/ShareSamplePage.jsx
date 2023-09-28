import { useEffect, useState } from "react";
import {
    getLocations, getOneSampleToLocationBySampleID, deleteSampleToLocationBySampleID,
    updateSampleToLocationBySampleID, getSample
} from "../../../api/songtrax-handler.js"
import SampleCard from "../samples/SampleCard";
import ShareLocationToggle from "./ShareLocationToggle";

/**
 * Creates a share sample page component.
 * @returns A share sample page React DOM.
 */
export default function ShareSample() {
    const [sample, setSample] = useState(null);
    const [locations, setLocations] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(-1);

    /**
     * useEffect which is called only on page load or reload. This
     * reads the id value of the query string, utilising it to load sample
     * data.
     */
    useEffect(() => {
        const query = window.location.search;
        if (query !== null && query !== undefined && query.length > 0) {
            const urlParams = new URLSearchParams(query);
            const id = urlParams.get('id');
            if (id !== undefined) { loadFromSampleID(id); }
        }
    }, []);

    /**
     * Loads the data of a sample.
     * @param {int} id The ID of the sample to load. 
     */
    async function loadFromSampleID(id) {
        const sampleData = await getSample(id);
        if (sampleData !== undefined) { setSample(sampleData); }
    }

    /**
     * useEffect which is called when the sample is loaded
     * to then load locations and sample-location relationships.
     */
    useEffect(() => {
        if (sample != null) loadLocations();
    }, [sample]);

    /**
     * Loads all locations and the location id which the 
     * current sample is related to (if there is such a
     * relationship).
     */
    async function loadLocations() {
        const locations = await getLocations();
        setLocations(locations);

        const sampleToLocation = await getOneSampleToLocationBySampleID(sample.id);
        if (sampleToLocation != null) {
            setSelectedLocation(sampleToLocation.location_id);
        }
    }

    /**
     * Shares or unshares the selected sample to the given location.
     * @param {int} locationID Location to share sample to.
     * @param {boolean} toggle Whether to share (true) or unshare (false).
     */
    async function toggleLocation(locationID, toggle) {
        if (!toggle && selectedLocation == locationID) {
            setSelectedLocation(-1);
        }
        else {
            setSelectedLocation(locationID);
        }
    }

    /**
     * useEffect to update API when sample-location sharing relationship
     * state is changed.
     */
    useEffect(() => {
        if (!sample) { return; }

        if (selectedLocation === -1)
            deleteSampleToLocationBySampleID(sample.id)
        else
            updateSampleToLocationBySampleID(sample.id, selectedLocation);
    }, [selectedLocation]);

    // Returns React DOM
    return (
        <main>
            <h2 className="title">Share This Sample</h2>

            {sample != null && <SampleCard sample={sample} />}

            {
                locations != null && locations.map((location, index) =>
                    <ShareLocationToggle
                        toggledOn={location.id == selectedLocation}
                        id={location.id}
                        onToggle={toggleLocation}
                        title={location.name}
                        key={index}
                    />
                )
            }
        </main>
    )
} 