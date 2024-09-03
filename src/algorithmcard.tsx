import { AlgorithmConst } from "./const";
import { useState } from "react";
import axios from "axios";

// Returns a popular algorithm as a datalist option (helpful for map())
const dlOption = (algorithm: string) => {
    return <option key={`${algorithm}-dloption`} value={algorithm} />;
}

const AlgorithmCard = (props: {algConstant : AlgorithmConst, mainAlg: string, altAlg: string, time: number, user: string, handleTimeStateChange: (index: number, time: number) => void}) => {

    // Initial algorithm info as props
    const algConstant = props.algConstant;
    const mainAlg = props.mainAlg;
    const altAlg = props.altAlg;
    const time = props.time;

    const user = props.user;

    // Changes state of time in algorithms.tsx (so that sort by time will be immediate)
    const handleTimeStateChange = props.handleTimeStateChange;

    // Disables save/discard button when true (when no edit to the main/alt forms)
    const [changesDisabled, setChangesDisabled] = useState(true);

    // The main/alt/time displayed in the form (defaults to prop value/responds to user change)
    const [mainAlgForm, setMainAlgForm] = useState(mainAlg);
    const [altAlgForm, setAltAlgForm] = useState(altAlg);
    const [timeForm, setTimeForm] = useState(time);

    // Enables Save/Discard when changes to main/alt are made
    const handleMainAlgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangesDisabled(false);
        setMainAlgForm(event.target.value)
    }
 
    const handleAltAlgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangesDisabled(false);
        setAltAlgForm(event.target.value)
    }

    // Called when time is clicked
    const handleTimeChange = async() => {
        const query = prompt(`Update your Personal Best for the Algorithm, ${algConstant.getLabel()}:`)
        if (query == null) {
            return
        }
        if (!isNaN(parseFloat(query))) {
            const newTime = Math.round((parseFloat(query) + Number.EPSILON) * 100) / 100
            try {
                await axios.patch('/algorithms/update/time', {
                    username: user,
                    index: algConstant.getIndex(),
                    time: newTime
                });
                setTimeForm(newTime); 
                handleTimeStateChange(algConstant.getIndex(), newTime);
                console.log(`Time Updated: {Algorithm: ${algConstant.getLabel()}, Time: ${newTime}`)
            }
            catch (err) {
                console.log(`Error Updating Time: ${err}`)
            }
        }
        else {
            alert("Invalid Time. Please Try Again.");
        }
    }
    
    // Called when save is clicked
    const handleSave = async() => {
        const confirmation = confirm(`Would you like to save changes to the Algorithm, ${algConstant.getLabel()}?`)
        if (confirmation) {
                setChangesDisabled(true) //disable save/discard
            try {
                await axios.patch('/algorithms/update/algorithm', {
                    username: user,
                    index: algConstant.getIndex(),
                    main_algo: mainAlgForm,
                    alt_algo: altAlgForm
                });

                console.log(`Algorithm Updated: {Algorithm: ${algConstant.getLabel()}, Main: ${mainAlgForm}, Alt: ${altAlgForm}}`)
            }
            catch (err) {
                console.log(`Error Updating Algorithm: ${err}`)
            }
        }  
    }

    // Called when discard is clicked
    const handleDiscard = () => {
        setChangesDisabled(true)
        setMainAlgForm(mainAlg)
        setAltAlgForm(altAlg)
    }

    return (
        <div className="row px-5 mt-2">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-2">
                        <img src={algConstant.getImgPath()} className="img-fluid rounded-start" width="216" height="216"></img>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h4 className="card-title px-3">{algConstant.getLabel()}</h4>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item lead">Main: 
                                    <input className="form-control form-control-sm" list={`${algConstant.getType()}-mainOptions`} placeholder="Enter Main Algorithm" value={mainAlgForm} onChange={(event) => handleMainAlgChange(event)}></input>
                                        <datalist id={`${algConstant.getType()}-mainOptions`}>
                                            {algConstant.getPopularAlg().map(dlOption)}
                                        </datalist>
                                </li>
                                <li className="list-group-item lead">Alternative:
                                    <input className="form-control form-control-sm" list={`${algConstant.getType()}-mainOptions`} placeholder="Enter Alternative Algorithm" value={altAlgForm} onChange={(event) => handleAltAlgChange(event)}></input>
                                        <datalist id={`${algConstant.getType()}-mainOptions`}>
                                            {algConstant.getPopularAlg().map(dlOption)}
                                        </datalist>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2 text-center">
                        <br/>
                        <p className="lead py-2">Personal Best:</p>
                        <h1 onClick={()=>handleTimeChange()}>{timeForm!=-1 ? timeForm.toFixed(2) : "-" /* 2 Decimal Places & Display - when time = -1 */}</h1>
                        <div className="btn-group py-4" role="group">
                            <button type="button" className={`btn btn-sm btn-success ${changesDisabled && 'disabled'}`} onClick={handleSave}>Save</button>
                            <button type="button" className={`btn btn-sm btn-danger ${changesDisabled && 'disabled'}`} onClick={handleDiscard}>Discard</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlgorithmCard;