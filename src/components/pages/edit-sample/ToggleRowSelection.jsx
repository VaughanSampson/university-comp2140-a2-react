 
const ToggleRowSelection = (props) => {
    return (
        <div className="toggle-row-container">
            <div className="row-label">
                <h4>{props.title}</h4>
            </div>

            <div className="sequence-row-container">
                {   
                    props.radio? (
                        props.titles.map((text, index) => 
                            <button 
                            key={index}
                            className={"toggle" + ((text === props.selected)? "-selected" : "")}
                            onClick={() => {props.callback(text)}}>
                                {text}
                            </button>) 
                    ) : (
                        props.truthMap.map((truth, index) => 
                            <button 
                            key={index}
                            className={"toggle" + (truth? "-selected" : "")}
                            onClick={() => {props.callback(props.title, index)}}
                            />
                        ) 
                    )
    
                }
            </div>
        </div>
    );

}

export default ToggleRowSelection;

