import CreateCard from "./CreateCard";

const Samples = () =>{
    return (
        <main>
            <h2 className="title">My Songs</h2>

            <CreateCard />

            <section className="sample">
                <div className="card">
                    <div className="song-details">
                        <h3>Song Name</h3>
                        <p>Date Created</p>
                    </div>
                    <div className="button-group-container">
                        <a href="/share-sample/#" className="bright-button">Share</a>
                        <a href="/share-sample/#" className="bright-button">Preview</a>
                        <a href="/edit-sample/#" className="bright-button">Edit</a>
                    </div>
                </div>
            </section>

            <CreateCard />

        </main>
    );
}

export default Samples;