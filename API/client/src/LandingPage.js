import React, { Component } from "react";
import SplashImage from "./images/splashImage.jpeg";

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }

    render(){
        return(
            <div>
            <div className="container-fluid min-vh-100 d-flex flex-column">
                <div className="row flex-grow-1 landing-row">
                    <div className="col-lg d-block mx-auto left-col">
                        <h1 className="text-left welcome-text">Welcome to Trade<span className="topia-color">Topia</span></h1>
                        <h3 className="text-left second-description-text">A make believe stock trading resource.</h3>
                        <h5 className="text-left description-text">Think of it as a way to practice trading and selling from public companies, but with no strings attached!</h5>
                    </div>
                    <div className="col-lg d-block mx-auto right-col">
                      <img className="splash-image d-block mx-auto" src={SplashImage}/>
                    
                    </div>
                </div>
            </div>
            </div>
        );
    }


  
}

export default LandingPage;
