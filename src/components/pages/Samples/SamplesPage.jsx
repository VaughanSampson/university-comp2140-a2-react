import { useState, useEffect } from 'react';
import {
    getAllSampleToLocations, getSamples,
    deleteSample
} from "../../../api/songtrax-handler.js"
import CreateCard from "./CreateCard";
import SampleCard from "./SampleCard";

/**
 * Creates samples dashboard page which lists all samples 
 * and links to other pages.
 * @returns Samples page React DOM.
 */
export default function Samples() {


    // State to store which items are shared.
    const [samplesList, setSamplesList] = useState([]);
    const [sharedItems, setShareditems] = useState([]);

    /**
     * useEffect which is called when the page is first loaded
     * or reloaded to load which sample and which samples are shared.
     */
    useEffect(() => {
        loadSamples();
        loadSharedItemsIds();
    }, [])

    /**
     * Loads all samples to state.
     */
    async function loadSamples() {
        const samples = await getSamples();
        setSamplesList(samples);
    }

    /**
     * Loads  the ids of all shared samples, storing that data
     * to the sharedItems state variable.
     */
    async function loadSharedItemsIds() {
        const allSampleToLocations = await getAllSampleToLocations();
        const sharedItems = allSampleToLocations.map(element => element.sample_id);
        setShareditems(sharedItems);
    }

    /**
     * Deletes the sample with the given ID.
     * @param {int} id ID of sample to delete.
     */
    async function deleteSampleAtID(id) {
        await deleteSample(id);
        loadSamples();
    }

    // Returns React DOM
    return (
        <main>
            <h2 className="title">My Songs</h2>
            <CreateCard />
            {
                samplesList.map(sample =>
                    <SampleCard
                        sample={sample}
                        editOption={true}
                        shareOption={true}
                        onDelete={deleteSampleAtID}
                        shared={sharedItems.includes(sample.id)}
                        key={sample.id}
                    />)
            }
            {samplesList.length > 0 && <CreateCard />}
        </main>
    );
}
