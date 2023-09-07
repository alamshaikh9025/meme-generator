import React from "react"
import memeimg from "../images/troll-face.png"

export default function Header() {
    return (
        <header className="header" id="head">
            <a href="#head" >
            <img 
                src={memeimg} 
                className="header--image"
                alt="meme-img"
                
            /></a>
            <h2 className="header--title">Meme Generator</h2>
            <h4 className="header--project"> Alam</h4>
        </header>
    )
}