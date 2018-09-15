import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class WelcomePage extends Component {

  constructor(props) {
      super(props);
      this.nextPath = this.nextPath.bind(this);

    };
    updateState() {
 
       alert("login")
    }
     
     nextPath() {
         //this.props.history.push('/loginPage');
         this.props.history.replace('/landingPage');
     }
   

  render() {

    return (

        <div className="container">
    
            <div className="onboard_div">
                <h1 className="h2style thinner">Welcome On-board!</h1>
            </div>
            
            <div className="onboard_div font_size_med normal">
                <span id="shopName">Shop Name</span>&nbsp;
                <span >has been sucessfully onboarded to the system.</span>
            </div>
            
            <div className="onboard_div" style={{marginTop:'3px',color:'#f7f7f7'}}>
                <h6 className="thinner ">Click below to explore the facilities</h6>
            </div>
        
            
            <div className="row onboard_div" >
                
                <div className="col-md-12" >
                
                    <div className="contents_bg_1 startedBtn_div">
                        
                        <span style={{cursor:'pointer'}} className='startedBtn thicker font_size_large whiteFontWithBlackBorder' onClick = {() => this.nextPath() }>Lets get started</span>
                    
                    </div>
                </div>
            
            </div>
                   
        </div>

    );
  }
}

export default withRouter(WelcomePage);
