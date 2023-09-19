const CreateCard = (props) => {
    return( 
        <section className="sample">
                <div className="card">
                    <div className="song-details">
                        <h3>{props.title}</h3>
                        <p>{props.date}</p>
                    </div>
                    <div className="button-group-container">
                        <a href="/share-sample/#" className="bright-button">Share</a>
                        <a href="/share-sample/#" className="bright-button">Preview</a>
                        <a href="/edit-sample/#" className="bright-button">Edit</a>
                    </div>
                </div>
            </section>
    );
}

export default CreateCard;