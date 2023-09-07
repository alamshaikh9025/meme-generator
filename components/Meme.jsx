import React from "react";

export default function Meme() {

  
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    async function getMemes() {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        setAllMemes(data.data.memes);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  async function downloadMeme() {
    try {
      const memeImageResponse = await fetch(meme.randomImage);
      const memeImageBlob = await memeImageResponse.blob();
  
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
  
      const memeImage = new Image();
      memeImage.src = URL.createObjectURL(memeImageBlob);
  
      memeImage.onload = () => {
        // Set canvas dimensions to match the image
        canvas.width = memeImage.width;
        canvas.height = memeImage.height;
  
        // Draw the meme image onto the canvas
        ctx.drawImage(memeImage, 0, 0);
  
        // Set the font properties
        ctx.font = '50px "impact", sans-serif'; // Font-family and font-size
        ctx.fillStyle = 'white'; // Text color
        ctx.textAlign = 'center'; // Text alignment
  
        // Set border and border-radius properties
        canvas.style.border = '5px solid #D5D4D8';
        canvas.style.borderRadius = '5px';
  
        // Add top text
        ctx.fillText(meme.topText, canvas.width / 2, 60);
  
        // Add bottom text
        ctx.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);
  
        // Convert the canvas content to a data URL
        const dataURL = canvas.toDataURL('image/png');
  
        // Create a temporary link element to trigger the download
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'meme.png';
        a.click();
  
        // Clean up the temporary canvas and link
        document.body.removeChild(canvas);
        document.body.removeChild(a);
      };
    } catch (error) {
      console.error('Error downloading meme:', error);
    }
  }
    
  
  

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" alt="Meme" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
      <div className="download">
        <button className="form--button" onClick={downloadMeme}>
          Download Meme 📥
        </button>
      </div>
    </main>
  );
}
