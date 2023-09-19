 
const ToggleRowSelection = (props) => {
 

    return (
        <div className="toggle-row-container">
            <div className="row-label">
                <h4>{props.title}</h4>
            </div>

            <div className="sequence-row-container">
                {   
                    (props.radio)? (
                        props.titles.map((text, index) => {
                            return(
                                <button 
                                key={index}
                                className={"toggle" + ((index === props.index)? "-selected" : "")}
                                onClick={() => {props.callback(index)}}>
                                {text}
                                </button>
                            );
                        })
                    ) : (
                        props.truthMap.map((truth, index) => {
                            return(
                                <button 
                                key={index}
                                className={"toggle" + (truth? "-selected" : "")}
                                onClick={() => {props.callback(props.title, index)}}
                                > 
                                </button>
                            );
                        }) 
                    )
    
                }
            </div>
        </div>
    );

}

export default ToggleRowSelection;

