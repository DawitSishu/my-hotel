import background from "../../Assets/homevid.mp4";
import { useEffect } from "react";
import '../Login/Login.css';
import './Home.css';
import HomeBody from "./HomeBody";
import HomeBookRoom from "./HomeBookRoom";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

const Home = (props) => {
   useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.main', // CSS selector for the trigger element
        start: 'top center', // Define when the animation should start
        end: 'bottom center', // Define when the animation should end
        scrub: true, // Enable smooth scrubbing effect
        // markers: true, // Add markers for debugging
      },
    });
    gsap.set('.main', { opacity: 0, y: -100 }); // Initialize the initial state of the component
    gsap.to('.main', { opacity: 1, y: 0, duration: 1, scrollTrigger: '.main' }); // Animate the component when it comes into view
    // timeline.to('.main', { opacity: 1, y: 0, duration: 1 });

    ScrollTrigger.refresh();
  }, []);
  return (
    <div className="scroll-trigger">
    <div className="main">
        <video src={background} autoPlay muted  loop/>
        <div className="overlay"></div>
        <HomeBody />
    </div>
    <div className="main2">
        <HomeBookRoom />
    </div>
    </div>
  )
}
export default Home;