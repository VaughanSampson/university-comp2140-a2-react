import CreateCard from "./CreateCard";
import SampleCard from "./SampleCard";

const Samples = () =>{
    return (
        <main>
            <h2 className="title">My Songs</h2> 
            <CreateCard /> 
            <SampleCard title={"Song1"} date={"1/1/1"}/> 
            <CreateCard /> 
        </main>
    );
}

export default Samples;