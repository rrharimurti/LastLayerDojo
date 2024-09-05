import { useState } from "react";
import axios from "axios";
import { OLLConst, PLLConst } from "./const";
import { Link, NavLink, useNavigate } from "react-router-dom";
import bcryptjs from 'bcryptjs';

const Navbar = (props: { signedIn: boolean, user: string, onSignIn: (user: string) => void; onSignOut: () => void})  => {

    // Helps navigate to other pages without signing out
    const navigate = useNavigate();

    // Sign In and Username Props from App
    const signedIn = props.signedIn;
    const user = props.user;
    const onSignIn = props.onSignIn;
    const onSignOut = props.onSignOut;

    // Error Messages in Log In/Sign Up Form
    const [usernameSignUpError, setUsernameSignUpError] = useState("")
    const [passwordSignUpError, setPasswordSignUpError] = useState("")
    const [usernameSignInError, setUsernameSignInError] = useState("")
    const [passwordSignInError, setPasswordSignInError] = useState("")
    const [verifyError, setVerifyError] = useState("")
    const [signUpError, setSignUpError] = useState("")
    const [signInError, setSignInError] = useState("")
    
    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent unnecessary reloading
        event.preventDefault();

        let validated = true;
        let isTaken = false;

        // All valid characters (Symbols except for  _. Invalid)
        const regex = /^[a-z0-9_.]+$/

        // Getting data from form as Object
        const form = event.currentTarget;
        const formData = new FormData(form)
        const formDataObj = Object.fromEntries(formData);

        // Verify Text = Inputted Text for Verify Password (Should be equal to passwordText)
        const usernameText = formDataObj.username as string;
        const passwordText = formDataObj.password as string;
        const verifyText = formDataObj.verifypassword as string;

        // Axios Get Request for user data to backend
        axios.get(`/users/${usernameText.trim()}`)
        .then((res) => {
            // isTaken is true if and only if chosen username is already taken (exists in the backend), 
            isTaken = (res.data.length != 0)

            // Validations (One Failure causes validated to be false, Error Message Displayed for Each Validation Failure)
            if (usernameText.trim() == "") {
                setUsernameSignUpError("Username can't be blank")
                validated = false;
            }
            else if (usernameText.trim().length > 50) {
                setUsernameSignUpError("Username can't be longer than 50 characters")
                validated = false;
            }
            else if (!regex.test(usernameText.trim())) {
                setUsernameSignUpError("Username contains invalid characters")
                validated = false;
            }
            else if (isTaken) {
                setUsernameSignUpError("Username already taken")
                validated = false;
            }
            else {
                setUsernameSignUpError("")
            }
            if (passwordText.length < 6) {
                setPasswordSignUpError("Password can't be less than 6 characters long")
                validated = false;
            }
            else if (passwordText.length > 2147483647) {
                setPasswordSignUpError("Password can't be longer than 2,147,483,647 characters")
                validated = false;
            }
            else if (passwordText.search(" ") != -1) {
                setPasswordSignUpError("Password can't contain spaces")
                validated = false;
            }
            else {
                setPasswordSignUpError("")
            }
            if (verifyText.length < 6) {
                setVerifyError("Password can't be less than 6 characters long")
                validated = false;
            }
            else if (verifyText.search(" ") != -1) {
                setVerifyError("Password can't contain spaces")
                validated = false;
            }
            else if (verifyText.length > 2147483647) {
                setVerifyError("Password can't be longer than 2,147,483,647 characters")
                validated = false;
            }
            else if (verifyText != passwordText) {
                setVerifyError("Passwords do not match")
                validated = false;
            }
            else {
                setVerifyError("")
            }

            // Validation Done
            if (validated) {
                // Prevent Reload
                event.preventDefault()

                // Function for Axios Post Request to add User
                const postAccount = async () => {
                    try {
                        // Adds User based on User Schema
                        const userRes = await axios.post('/users/add', {
                            username: usernameText,
                            password: passwordText
                        })
                        console.log(userRes);
                    
                        // When Account is Created all OLL & PLL algorithms are initialized (so that they can just be patched later on)
                        // Time is Defaulted to -1 (Meaning no data, helps for algorithms and timer components)

                        // For OLL algorithms
                        for (const algorithm of OLLConst) {
                            await axios.post('/algorithms/add', {
                                username: usernameText,
                                index: algorithm.getIndex(),
                                main_algo: "",
                                alt_algo: "",
                                time: -1
                            })
                        }

                        // For PLL Algorithms
                        for (const algorithm of PLLConst) {
                            await axios.post('/algorithms/add', {
                                username: usernameText,
                                index: algorithm.getIndex(),
                                main_algo: "",
                                alt_algo: "",
                                time: -1
                            })
                        }
                    }
                    catch(err) {
                        console.log(`Error Signing Up: ${err}`);
                        // Error Text shows beneath Sign Up button if failed
                        setSignUpError("Sign Up Failed");
                    }
                }
                postAccount()
                // Call Prop Sign In Function from App
                onSignIn(usernameText);
                // Go Back to Home (if Signing in from /timer or /*)
                navigate('/');
            }
            else {
                // Error Text shows beneath Sign Up button if failed
                setSignUpError("Sign Up Failed");
            }
        })
        .catch((err) => {
            console.log(`Error Signing Up: ${err}`)
            // Error Text shows beneath Sign Up button if failed
            setSignUpError("Sign Up Failed");
        })
    }

    const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        // Prevent Reload
        event.preventDefault();

        let validated = true;
        let isTaken = true;

        // Getting data from form as Object
        const form = event.currentTarget;
        const formData = new FormData(form)
        const formDataObj = Object.fromEntries(formData);

        const usernameText = formDataObj.username as string;
        const passwordText = formDataObj.password as string;

        // Function for Signing In
        const signAccountIn = async () => {
            try {
                const res = await axios.get(`/users/${usernameText.trim()}`)
                console.log(res)
                // This Time, isTaken needs to be true to Sign In (The Username should already Exist)
                isTaken = (res.data.length != 0)

                // Validations
                if (usernameText.trim() == "") {
                    setUsernameSignInError("Username can't be blank")
                    setPasswordSignInError("Invalid Password")
                    validated = false;
                }
                else if (!isTaken) {
                    setUsernameSignInError("Username doesn't exist")
                    setPasswordSignInError("Invalid Password")
                    validated = false;
                }
                else {
                    setUsernameSignInError("")
                    const validPassword = bcryptjs.compareSync(passwordText, res.data[0].password)
                    if (!validPassword) {
                        setPasswordSignInError("Invalid Password")
                        validated = false;
                    }
                    else {
                        setPasswordSignInError("")
                    }
                }

                // if Validated, Sign Account in
                if (validated) {
                    // Prevent Reload 
                    event.preventDefault();
                    // Call Prop Sign In Function from App
                    onSignIn(usernameText);
                    // Go back to Home
                    navigate('/');
                }
                else {
                    // Error Text shows beneath Sign Up button if failed
                    setSignInError("Sign In Failed");
                }
            }
            catch(err) {
                console.log(`Error Signing In: ${err}`)
                // Error Text shows beneath Sign Up button if failed
                setSignInError("Sign In Failed")
            }
        }
        signAccountIn();
    }

    const handleLogOut = () => {
        const confirmation = confirm(`Are you sure you would like to sign out of ${user}?`);
        confirmation && onSignOut() // Call prop sign out function from App
        navigate('/');
    }

    // Activated by clicking user's username in right side of navbar
    const handleDeleteAccount = async() => {
        const query = prompt(`Would like to delete your account, ${user}? (Clicking your username on the Navigation Bar leads to the Account Deletion Process)\n\nNote: This action is irreversible.\n\nType '${user}' to confirm.`)
        if (query == null || query == "") {
            return;
        }
        const confirmation = confirm(`Are you sure you would like to delete your account, ${user}?`)
        if (confirmation) {
            try {
                // Axios Delete Request
                const user_res = axios.delete(`/users/delete/${user}`)
                const alg_res = axios.delete(`/algorithms/delete/${user}`)

                // Make sure that both requests are done concurrently
                Promise.all([user_res, alg_res]).then(() => {
                    onSignOut()
                    navigate('/')
                    alert("Your Account has been successfully deleted.")
                });
            }
            catch(err) {
                console.log(`Account Deletion Error: ${err}`)
                alert("Account Deletion Failed.")
            }
                
        }
        else {
            alert("Account Deletion Failed.")
        }
    }

    // Shows some Credits from the Alert (Only images, rubik's cube algorithms and scrambles)
    const handleCredits = () => {
        alert("OLL/PLL Cases Images taken from jperm.net\n\nPopular OLL/PLL Algorithms taken from jperm.net & algdb.net\n\nScrambles taken from bestsiteever.ru")
    }

    // Buttons showed on right side of navbar depending on whether or not user is signed in
    let showButtons = 
    // if Logged Out
    <>
        {/* Log In Button */}
        <div className="dropdown m-2">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                Login
            </button>
            <form className="dropdown-menu dropdown-menu-end p-4 border-primary border-3" style={{minWidth: "300px"}} aria-expanded="true" onSubmit={handleSignIn}>
                <div className="mb-1">
                    <label className="form-label">Username</label>
                    <input name="username" className="form-control" placeholder="Username"></input>
                    <p className="text-danger">{usernameSignInError}</p>
                </div>
                <div className="mb-1">
                    <label className="form-label">Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Password"></input>
                    <p className="text-danger">{passwordSignInError}</p>
                </div>
                <center><button type="submit" className="btn btn-primary mb-1">Sign in</button></center>
                <p className="text-danger text-center">{signInError}</p>
            </form>
        </div>

        {/* Sign Up Button */}
        <div className="dropdown m-2">
            <button type="button" className="btn btn-outline-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                Sign Up
            </button>
            <form className="dropdown-menu dropdown-menu-end mb-5 p-4 border-primary border-5" style={{minWidth: "400px"}} aria-expanded="true" onSubmit={handleSignUp}>
                <div className="mb-1">
                    <label className="form-label ">Set Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Username"></input>
                    <p className="text-danger">{usernameSignUpError}</p>
                </div>
                <div className="mb-1">
                    <label className="form-label">Set Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Password"></input>
                    <p className="text-danger">{passwordSignUpError}</p>
                </div>
                <div className="mb-1">
                    <label className="form-label">Verify Password</label>
                    <input type="password" name="verifypassword" className="form-control" placeholder="Password"></input>
                    <p className="text-danger">{verifyError}</p>
                </div>
                <center><button type="submit" className="btn btn-primary mb-1">Sign Up</button></center>
                <p className="text-danger text-center">{signUpError}</p>
            </form>
        </div>
    </>

    // If Signed In
    if (signedIn) {
        showButtons = 
        <>
            {/* The Username (Click to Delete Account) */}
            <p className="my-2 mx-4 text-white">Signed in as <u onClick={handleDeleteAccount}>{user}</u></p>
            {/* Log Out Button */}
            <button type="button" className="btn btn-outline-danger m-2" onClick={handleLogOut}>Log Out</button>    
        </>
    }

    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <img src="/tagline.svg"  alt="Logo" width="300" height="100" className="d-inline-block align-text-top"></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item px-4">
                            <NavLink className="nav-link active" aria-current="page" to="/" end>Home</NavLink>
                        </li>
                        <li className="nav-item dropdown px-4">
                            {/* Algorithms Page Enabled if and only signed In */}
                            <a className={`nav-link dropdown-toggle ${signedIn ? "" : "disabled"}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Algorithms
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/oll">OLL</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item" to="/pll">PLL</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item px-4">
                            <NavLink className="nav-link" to="/timer">Timer</NavLink>
                        </li>
                        <li className="nav-item px-4">
                        <a className="nav-link" onClick={handleCredits}>Credits</a>
                        </li>
                    </ul>
                    {showButtons}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
