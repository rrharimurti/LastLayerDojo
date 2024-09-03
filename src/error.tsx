const Error = () => {
    return (
        <div className="container-fluid bg-dark text-white min-vh-100 p-5">
            <div className="row py-5">
                <p className="display-3">404 - Page Not Found</p>
            </div>
            <div className="row">
                <p className="lead">You may have tried accessing a page that does not exist, or you do not have permission to access.</p>
            </div>
        </div>
    )
}

export default Error;