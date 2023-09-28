import { useState, useEffect } from 'react';
import { getAllSampleToLocations } from "../../../api/songtrax-handler.js"
import CreateCard from "./CreateCard";
import SampleCard from "./SampleCard";

/**
 * Creates samples dashboard page which lists all samples 
 * and links to other pages.
 * @param {JSON} props List of samples data and a callback to
 * inform App.js when a sample is deleted. 
 * @returns Samples page React DOM.
 */
export default function Samples({ sampleList, callback_delete }) {

    // State to store which items are shared.
    const [sharedItems, setShareditems] = useState([]);

    /**
     * useEffect which is called when the page is first loaded
     * or reloaded to load which samples are shared.
     */
    useEffect(() => {
        loadSharedItemsIds();
    }, [])

    /**
     * Loads  the ids of all shared samples, storing that data
     * to the sharedItems state variable.
     */
    async function loadSharedItemsIds() {
        const allSampleToLocations = await getAllSampleToLocations();
        const sharedItems = allSampleToLocations.map(element => element.sample_id);
        setShareditems(sharedItems);
    }

    // Returns React DOM
    return (
        <main>
            <h2 className="title">My Songs</h2>
            <CreateCard />
            {
                sampleList.map((sample, index) =>
                    <SampleCard
                        sample={sample}
                        editOption={true}
                        shareOption={true}
                        deleteOption={true}
                        callback_delete={callback_delete}
                        shared={sharedItems.includes(sample.id)}
                        key={sample.id}
                    />)
            }
            {sampleList.length > 0 && <CreateCard />}
        </main>
    );
}
