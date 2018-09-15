import React, { Component } from 'react';
import {BrowserRouter as Router ,Switch, Route,Link,NavLink} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { withRouter } from "react-router-dom";

class InitPage extends Component {

  
  constructor(props) {
      super(props);
      this.nextPath = this.nextPath.bind(this);
      this.updateState = this.updateState.bind(this);
      this.fillCashierInfo = this.fillCashierInfo.bind(this);

   };
   updateState() {

    this.props.history.push('/loginPage');
   }

   fillCashierInfo() {

    this.props.history.push('/CashierInfo');
   }
    
    nextPath() {
        this.props.history.push('/personalInfo');
    }

  render() {



    return (

        <div className="container">
            <div align='center' style={{margin:'auto'}}>
                <div className="content_div_1">
                    <h2 className="h2style thinner">Lets get your Business On-boarded</h2>
                </div>

                <div className="content_div_1">
                    <h5 className="h2style thin">Select your nature of business</h5>
                </div>

                <div className="row content_div_1">

                    <div className="col-md-6">
                        <div className="contents_bg franchise_div" >

                            <div style={{ marginTop: '5%' }}>
                                <img className="franchImg"  style={{width:'100px',height:'100px'}}></img>
                            </div>

                            <div style={{marginTop:'10%',padding:'10px'}}>
                                <span class="whiteFontWithBlackBorder thicker font_size_large">Franchise</span>
                            </div>


                        </div>

                    </div>
                    <div className="col-md-6" >
                        <div className="contents_bg independent_div" onClick = {() => this.nextPath() }>

                            <div style={{marginTop:'5%'}}>
                                <img className="independentImg"  style={{width:'100px',height:'100px'}}></img>
                            </div>

                            <div style={{marginTop:'10%',padding:'10px'}}>
                                <span class="whiteFontWithBlackBorder thicker font_size_large">Independent</span>
                            </div>


                        </div>

                    </div>
                </div>

                <div className="row content_div_1" >

                    <div className="col-md-5" >

                        <hr style={{backgroundColor: '#ffffff',size:'1px'}}></hr>
                    </div>
                    <div className="col-md-2" style={{textAlign:'center'}}>
                        <span style={{color:'#ffffff',position:'bottom'}} className="whiteFontWithBlackBorder thicker font_size_med">OR</span>

                    </div>
                    <div className="col-md-5" >

                        <hr style={{backgroundColor: '#ffffff',size:'1px'}}></hr>
                    </div>

                </div>

                <div className="row content_div_1" >

                        <div className="col-md-6" >

                            <div className="contents_bg" style={{height:'55px'}} onClick = {() => this.fillCashierInfo() }>

                                <span id='cashier' style={{cursor:'pointer'}} className='typeBtn whiteFontWithBlackBorder thicker font_size_xlarge' >Are you a Cashier?</span>

                            </div>
                        </div>

                        <div className="col-md-6" >

                            <div className="contents_bg" style={{height:'55px'}} onClick = {() => this.updateState() }>

                                <span id='loggedIn'  style={{cursor:'pointer'}}  className='typeBtn whiteFontWithBlackBorder thicker font_size_xlarge' >Already Logged-in?</span>

                            </div>
                        </div>


                </div>
            </div>
        </div>


    );
  }
}

export default withRouter(InitPage);
