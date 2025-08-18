import "../css/resume.css"
import resume from '../assets/Resume.pdf'


function Resume() {
    return(
        <div className="resume">
            <iframe src={resume}></iframe>
        </div>
    )
}

export default Resume