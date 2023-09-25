import CreateCard from "./CreateCard";
import SampleCard from "./SampleCard";

const Samples = ({callback_delete, sampleList}) =>{
    return (
        <main>
            <h2 className="title">My Songs</h2> 
            <CreateCard /> 
            {
                sampleList.map((sample) => 
                    <SampleCard 
                    sample={sample}  
                    editOption={true}
                    shareOption={true}
                    deleteOption={true}
                    callback_delete={callback_delete}
                    /> 
                )
            }
            {sampleList.length > 0 && <CreateCard />}
            
        </main>
    );
}

export default Samples;