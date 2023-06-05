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
    useEffect(()=>{
      gsap.registerPlugin(ScrollTrigger);
      let panels = gsap.utils.toArray(".panel");
      let tops = panels.map(panel => ScrollTrigger.create({trigger: panel, start: "top top"}));
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom", 
          pin: true, 
          pinSpacing: false 
        });
      });
      ScrollTrigger.create({
        snap: {
          snapTo: (progress, self) => {
            let panelStarts = tops.map(st => st.start), 
                snapScroll = gsap.utils.snap(panelStarts, self.scroll()); 
            return gsap.utils.normalize(0, ScrollTrigger.maxScroll(window), snapScroll);
          },
          duration: 0.5
        }
      });
      

    },[])
 

  return (
    <>
    <div className="main panel">
        <video src={background} autoPlay muted  loop/>
        <div className="overlay"></div>
        <HomeBody />
    </div>
    <div className="main2 panel">
        <HomeBookRoom />
    </div>
    </>
  )
}
export default Home;