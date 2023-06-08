import './NavBar.css';
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
    },[]);

    useEffect(()=>{
        isOpen ? tl.current.play() : tl.current.reverse(); 
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
            </div>    
        </>
    )
}

export default NavBar