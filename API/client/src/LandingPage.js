import React, { Component } from "react";

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
                <div className="row flex-grow-1">
                    <div className="col-lg d-block mx-auto left-col">
                        <h3>Yo</h3>

                    </div>
                    <div className="col-lg d-block mx-auto right-col">
                        <h3>yo                           
                        </h3>
                    </div>
                </div>
            </div>
            </div>
        );
    }


  
}

export default LandingPage;
