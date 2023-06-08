import './NavBar.css';
import homeImg  from '../../Assets/homeIndicator.png';
import bg from '../../Assets/bg.jpg';
import React, { useState, useEffect, useRef } from 'react';
import {gsap} from 'gsap';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const tl = useRef();

    useEffect(()=>{
        tl.current = gsap.timeline({
            paused:true,
        });

        tl.current.to('.menu',{
            top:0,
            ease:'bounce.out',
            duration: 1,
        });
        tl.current.to(".line1", {
            y : 9,
            rotate:'45',
            duration: 0.5,
            width : '100%'
          },
            '='
          );
        tl.current.to(".line2", {
            y: -9,
            rotate: '-45',
            duration: 0.5,
          },
            '='
          );
        tl.current.from('.menu__item',{
            opacity:0,
            y:'-100vh',
            ease : 'elastic',
            stagger:0.1,
            duration:1,
        })
    },[]);

    useEffect(()=>{
        if(isOpen){
            tl.current.play();
            document.body.style.overflow = 'hidden';
        }else{
            tl.current.reverse();
            document.body.style.overflow = 'auto';
        }
        // isOpen ? (tl.current.play(),document.body.style.overflow = 'hidden') : tl.current.reverse(); 
    },[isOpen])
    
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
  
    return (
        <>
            <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="line line1"></div>
                <div className="line line2"></div>  
            </div>
            <div className="menu">
                <div className="menu__item">
                        <h3 className="menu__item-link" style={{color:'white'}}>Home</h3>
                        <img className="menu__item-img" src={homeImg} />
                        <div className="marquee">
                            <div className="marquee__inner" >
                                <span>Home - Home - Home - Home - Home - Home - Home</span>
                            </div>
                        </div>
                </div>
                <div className="menu__item">
                        <h3 className="menu__item-link" style={{color:'white'}}>Gallery</h3>
                        <img className="menu__item-img" src={bg} />
                        <div className="marquee">
                            <div className="marquee__inner" >
                                <span>Gallery - Gallery - Gallery - Gallery - Gallery - Gallery - Gallery</span>
                            </div>
                        </div>
                </div>
                <div className="menu__item">
                        <h3 className="menu__item-link" style={{color:'white'}}>Reserve</h3>
                        <img className="menu__item-img" src={bg} />
                        <div className="marquee">
                            <div className="marquee__inner" >
                                <span>Reserve - Reserve - Reserve - Reserve - Reserve - Reserve - Reserve</span>
                            </div>
                        </div>
                </div>
                <div className="menu__item">
                        <h3 className="menu__item-link" style={{color:'white'}}>Log-In</h3>
                        <img className="menu__item-img" src={bg} />
                        <div className="marquee">
                            <div className="marquee__inner" >
                                <span>Log-In - Log-In - Log-In - Log-In - Log-In - Log-In - Log-In</span>
                            </div>
                        </div>
                </div>
            </div>    
        </>
    )
}

export default NavBar