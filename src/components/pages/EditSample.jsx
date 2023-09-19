
const EditSample = () =>{
    return (
            <main>
                <h2 className="title">Edit Sample:</h2>
                <form className="card edit-card">
                    <input type="text"></input>
                    <div className="button-group-container">
                            <button type="button" className="bright-button">Save</button>
                    </div>
                </form>

                <div className="toggle-row-container">
                    <div className="row-label">
                        <h4>Instrument</h4>
                    </div>
                    <div className="sequence-row-container">
                        <button className="toggle-selected">Guitar</button>
                        <button className="toggle">Piano</button>
                        <button className="toggle">Violin</button>
                        <button className="toggle">Drums</button>
                    </div>
                </div>

            <div className="toggle-row-container">
                <div className="row-label">
                    <h4>B</h4>
                </div>
                <div className="sequence-row-container">
                        <button className="toggle-selected"></button>
                        <button className="toggle"></button>
                        <button className="toggle"></button>
                        <button className="toggle"></button>
                        <button className="toggle-selected"></button>
                        <button className="toggle"></button>
                        <button className="toggle"></button>
                        <button className="toggle"></button>
                        <button className="toggle-selected"></button>
                        <button className="toggle"></button>
                        <button className="toggle"></button>
                        <button className="toggle"></button>
                        <button className="toggle-selected"></button>
                        <button className="toggle"></button>
                        <button className="toggle"></button>
                        <button className="toggle"></button>
                </div>
            </div>

            <div className="toggle-row-container">
                <div className="row-label">
                    <h4>A</h4>
                </div>
                <div className="sequence-row-container">
                    <button className="toggle-selected"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle-selected"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle-selected"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle-selected"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                    <button className="toggle"></button>
                </div>
            </div>
        </main>
    )
}

export default EditSample;