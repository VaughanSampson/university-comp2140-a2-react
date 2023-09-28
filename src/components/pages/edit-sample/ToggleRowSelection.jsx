
/**
 * Creates a toggle row selection compoenent
 * @param {JSON} props display data and callback function to
 * inform parent of input. 
 * @returns React DOM of toggle row selection.
 */
export default function ToggleRowSelection({ title, onSelect, map }) {
    return (
        <div className="toggle-row-container">
            <div className="row-label">
                <h4>{title}</h4>
            </div>

            <div className="sequence-row-container">
                {map.map((truth, index) =>
                    <button
                        key={index}
                        className={"toggle" + (truth ? "-selected" : "")}
                        onClick={() => { onSelect(title, index) }}
                    />
                )}
            </div>
        </div>
    );
}


