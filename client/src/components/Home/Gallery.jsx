import { useEffect } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import  image1 from '../../Assets/bg.jpg';
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

    const images = [image1, image1, image1,image1,image1,image1,image1,image1,image1];
    gsap.set('.gridBlock', { backgroundImage: (i) => `url(${images[i % images.length]})` });

    const bigImg = new Image();
    bigImg.addEventListener("load", function () {
      gsap.to(".centerPiece .gridBlock", { autoAlpha: 1, duration: 0.5 });
    });

    bigImg.src = image1;
  }, []);

    // useEffect(() => {
    //   gsap.registerPlugin(ScrollTrigger);
    //   let tl=gsap.timeline();
  
    //   tl.to('.s', {
    //     scrollTrigger: {
    //       trigger: '.grid-container',
    //       start: 'top top',
    //       end: () => window.innerHeight * 4,
    //       scrub: true,
    //       markers: true,
    //       pin: '.grid-container',
          
    //     },
    //     scale: 0.3,
    //     opacity: 0,
    //     duration: 3,
    // });
    //         gsap.fromTo(
    //             '.image-fade-in',
    //             {
    //               opacity: 0,
    //               scale: 0,
    //             },
    //             {
    //               opacity: 1,
    //               scale: 1,
    //               delay:3,
    //               scrollTrigger: {
    //                 trigger: '.image-fade-in',
    //                 start: 'top center',
    //                 scrub: true,
    //                 markers: true,
    //               },
                  
    //               duration: 3,
    //             }
    //           );
        
     
     
    // }, []);
  // return (
  //   <Grid className="grid-container" container style={{backgroundColor:'silver'}}>
       
  //       <Grid item xs={5}className="grid" >
  //       <img src={image1} className="s" alt="Image 1" />
  //       </Grid>
  //     <Grid item xs={12} className="image-fade-in" >
  //       <img src={image1} alt="Image 2"  />
  //     </Grid> 
  //       {/* Your grid elements with the class name "gridBlock" */}
  //     </Grid>
  // )
  return(
      <div className="grid-container"  style={{backgroundColor:'black'}}>
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