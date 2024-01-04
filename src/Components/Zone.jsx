import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import '../Styles/Zone.css'
import live from '../Images/live.svg'
import zone1 from '../Images/zone1.jpg'

const Zone = ({ zone }) => {
  const [divName, setDivName] = useState("zone served");
  const [imageData, setImageData] = useState('');
  
  const markAsServed = () => {
    if (divName === "zone served") {
      setDivName("zone unserved");
    } else {
      setDivName("zone served");
    }
  }

  const fetchImage = async () => {
    axios.get('http://localhost:3001/api/get_image')
      .then(response => {
        // Mettre à jour l'état avec les données de l'image
        setImageData(response.data.imageData);
      })
      .catch(error => {});
    };

    const predict = async () => {
        try {
          const response = await axios({
            method: "POST",
            url: "https://detect.roboflow.com/restaurant-service-optimiser/3",
            params: {
              api_key: "HESTbC6CdHkfH1skznSy"
            },
            data: imageData,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          });
          console.log(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchImage();
            predict();
        }, 1000); // Fetch image every 1 milisecond
        
        return () => clearInterval(interval);
        }, []);

  // Fonction pour décoder l'image encodée en base64
  const decodeImage = (base64String) => {
    const decodedImage = atob(base64String);
    const uint8Array = new Uint8Array(decodedImage.length);
    for (let i = 0; i < decodedImage.length; i++) {
      uint8Array[i] = decodedImage.charCodeAt(i);
    }
    return URL.createObjectURL(new Blob([uint8Array], { type: 'image/png' }));
  };



  /*
  const fetchImage = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get_image')
      //console.log(response);
      const current_image = response.data;
      setImage(current_image);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchImage();
    }, 1000); // Fetch image every 1 second

    return () => clearInterval(interval);
  }, []);

  */


  return (
    <div className={divName}>
        <h1 id="zone-name">{"Zone " + zone.number}</h1>
        <img id="live-icon" src={live} alt="Live" />
        <img id="zone-img" src={decodeImage(imageData)} alt="Zone" />
        <div className='buttons'>
            <button className='btn' id='view-btn'>View Zone</button>
            <button className='btn' id='mark-btn' onClick={markAsServed}>Mark as served</button>
        </div>
    </div>
  )
}

export default Zone
