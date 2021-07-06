import React from 'react';
import '../styles/landing.css'
import  Header  from './Header';
import SlideShow from './SlideShow'
export const Landing = ()=>{
    const profiles=["https://www.facebook.com/somya.rawat.98","https://www.facebook.com/anuragshashi.pandey","https://www.facebook.com/nehul.soni"];
    const randomElement = profiles[Math.floor(Math.random() * profiles.length)];
    return (
        <div className = "landing ">
           <Header/> 
            <main >
                <div className="bd">
                    <div className = "landing-heading">

                        {/* <img align="middle" className = "landing-logo" src={require('../images/logo.png')} alt=""/>    */}
                        <h1 className = "landing-header">Split expenses with friends.</h1>
                        <p className = "landing-desc"><strong>Share</strong> bills and IOUs. <strong>Make sure</strong> everyone gets paid back.{/* <strong>Totally free</strong> for web*/}</p> 
                        {/* <img className = "landing-big" src={require('../images/dsiplay.png')} alt=""/>    */}
                        <SlideShow/>

                    </div>
                    
                    <div className = "landing-feature">
                        <div>   
                            <img className = "landing-img" src={require('../images/split.png')} alt=""/>   
                        </div>
                        <div className = "landing-content">
                            <h1  >Splitting expenses has </h1><h1>never been easier .</h1> 
                            <ul>
                                <li><i class="fas fa-check-circle"></i> &nbsp;&nbsp;Share bills and IOUs,</li>
                                <li><i class="fas fa-check-circle"></i> &nbsp;&nbsp;Make sure everyone gets paid back,</li>
                                <li><i class="fas fa-check-circle"></i> &nbsp;&nbsp;Split group expenses easily.</li>
                            </ul>

                            <a href="http://localhost:3000/signup">   <button className = "landing-button">  Get Started</button></a>
                        </div>
                    </div> 
                    <div className="landing-foot">
                        <br></br>
                        <h5><a href={randomElement}>Follow </a>the team that made Bisect on Facebook</h5>
                        {/* </br> */}
                    </div>
                </div>
            </main>
        </div>
    )
}