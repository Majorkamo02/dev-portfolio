import { NavLink } from 'react-router-dom';
import '../css/homepage.css'
import { motion } from "framer-motion";
import profilePic from '../assets/Profile-Picture.png'


let firstLoad = false;

function Homepage() {
    return (
        <div className='home-content'>
            <div className='initial-info-container'>
                <div className='name'>
                    <motion.div 
                    className='fname'
                    initial={{ x:-300, opacity: 0}}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                    duration: 1.7,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: firstLoad ? 0:1.5,
                    }}
                    onAnimationComplete={()=>{firstLoad = true}}
                    >
                        <h1>Cameron</h1>
                    </motion.div>
                    
                    <motion.div 
                    className='lname'
                    initial={{ x:-500, opacity: 0}}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                    duration: 1.7,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: firstLoad ? .2:1.6,
                    }}
                    onAnimationComplete={()=>{firstLoad = true}}
                    >
                        <h1>Jolly</h1>
                    </motion.div>
                </div>
                    <motion.div 
                    className='profile-pic'
                    initial={{ y:+500, opacity: 0}}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                    duration: 2,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: firstLoad ? .1:1.6,
                    }}
                    onAnimationComplete={()=>{firstLoad = true}}
                    >
                        <img src={profilePic} alt="" />
                        <a href="mailto:cameron.l.jolly@gmail.com">cameron.l.jolly@gmail.com</a>
                        <NavLink to="/Resume">Resume</NavLink>

                    </motion.div>

                    <motion.div 
                    className='who-am-i'
                    initial={{ x:-300, opacity: 0}}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                    duration: 1.9,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: firstLoad ? 0:1.4,
                    }}
                    onAnimationComplete={()=>{firstLoad = true}}
                    >
                        <h2 className='main-about'>About</h2>
                        <p className='description'>I'm a full stack web developer specilizing in react and backend systems. I make sure your systems are efficent and clean, I love simulations and managing large sets of data. </p>
                    </motion.div>

                    <motion.div 
                    className='my-work'
                    initial={{ y:300}}
                    animate={{ y: 0 }}
                    transition={{ 
                    duration: 1.9,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: firstLoad ? 0:1.4,
                    }}
                    onAnimationComplete={()=>{firstLoad = true}}
                    >
                        <NavLink className='my-work-nav' to={"/portfolio"}><button>My Work</button></NavLink>
                    </motion.div>
            </div>
        </div>
    )
}

export default Homepage