import { useState, useEffect, useCallback } from "react";
import Select from "react-select"
import { OLLConst, PLLConst } from "./const";
import axios from "axios";

/* 
HOW TO USE TIMER:

0. (Optional) Choose an Algorithm from the Select Menu to show its respective scramble
1. Hold Spacebar and wait util the Timer turns from Red to Green (0.5 Seconds)
2. Release Spacebar to Start Timer and Start Solving the Rubik's Cuber
3. Once Solved, click Spacebar to Stop Timer
4. (if 0 is done, and signed in) If Time is faster than current Personal Best for Selected Algorithm
(or if there is no personal best for algorithm in Database), alert and ask user if they wish to update
their personal best. If User clicks OK, update time in Database
*/

const Timer = (props: {signedIn: boolean; user: string;}) => {
    const signedIn = props.signedIn;
    const user = props.user;

    // interface for React Select Options
    interface Option {
        value: number;
        trueForOLL: boolean;
        label: string;
    }

    // All options for the select menu
    const options = [
        { value: 0, trueForOLL: true, label: 'OLL, 1 (Dot)'},
        { value: 1, trueForOLL: true, label: 'OLL, 2 (Dot)'},
        { value: 2, trueForOLL: true, label: 'OLL, 3 (Dot)'},
        { value: 3, trueForOLL: true, label: 'OLL, 4 (Dot)'},
        { value: 4, trueForOLL: true, label: 'OLL, 5 (Square Shape)'},
        { value: 5, trueForOLL: true, label: 'OLL, 6 (Square Shape)'},
        { value: 6, trueForOLL: true, label: 'OLL, 7 (Small Lightning Bolt)'},
        { value: 7, trueForOLL: true, label: 'OLL, 8 (Small Lightning Bolt)'},
        { value: 8, trueForOLL: true, label: 'OLL, 9 (Fish Shape)'},
        { value: 9, trueForOLL: true, label: 'OLL, 10 (Fish Shape)'},
        { value: 10, trueForOLL: true, label: 'OLL, 11 (Small Lightning Bolt)'},
        { value: 11, trueForOLL: true, label: 'OLL, 12 (Small Lightning Bolt)'},
        { value: 12, trueForOLL: true, label: 'OLL, 13 (Knight Move Shape)'},
        { value: 13, trueForOLL: true, label: 'OLL, 14 (Knight Move Shape)'},
        { value: 14, trueForOLL: true, label: 'OLL, 15 (Knight Move Shape)'},
        { value: 15, trueForOLL: true, label: 'OLL, 16 (Knight Move Shape)'},
        { value: 16, trueForOLL: true, label: 'OLL, 17 (Dot)'},
        { value: 17, trueForOLL: true, label: 'OLL, 18 (Dot)'},
        { value: 18, trueForOLL: true, label: 'OLL, 19 (Dot)'},
        { value: 19, trueForOLL: true, label: 'OLL, 20 (Dot)'},
        { value: 20, trueForOLL: true, label: 'OLL, 21 (Cross)'},
        { value: 21, trueForOLL: true, label: 'OLL, 22 (Cross)'},
        { value: 22, trueForOLL: true, label: 'OLL, 23 (Cross)'},
        { value: 23, trueForOLL: true, label: 'OLL, 24 (Cross)'},
        { value: 24, trueForOLL: true, label: 'OLL, 25 (Cross)'},
        { value: 25, trueForOLL: true, label: 'OLL, 26 (Cross)'},
        { value: 26, trueForOLL: true, label: 'OLL, 27 (Cross)'},
        { value: 27, trueForOLL: true, label: 'OLL, 28 (Corners Oriented)'},
        { value: 28, trueForOLL: true, label: 'OLL, 29 (Awkward Shape)'},
        { value: 29, trueForOLL: true, label: 'OLL, 30 (Awkward Shape)'},
        { value: 30, trueForOLL: true, label: 'OLL, 31 (P Shape)'},
        { value: 31, trueForOLL: true, label: 'OLL, 32 (P Shape)'},
        { value: 32, trueForOLL: true, label: 'OLL, 33 (T Shape)'},
        { value: 33, trueForOLL: true, label: 'OLL, 34 (C Shape)'},
        { value: 34, trueForOLL: true, label: 'OLL, 35 (Fish Shape)'},
        { value: 35, trueForOLL: true, label: 'OLL, 36 (W Shape)'},
        { value: 36, trueForOLL: true, label: 'OLL, 37 (Fish Shape)'},
        { value: 37, trueForOLL: true, label: 'OLL, 38 (W Shape)'},
        { value: 38, trueForOLL: true, label: 'OLL, 39 (Big Lightning Bolt)'},
        { value: 39, trueForOLL: true, label: 'OLL, 40 (Big Lightning Bolt)'},
        { value: 40, trueForOLL: true, label: 'OLL, 41 (Awkward Shape)'},
        { value: 41, trueForOLL: true, label: 'OLL, 42 (Awkward Shape)'},
        { value: 42, trueForOLL: true, label: 'OLL, 43 (P Shape)'},
        { value: 43, trueForOLL: true, label: 'OLL, 44 (P Shape)'},
        { value: 44, trueForOLL: true, label: 'OLL, 45 (T Shape)'},
        { value: 45, trueForOLL: true, label: 'OLL, 46 (C Shape)'},
        { value: 46, trueForOLL: true, label: 'OLL, 47 (Small L Shape)'},
        { value: 47, trueForOLL: true, label: 'OLL, 48 (Small L Shape)'},
        { value: 48, trueForOLL: true, label: 'OLL, 49 (Small L Shape)'},
        { value: 49, trueForOLL: true, label: 'OLL, 50 (Small L Shape)'},
        { value: 50, trueForOLL: true, label: 'OLL, 51 (I Shape)'},
        { value: 51, trueForOLL: true, label: 'OLL, 52 (I Shape)'},
        { value: 52, trueForOLL: true, label: 'OLL, 53 (Small L Shape)'},
        { value: 53, trueForOLL: true, label: 'OLL, 54 (Small L Shape)'},
        { value: 54, trueForOLL: true, label: 'OLL, 55 (I Shape)'},
        { value: 55, trueForOLL: true, label: 'OLL, 56 (I Shape)'},
        { value: 56, trueForOLL: true, label: 'OLL, 57 (Corners Oriented)'},
        { value: 57, trueForOLL: false, label: 'PLL, Aa Perm' },
        { value: 58, trueForOLL: false, label: 'PLL, Ab Perm' },
        { value: 59, trueForOLL: false, label: 'PLL, E Perm' },
        { value: 60, trueForOLL: false, label: 'PLL, F Perm' },
        { value: 61, trueForOLL: false, label: 'PLL, Ga Perm' },
        { value: 62, trueForOLL: false, label: 'PLL, Gb Perm' },
        { value: 63, trueForOLL: false, label: 'PLL, Gc Perm' },
        { value: 64, trueForOLL: false, label: 'PLL, Gd Perm' },
        { value: 65, trueForOLL: false, label: 'PLL, H Perm' },
        { value: 66, trueForOLL: false, label: 'PLL, Ja Perm' },
        { value: 67, trueForOLL: false, label: 'PLL, Jb Perm' },
        { value: 68, trueForOLL: false, label: 'PLL, Na Perm' },
        { value: 69, trueForOLL: false, label: 'PLL, Nb Perm' },
        { value: 70, trueForOLL: false, label: 'PLL, Ra Perm' },
        { value: 71, trueForOLL: false, label: 'PLL, Rb Perm' },
        { value: 72, trueForOLL: false, label: 'PLL, T Perm' },
        { value: 73, trueForOLL: false, label: 'PLL, Ua Perm' },
        { value: 74, trueForOLL: false, label: 'PLL, Ub Perm' },
        { value: 75, trueForOLL: false, label: 'PLL, V Perm' },
        { value: 76, trueForOLL: false, label: 'PLL, Y Perm' },
        { value: 77, trueForOLL: false, label: 'PLL, Z Perm' }
    ]

    // State for current time in the timer (in milliseconds)
    const [time, setTime] = useState(0);

    // Whether or not the timer is Running
    const [isRunning, setIsRunning] = useState(false);

    // Whether or not the spacebar is being Held
    const [keyHeld, setKeyHeld] = useState(false);

    // How Long the spacebar is Held
    const [heldDuration, setHeldDuration] = useState(0);

    // Whether or not the timer can start (turns from red to green)
    const [canStart, setCanStart] = useState(true);

    // The current selected algorithm from Select Menu (defaults to None)
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    // The Scramble shown for the selected algorithm
    const [scramble, setScramble] = useState("No Algorithm Selected")

    // Personal Best for chosen algorithm (-1 means None)
    const [personalBest, setPersonalBest] = useState(-1)

    // Format from milliseconds to seconds.milliseconds (in string)
    const formatTime = (time: number): string => {
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${seconds.toString()}.${milliseconds.toString().padStart(2, '0')}`;
    }

    /* 
    React Select Menu is toggled when spacebar is clicked at default.
    This makes it annoying to start the timer as the menu will just open and close
    when the spacebar is being held. This function removes that behaviour
    */
    const handleAnnoyingSpace = (event: React.KeyboardEvent) => {
        if (event.code === 'Space') {
            const selection = window.getSelection();
            if (selection) {
              selection.removeAllRanges();
            }
            event.preventDefault();
        }
    };

    // When Spacebar is held down (Use Callback to reduce computational load)
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.code == "Space" && !keyHeld) {
            setKeyHeld(true);
            setHeldDuration(0);
        }
        // if the Timer is running and Spacebar is clicked, stop the Timer
        if (isRunning) {
            setIsRunning(false);
        }
    }, [keyHeld])

    // When Spacebar is NOT held down (Use Callback to reduce computational load)
    const handleKeyUp = useCallback((event: KeyboardEvent) => {
        if (event.code === 'Space') {
          setKeyHeld(false);
          // if Timer is green (canStart) and not Running, start Timer from 0
          if (canStart && !isRunning) {
            setIsRunning(true);
            setTime(0);
          } 
          // Timer no Longer can start when Spacebar Released
          setCanStart(false)
        }
      }, [canStart, isRunning]);

    // Adds/Removes Global Event Listener when Mounted/Unmounted
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    // Handle Timer Run Mechanism (Called when isRunning Changes)
    useEffect(() => {
        // Runs Timer
        let interval: number;
        if (isRunning) {
          interval = window.setInterval(() => {
            setTime((prevTime) => prevTime + 10);
          }, 10);
        
        // Get Time when Timer Stops (When not running except if time is still 0)
        } else if (time!=0) {
            // Log Time for Testing
            console.log(`Time: ${formatTime(time)}`);
            // Reset to Original State
            setKeyHeld(false)
            setCanStart(false)
            // Compare new time to Personal Best
            handleNewPB(time/1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    // Handle Timer Start Mechanism
    useEffect(() => {
        // Runs HeldDuration
        let interval: number;
        if (keyHeld) {
          interval = window.setInterval(() => {
            setHeldDuration((prevDuration) => {
              const newDuration = prevDuration + 10;
              // If HeldDuration reaches 0.5 seconds, timer can start
              setCanStart(newDuration >= 500);
              return newDuration;
            });
          }, 10);
        } else {
          setHeldDuration(0);
          setCanStart(false);
        }
        return () => clearInterval(interval);
    }, [keyHeld]);

    // Called for every time recorded to compare to current PB
    const handleNewPB = (newTime: number) => {
        const handlePB = async () => {
            // User is Signed In, an Algorithm is Selected, and a Personal Best is Reached
            if (signedIn && selectedOption && (personalBest == -1 || newTime < personalBest)) {
                // Ask User if they want to Update PB
                const confirmation = confirm(`Congratulations, you have achieved a new Personal Best for the Algorithm, ${selectedOption?.label}!\n\nWould you like to update your Personal Best to your Account?`);
                if (confirmation) {
                    try {
                        // Update local state
                        setPersonalBest(newTime);
            
                        // Send Axios Patch request to update the database
                        const response = await axios.patch(`/algorithms/update/time`, {
                            username: user,
                            index: selectedOption.value,
                            time: newTime
                        });
            
                        console.log('Personal best updated:', response.data);
                    } catch (err) {
                        console.error(`Error updating personal best: ${err}`);
                    }
                }
            }
        }
        // Call Method after 120ms (Buffer for the Timer to Fully Stop before disrupted by alert)
        setTimeout(handlePB, 120);
    }

    // Gets current Personal Best for Selected Algorithm to be displayed in the UI
    const handleCurrentPersonalBest = async(selected: Option | null) => {
        // Axios GET Request to get Personal Best of Selected Algorithm
        try {
            const res = await axios.get(`/algorithms/${user}/${selected?.value}`)
            // Update current state if PB exists in Database
            res.data.length != 0 && setPersonalBest(res.data[0].time)
        }
        catch (err) {
            console.log(`Error Getting Personal Best: ${err}`);
        }
    }

    // Changes Scramble and Current Personal Best According to Selected Algorithm
    const handleSelectChange = (selected: Option | null) => {
        // Updates state of Selected Option
        setSelectedOption(selected);
        // If the Selected Options is OLL
        if (selected?.trueForOLL) {
            setScramble(OLLConst[selected?.value].getScramble());
            // Get Personal Best if Signed In
            signedIn && handleCurrentPersonalBest(selected)
        }
        // Otherwise, if PLL
        else if (!selected?.trueForOLL && selected?.value) {
            // Index in PLLConst = Index - No. of OLL Algs (57)
            setScramble(PLLConst[selected?.value - 57].getScramble());
            // Get Personal Best if Signed In
            signedIn && handleCurrentPersonalBest(selected)
        }
        else {
            setScramble("No Algorithm Selected");
        }
    }

    return (
        <div className="container-fluid bg-dark text-white py-5">
            <div className="row text-left px-5">
                <p className="lead">Select an Algorithm:</p>
            </div>
            <div className="row text-left px-5">
                <div className="col text-black">
                    <Select options={options} onChange={handleSelectChange} onKeyDown={handleAnnoyingSpace} value={selectedOption}/>
                </div>
                <div className="col" /><div className="col" /><div className="col" />
            </div>
            <div className="row text-center px-5 py-3">
                <h3>{scramble}</h3>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6 p-5 mb-4 text-center">
                    {/* If Key is not held, text is white. If it is but not ready to start, text is red, if ready to start, text turns green */}
                    <div className={`display-1 mb-4 ${keyHeld ? (canStart ? 'text-success' : 'text-danger') : 'text-white'}`}>
                    {formatTime(time)}
                    </div>
                    <p className="lead text-white">
                    {/* Round Personal Best to 2 decimal places */}
                    Personal Best: {personalBest != -1 ? personalBest.toFixed(2) : "-"}
                    </p>
                    <p className="lead text-white">
                    Hold spacebar for 0.5 seconds to start, press the spacebar to stop
                    </p>
                </div>
            </div>
        </div>
    )

    
}   

export default Timer;