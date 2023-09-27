import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useState, useEffect} from "react";
import {postSample, putSample, deleteSample, getSamples} from "./api/songtrax.js";
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header";
import Samples from "./components/pages/samples/SamplesPage.jsx";
import EditSongSample from "./components/pages/edit-sample/EditSamplePage.jsx";
import ShareSample from "./components/pages/sharing/ShareSamplePage.jsx";
import './App.css';

function App() {  
  const [samplesList, setSamplesList] = useState([]); 
  useEffect(() => {loadSamples()}, [])

  async function loadSamples(){
    const samples = await getSamples();
    setSamplesList(samples);
  }
  
  async function createSample(newSampleData){  
      const createdSample = await postSample(newSampleData);   
      loadSamples();
      return createdSample.id;
  }

  async function overwriteSample(alteredSampleData){  
    await putSample(alteredSampleData, alteredSampleData.id); 
    loadSamples();
  }

  async function removeSample(id){
    await deleteSample(id);
    loadSamples();
  }

  return (
    <>  
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Samples 
            callback_delete={removeSample}
            sampleList={samplesList}/>} />
            <Route path="/edit-sample" 
            element={<EditSongSample samples={samplesList} 
            callback_create={createSample} 
            callback_overwrite={overwriteSample}/>} />
            <Route path="/share-sample" element={<ShareSample/>} />
          </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
