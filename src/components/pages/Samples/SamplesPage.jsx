import CreateCard from "./CreateCard";
import SampleCard from "./SampleCard";

const Samples = ({sampleList}) =>{
    return (
        <main>
            <h2 className="title">My Songs</h2> 
            <CreateCard /> 
            {
                sampleList.map((sample, index) => 
                    <SampleCard 
                    sample={sample} 
                    index={index}
                    editOption={true}
                    shareOption={true}
                    /> 
                )
            }
            {sampleList.length > 0 && <CreateCard />}
            
        </main>
    );
}

export default Samples;