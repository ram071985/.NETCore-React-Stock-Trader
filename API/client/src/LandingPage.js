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
                        <h3>Yo</h3>
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
