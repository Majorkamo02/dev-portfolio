import '../css/footer.css'
import gitHubLogo from '../assets/GitHub-Logo.png'
import linkedinLogo from '../assets/image (1).png'

function Footer() {
    return(
        <footer>
            <div>
            <a target='_blank' href="https://github.com/Majorkamo02"><img  className='github-logo' src={gitHubLogo} /></a>
            <a target='_blank' href="https://www.linkedin.com/in/cameron-jolly-5ba845277/"><img  className='linkedin-logo' src={linkedinLogo} /></a>
            </div>
            <span className='footer-name'>© 2025 Cameron Jolly. All rights reserved.</span>
        </footer>
    )
}

export default Footer