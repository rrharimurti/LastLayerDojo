import AlgorithmCard from "./algorithmcard";
import { AlgorithmConst } from "./const";
import { OLLConst, PLLConst } from "./const";
import { useState, useEffect } from "react";
import axios from "axios";

const Algorithms = (props: {TrueForOLL: boolean, user: string}) => {

    // Search Filter and Sort Options
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("0");

    // For index i, contains main, alt, time of (algorithm.getIndex() == i)
    const [main, setMain] = useState(new Array(78).fill(""));
    const [alt, setAlt] = useState(new Array(78).fill(""));
    const [time, setTime] = useState(new Array(78).fill(-1)); //time = -1 -> no time

    // Standby when fillStates is being executed
    const [isLoading, setIsLoading] = useState(true);

    // False for PLL
    const TrueForOLL = props.TrueForOLL 
    const user = props.user

    interface AlgorithmData {
        index: number;
        main_algo: string;
        alt_algo: string;
        time: number;
      }

    // Requests algorithm data from backend and fills main, alt, time
    const fillStates = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/algorithms/${user}`);
            setMain((prevMain) => {
                const newMain = [...prevMain];
                res.data.forEach((item: AlgorithmData) => {
                    if (item.index <= 77) {
                        newMain[item.index] = item.main_algo;
                    }
                });
                return newMain;
            });
            setAlt((prevAlt) => {
                const newAlt = [...prevAlt];
                res.data.forEach((item: AlgorithmData) => {
                    if (item.index <= 77) {
                        newAlt[item.index] = item.alt_algo;
                    }
                });
                return newAlt;
            });
            setTime((prevTime) => {
                const newTime = [...prevTime];
                res.data.forEach((item: AlgorithmData) => {
                    if (item.index <= 77) {
                        newTime[item.index] = item.time;
                    }
                });
                return newTime;
            });
        } catch (err) {
            console.log(`Error Updating States: ${err}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fillStates();
    }, [user])

    // Create AlgorithmCard for each AlgorithmConst
    const Card = (algorithm: AlgorithmConst) => {
        return (<AlgorithmCard key={`${algorithm.getType()}-card`} algConstant={algorithm} mainAlg={main[algorithm.getIndex()]} altAlg={alt[algorithm.getIndex()]} time={time[algorithm.getIndex()]} user={user} handleTimeStateChange={handleTimeStateChange} />);
    }    

    // sorts Algorithm Array (0 = A-Z/No. Ascending, 1 = Z-A/No. Descending, 2 = From Fastest, 3 = From Slowest)
    const sortBy = (type: string, array: AlgorithmConst[]) => {
        let temp = [...array]; // Create a shallow copy to avoid modifying the original array
        
        if (type === "0" || type === "1") {
            temp.sort((a, b) => a.getIndex() - b.getIndex());
            if (type === "1") temp.reverse();
        } else if (type === "2") {
            temp.sort((a, b) => {
                const timeA = time[a.getIndex()];
                const timeB = time[b.getIndex()];

                // If -1, go bottom
                if (timeA === -1 && timeB === -1) return 0;
                if (timeA === -1) return 1;
                if (timeB === -1) return -1;

                return timeA - timeB;
            });
        } else if (type === "3") {
            temp.sort((a, b) => {
                const timeA = time[a.getIndex()];
                const timeB = time[b.getIndex()];

                // If -1, go bottom
                if (timeA === -1 && timeB === -1) return 0;
                if (timeA === -1) return 1;
                if (timeB === -1) return -1;
                return timeB - timeA;
            });
        }
        
        return temp;
    }

    // Prop function for algorithmcard to change state of time (so that sort by time will be immediate)
    const handleTimeStateChange = (index: number, time: number) => {
        setTime((prevTime) => {
            const newTime = [...prevTime];
            newTime[index] = time;
            return newTime;
        });
    }

    // Fixes the footer when one/no algorithm card is active due to search filter
    const fixFooter = (length: number) => {

        // Empty row to fill the space
        if (length == 1) {
            return (
                <div className="row py-5"></div>
            )
        }

        // Empty rows + a message if no algorithm cards active
        else if (length == 0) {
            return (
                <>
                    <div className="row py-5"></div>
                    <div className="row py-5 text-center"><p className="lead">No Algorithms Found.</p></div>
                    <div className="row py-5"></div>
                </>
            )
        }
    }
    
    // Loading page in case fillStates() takes long
    if (isLoading) {
        return (
        <div className="container-fluid bg-dark vw-100 vh-100">
            <p className="lead">Loading...</p>
            <span className="visually-hidden">Loading...</span>
        </div>
        )
    }
    return (
        <>
            <div className="container-fluid text-left bg-dark text-white">
                <div className="row">
                    <h1 className="p-5">{TrueForOLL ? "My OLL Algorithms" : "My PLL algorithms"}</h1>
                </div>
                <div className="row mb-4">
                    <div className="col px-5">
                        <p className="lead">Sort by:</p>
                        <select className="form-select" aria-label="Default select example" defaultValue={"0"} onChange={(event) => setSort(event.target.value)}>
                            <option value="0">{TrueForOLL ? "Number (Ascending)" : "Alphabetical (A-Z)"}</option>
                            <option value="1">{TrueForOLL ? "Number (Descending)" : "Alphabetical (Z-A)"}</option>
                            <option value="2">Time (Fastest to Slowest)</option>
                            <option value="3">Time (Slowest to Fastest)</option>
                        </select>
                    </div>
                    <div className="col px-5">
                        <p className="lead">Search:</p>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(event) => setSearch(event.target.value.toLowerCase())}></input>
                    </div>
                </div>
                {TrueForOLL ? sortBy(sort, OLLConst.filter(algorithm => algorithm.getLabel().toLowerCase().includes(search))).map(Card) : sortBy(sort, PLLConst.filter(algorithm => algorithm.getLabel().toLowerCase().includes(search))).map(Card)}
                {TrueForOLL ? fixFooter(OLLConst.filter(algorithm => algorithm.getLabel().toLowerCase().includes(search)).length) : fixFooter(PLLConst.filter(algorithm => algorithm.getLabel().toLowerCase().includes(search)).length)}
            </div>
        </>
    )
}

export default Algorithms;