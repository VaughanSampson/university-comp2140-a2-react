import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useState, useEffect} from "react";
import {uploadSample, getSamples} from "./api/songtrax.js";
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header";
import Samples from "./components/pages/samples/SamplesPage.jsx";
import EditSongSample from "./components/pages/edit-sample/EditSamplePage.jsx";
import ShareSample from "./components/pages/sharing/ShareSamplePage.jsx";
import './App.css';

function App() { 
  const [samplesList, setSamplesList] = useState([]);

  // Load saved samples
  useEffect(() => {loadSamples()}, [])

  async function loadSamples(){
    const samples = await getSamples();
    setSamplesList(samples);
  }
  
  async function createSample(newSample){
    const createdSample = await uploadSample(newSample); 
    const index = samplesList.findIndex(sample => sample.id === createdSample.id);
    const alteredSamplesList = samplesList;
    if (index >= 0)
    {
      alteredSamplesList[index] = createdSample;
    }
    else
    {
      alteredSamplesList.push(createdSample); 
    }
    setSamplesList([...alteredSamplesList]); 
  }

  return (
    <>  
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Samples sampleList={samplesList}/>} />
            <Route path="/edit-sample" 
            element={<EditSongSample samples={samplesList} callback_save={createSample}/>} />
            <Route path="/share-sample" element={<ShareSample/>} />
          </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
