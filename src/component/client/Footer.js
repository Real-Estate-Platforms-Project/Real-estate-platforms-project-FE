import Logo from "../Logo";
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer() {
    return (
        <footer className='container py-5'>
            <div className='row justify-content-between'>
                <div className='mb-2'>
                    <a className="navbar-brand" href="#"><Logo width={'125px'}/></a>
                </div>
                <div className='col-md-3 mb-5 mt-4'>
                    <p>59 Bervely Hill Ave, Brooklyn Town, <br/>
                        New York, NY 5630, CA, US</p>
                    <p className='mt-4'>+(123) 456-7890 <br/>
                        info@mail.com</p>
                    <div className='d-flex gap-2 mt-4'>
                        <a href="#" className="text-orange"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="text-orange"><i className="bi bi-twitter"></i></a>
                        <a href="#" className="text-orange"><i className="bi bi-instagram"></i></a>
                        <a href="#" className="text-orange"><i className="bi bi-linkedin"></i></a>
                        <a href="#" className="text-orange"><i className="bi bi-youtube"></i></a>
                    </div>
                </div>
                <div className='col-md-2'>
                    <h6 className='fs-5'>Features</h6>
                    <ul className='list-unstyled footer-list'>
                        <li><a href="#">Home v1</a></li>
                        <li><a href="#">Home v2</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Search</a></li>
                    </ul>
                </div>
                <div className='col-md-2'>
                    <h6 className='fs-5'>Information</h6>
                    <ul className='list-unstyled footer-list'>
                        <li><a href="#">Listing v1</a></li>
                        <li><a href="#">Listing v2</a></li>
                        <li><a href="#">Property Details</a></li>
                        <li><a href="#">Agent List</a></li>
                        <li><a href="#">Agent Profile</a></li>
                    </ul>
                </div>
                <div className='col-md-2'>
                    <h6 className='fs-5'>Documentation</h6>
                    <ul className='list-unstyled footer-list'>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">License</a></li>
                    </ul>
                </div>
                <div className='col-md-2'>
                    <h6 className='fs-5'>Others</h6>
                    <ul className='list-unstyled footer-list'>
                        <li><a href="#">Log in</a></li>
                        <li><a href="#">Enter OTP</a></li>
                        <li><a href="#">New Password</a></li>
                        <li><a href="#">Reset Password</a></li>
                        <li><a href="#">Create Account</a></li>
                    </ul>
                </div>
            </div>
            <div className='text-start mt-4'>
                <small>© 2024. All rights reserved.</small>
            </div>
        </footer>
    );
}

export default Footer;