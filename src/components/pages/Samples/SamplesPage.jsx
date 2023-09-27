import {useState, useEffect} from 'react';
import CreateCard from "./CreateCard";
import SampleCard from "./SampleCard";
import { getAllSampleToLocations } from "../../../api/songtrax.js" 

const Samples = ({callback_delete, sampleList}) =>{
    const [sharedItems, setShareditems] = useState([]);

    useEffect(() => {
        loadSharedItemsIds();
    }, [])

    async function loadSharedItemsIds(){
        const allSampleToLocations = await getAllSampleToLocations();
        const sharedItems = allSampleToLocations.map(element => element.sample_id);
        setShareditems(sharedItems);
    }

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
                    /> 
                )
            }
            {sampleList.length > 0 && <CreateCard />}
            
        </main>
    );
}

export default Samples;