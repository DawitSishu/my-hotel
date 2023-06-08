import { useEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import  image1 from '../../Assets/1.jpg';
import  image2 from '../../Assets/2.jpg';
import  image3 from '../../Assets/3.jpg';
import  image4 from '../../Assets/4.jpg';
import  image5 from '../../Assets/5.jpg';
import  image6 from '../../Assets/6.jpg';
import  image7 from '../../Assets/7.jpg';
import  image8 from '../../Assets/8.jpg';
import  image9 from '../../Assets/9.jpg';
import backgroud from '../../Assets/darkbg.jpg';
import { Grid, Typography } from "@mui/material";
import './style.css';

const Gallery = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
      scrollTrigger: {
        trigger: ".grid-container",
        start: "top top",
        end: () => window.innerHeight * 4,
        scrub: true,
        pin: ".grid",
        anticipatePin: 1
      }
    })
    .set(".gridBlock:not(.centerBlock)", { autoAlpha: 0 })
    .to(".gridBlock:not(.centerBlock)", { duration: 0.1, autoAlpha: 1 }, 0.001)
    .from(".gridLayer", {
      scale: 3.3333,
      ease: "none",
    });

    const images = [image1, image7, image2,image8,image3,image6,image4,image5,image9];
    gsap.set('.gridBlock', { backgroundImage: (i) => `url(${images[i % images.length]})` });

    const bigImg = new Image();
    bigImg.addEventListener("load", function () {
      gsap.to(".centerPiece .gridBlock", { autoAlpha: 1, duration: 0.5 });
    });

    bigImg.src = image1;
  }, []);

  return(
      <div className="grid-container"  
            style={{
              // backgroundImage:`url(${backgroud})`,
              // backgroundSize:'cover',
              // backgroundPosition:'center',
              // backgroundRepeat:'no-repeat',
              backgroundColor: 'black'
            }}
      >
        <div className="grid" >
          <Typography variant="h4" sx={{color:'white', fontFamily:"myCursive"}}>Our Rooms</Typography>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer centerPiece">
            <div className="gridBlock centerBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
          <div className="gridLayer">
            <div className="gridBlock"></div>
          </div>
        </div>
      </div>
  )
}

export default Gallery