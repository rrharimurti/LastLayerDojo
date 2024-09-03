const Home = (props: { signedIn: boolean; user: String; alert: boolean; removeAlert: () => void}) => {
    const signedIn = props.signedIn;
    const user = props.user;
    const alert = props.alert;
    const removeAlert = props.removeAlert;

    return (
        <div className="container-fluid bg-dark text-white min-vh-100 p-5">
            {/* Alert Appears After Signing In */}

            {alert && (
                <div className="alert alert-success alert-dismissible fade show" data-bs-theme="dark" style={{width: "400px"}} role="alert">
                Successfully signed in as {user}!

                {/* Calls prop function from App to remove alert */}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={removeAlert}></button>
                </div>
            )}

            {/* Custom Message for User when Signed In */}
            <div className="row p-3">
                <p className="display-5">{signedIn ? `Welcome Back, ${user}` : "Welcome to LastLayerDojo!"}</p>
            </div>
            <div className="row p-3" style={{lineHeight: 2}}>
                <p className="lead">LastLayerDojo is an Algorithm trainer for the 3x3 Rubik’s Cube, specifically focusing on CFOP Last Layer Algorithms (OLL & PLL). The aim of this site is to help speedcubers learn, practice, and master these algorithms to optimize solving the last layer and save those precious seconds (or milliseconds) in your speedsolves.</p>
            </div>
            <div className="row p-3">
                <p className="display-6">{signedIn ? "Start Training your Algorithms" : "New User? Sign up for the Full Experience"}</p>
            </div>
            <div className="row p-3" style={{lineHeight: 2}}>
                <ul className="lead">
                    <li><b>Learn</b> -  Imagine a notebook but for Rubik’s cube algorithms. For each of the 57 OLL and 21 PLL patterns, you are given the choice to choose from a variety of popular algorithms or even create your own. We will keep track of all your favorite algorithms, any alternatives you may use, and also your personal bests.</li>
                    <li><b>Practice</b> -  You may use the timer without an account but by signing up, we will link your times to your account and automatically update your personal best. You can also manually update your personal best by clicking on any of the times in "My OLL” or “My PLL”.</li>
                </ul>
            </div>
            <div className="row p-3">
                <p className="display-6">Privacy & Security</p>
            </div>
            <div className="row p-3 lead" style={{lineHeight: 2}}>
                <p>When creating an account, LastLayerDojo will <b>NOT</b> use any personal or sensitive information. We will only store the following data:</p>
                <ul>
                    <li>Your custom LastLayerDojo Username</li>
                    <li>Your custom LastLayerDojo Password (Protected with Bcrypt)</li>
                    <li>Your Algorithms and Personal Bests</li>
                </ul>
                <p>You can delete your account anytime by clicking your username on the navigation bar and following the subsequent instructions.</p>
            </div>
            <div className="row p-3">
                <p className="lead text-danger"><b>Be Smart when choosing a Password:</b> Do <b>NOT</b> include your personal information or use the same password you use for your other accounts.</p>
            </div>
        </div>
    );
}

export default Home;