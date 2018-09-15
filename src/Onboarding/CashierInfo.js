import React, { Component } from 'react';
import FloatingLabel from 'floating-label-react'
import { withRouter } from "react-router-dom";
import { makeApiCall } from '../Actions/ApiCalls';

class CashierInfo extends Component {

  constructor(props) {
      super(props);

      this.state={

          visibility : true,
          visibilityDetails : false,

          shop_id:'',
          user_email:'',
          user_phone:'',
          shop_name:'',
          user_name:'',
          staff_id:'',
          otp:'',
          loading:false,
          loadingAdd:false,
          verifyOtp:false,
          addressline1:'',
          addressline2:'',
          userloginId:'',
          userloginPwd:'',



      };

      this.VerifyOTP = this.VerifyOTP.bind(this);
      this.addInfo = this.addInfo.bind(this);


    };


    addInfo(){


        if(this.validate(this.state.addressline1,this.state.addressline2,this.state.userloginId,this.state.userloginPwd)){


            makeApiCall("addCashierDetails",{"user_password":this.state.userloginPwd,"user_address_line1":this.state.addressline1,"user_address_line2":this.state.addressline2,"user_login_id":this.state.userloginId,"user_id":this.state.staff_id}).then((response)=> response.json())
                .then((parsedJSON) => {

                    //console.log("loginUser :: "+JSON.stringify(parsedJSON))
                    if(parsedJSON.status == "true"){


                        var user_id = parsedJSON.user_id;
                        var shopUser = parsedJSON.shopUser;
                        var is_cashier_flag = shopUser.is_cashier_flag;
                        var user_inventory_perm = shopUser.user_inventory_perm;
                        var user_expense_update_perm = shopUser.user_expense_update_perm;
                        var shop_details = parsedJSON.shop_details;
                        var shop_id = parsedJSON.shop_id;
                        var packing_charge = parsedJSON.packing_charge;
                        var shopName = parsedJSON.shopName;
                        var userName = parsedJSON.userName;
                        localStorage.setItem("user_id",user_id);
                        localStorage.setItem("shop_id",shop_id);
                        localStorage.setItem("packing_charge",packing_charge);
                        localStorage.setItem("is_cashier_flag",is_cashier_flag);
                        localStorage.setItem("user_inventory_perm",user_inventory_perm);
                        localStorage.setItem("user_expense_update_perm",user_expense_update_perm);
                        localStorage.setItem("shop_name",shopName);
                        localStorage.setItem("user_name",userName);
                        localStorage.setItem("user_details",JSON.stringify(shopUser));
                        localStorage.setItem("shop_details",JSON.stringify(shop_details));
                        this.props.setFlags();

                        this.props.history.replace('/landingPage');
                        //this.props.handler('Business',this.state)

                        //alert("Successfully registered");


                    }else{

                        alert(parsedJSON.status_desc);

                        this.setState({

                            loadingSave: false
                        })


                    }
                }).catch(function(e) {
                //console.error('Error during loginUser:', e);
                alert("Unable to login. Please try again later");
                this.setState({

                    loadingSave: false
                })
            });


        }

    }

    validate(addressline1,addressline2,userloginId,userloginPwd){


        if (addressline1 && addressline1.length<=100) {


            if (addressline2 && addressline2.length<=100) {

                if (userloginId) {

                    if(userloginId.length<=20) {

                        if (userloginPwd) {


                            if (userloginPwd.length <= 10) {

                                return true;

                            } else {


                                alert("Password should be less than 10 characters");
                                return false;

                            }

                        } else {


                            alert("Please enter login password");
                            return false;

                        }
                    }else{

                        alert("User name should be less than 20 characters");
                        return false;


                    }


                } else {


                    alert("Please enter login id");
                    return false;

                }


            } else {


                alert("Please enter valid address line2 less than 100 characters");
                return false;

            }


        } else {


            alert("Please enter valid address line1 less than 100 characters");
            return false;

        }

    }
    VerifyOTP(){

        if(this.state.otp){

                this.setState({

                    verifyOtp: true
                })
                makeApiCall("verifyCashierOtp",{"otp":this.state.otp})
                .then((response)=> response.json())
                .then((parsedJSON) => {

                    //console.log("verifyCashierOtp :: "+JSON.stringify(parsedJSON))
                    if(parsedJSON.status == "true"){


                        var shop_id  = parsedJSON.shop_id;
                        var user_email  = parsedJSON.user_email;
                        var user_phone  = parsedJSON.user_phone;
                        var shop_name  = parsedJSON.shop_name;
                        var user_name  = parsedJSON.user_name;
                        var staff_id  = parsedJSON.staff_id;

                        this.setState({

                            verifyOtp: false,
                            shop_id:shop_id,
                            user_email:user_email,
                            user_phone:user_phone,
                            shop_name:shop_name,
                            user_name:user_name,
                            staff_id:staff_id,
                            visibility:false,
                            visibilityDetails:true,

                        })



                    }else{

                        alert(parsedJSON.status_desc);

                        this.setState({

                            verifyOtp: false
                        })


                    }
                }).catch(function(e) {
                //console.error('Error during addNewProductByShop:', e);
                alert("Unable to check user name availability. Please try again later");
                this.setState({

                    verifyOtp: false
                })
            });
        }else{

            alert("Please enter OTP")
        }

    }

  render() {
      
      const inputStyle = {
            floating: {
              color: '#3674d4'
            },
            focus: {
              borderColor: '#3674d4',
            },
            input: {
              borderBottomWidth: 1,
              borderBottomColor: '#ebf5fc',
              width: '100%'
            },
            label: {
              marginTop: '.5em',
              width: '100%'
            },
            height:'100%'
          }

        /*const divStyle = {
            height : this.props.dimensions.height-80+'px',
            background : '#ffffff'
        }*/


      var visibility = "dialog-container-invisible";

      if (this.state.visibility) {
          visibility = "dialog-container-visible";
      }else{
          visibility = "dialog-container-invisible";
      }

      var visibilityDetails = "dialog-container-invisible";

      if (this.state.visibilityDetails) {
          visibilityDetails = "dialog-container-visible";
      }else{
          visibilityDetails = "dialog-container-invisible";
      }




      return (



          <div>

              <div className={visibility} >

                  <div className="container">

                      <div className="heading"
                           style={{display: 'flex', width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>

                          <div align="center" style={{width: '100%', textAlign: 'center', float: 'center'}}>
                              <span className="heading_title">1. Verification</span>
                          </div>

                      </div>

                      <div className="login_div" style={{background: '#ffffff'}}>

                          <div className="reg_bg">

                              <div>

                                  Please enter the OTP you have received, when shop manager/owner register your details as shop cashier
                              </div>
                              <div className="row" style={{marginLeft: '0px'}}>

                                  <div className="col-md-12">

                                      <div style={{marginBottom: '10px', width: '100%'}}>
                                          <FloatingLabel
                                              id='ownerName'
                                              name='ownerName'
                                              placeholder='Enter Your OTP'
                                              type='text'
                                              styles={inputStyle}
                                              onChange={(event) => this.setState({otp: event.target.value})}
                                              value={this.state.otp}
                                          />
                                      </div>


                                  </div>



                              </div>

                              <div className="row">
                                  <div className="col-md-12" style={{textAlign: 'center', marginTop: '2%'}}>
                                      {this.state.verifyOtp == true ?

                                          <div className="loader" style={{position: 'relative'}}>
                                              <svg viewBox="0 0 32 32" width="32" height="32">
                                                  <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                              </svg>
                                              <div>Verifying OTP. Please wait</div>
                                          </div>

                                          :


                                          <button id="btnSave" type="button" className="save_button"
                                                  onClick={() => this.VerifyOTP()}>
                                             Next
                                          </button>


                                      }
                                  </div>
                              </div>

                          </div>

                      </div>

                  </div>

              </div>
              <div className={visibilityDetails} >


                  <div className="container">

                      <div className="heading"
                           style={{display: 'flex', width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>

                          <div align="center" style={{width: '100%', textAlign: 'center', float: 'center'}}>
                              <span className="heading_title">2. Personal Information</span>
                          </div>

                      </div>

                      <div className="login_div" style={{background: '#ffffff'}}>

                          <div className="reg_bg">

                              <div className="row" style={{marginLeft: '0px'}}>

                                  <div className="col-md-7">



                                      <div style={{marginBottom: '10px', width: '100%'}}>

                                          <FloatingLabel
                                              key={Math.random()}
                                              readOnly={true}
                                              id='address1'
                                              name='address1'
                                              placeholder='Shop Name'
                                              type='text'
                                              styles={inputStyle}
                                              value={this.state.shop_name}
                                          />
                                      </div>


                                      <div style={{marginBottom: '10px', width: '100%'}}>

                                          <FloatingLabel
                                              key={Math.random()}
                                              readOnly={true}
                                              id='address1'
                                              name='address1'
                                              placeholder='Full Name'
                                              type='text'
                                              styles={inputStyle}
                                              value={this.state.user_name}
                                          />
                                      </div>



                                      <div style={{marginBottom: '10px', width: '100%'}}>

                                          <FloatingLabel
                                              id='address1'
                                              name='address1'
                                              placeholder='Business Address Line1'
                                              type='text'
                                              styles={inputStyle}
                                              onChange={(event) => this.setState({addressline1: event.target.value})}
                                              value={this.state.addressline1}
                                          />
                                      </div>

                                      <div style={{marginBottom: '10px', width: '100%'}}>

                                          <FloatingLabel
                                              id='address2'
                                              name='address2'
                                              placeholder='Business Address Line2'
                                              type='text'
                                              styles={inputStyle}
                                              onChange={(event) => this.setState({addressline2: event.target.value})}
                                              value={this.state.addressline2}
                                          />
                                      </div>

                                  </div>

                                  <div className="col-md-5">

                                      <div style={{marginTop: '3%', marginBottom: '6%'}}>
                                          <img className="profileImg" width="200" height="200"/>
                                      </div>

                                      <div style={{marginBottom: '10px', width: '100%'}}>

                                          <div style={{padding: '10px'}}>

                                              <div style={{display: 'flex', width: '100%'}}>

                                                  <div style={{width: '100%'}}>
                                                      <input
                                                          onChange={(event) => this.setState({userloginId: event.target.value})}
                                                          value={this.state.userloginId} id='username'
                                                          placeholder="Enter Username"
                                                          className="font_size_xlarge thick"
                                                          style={{width: '100%', border: 'none', textAlign: 'center'}}
                                                          type="text" name="userName"/>
                                                  </div>

                                              </div>

                                              <div style={{display: 'flex', width: '100%'}}>

                                                  <span style={{
                                                      textAlign: 'center',
                                                      paddingTop: '1px',
                                                      width: '100%',
                                                      color: '#3674d4',
                                                      marginRight: '10px'
                                                  }} className='font_size_xsmall thinner'>Set Username for logging to application</span>

                                              </div>

                                          </div>

                                      </div>

                                      <div style={{marginBottom: '10px', width: '100%'}}>

                                          <div style={{padding: '10px'}}>

                                              <div style={{display: 'flex', width: '100%'}}>

                                                  <div style={{width: '100%'}}>
                                                      <input id='password'
                                                             onChange={(event) => this.setState({userloginPwd: event.target.value})}
                                                             value={this.state.userloginPwd}
                                                             placeholder="Enter Password"
                                                             className="font_size_xlarge thick" style={{
                                                          width: '100%',
                                                          border: 'none',
                                                          textAlign: 'center',
                                                      }} type="password" name="userName"/>
                                                  </div>

                                              </div>

                                              <div style={{display: 'flex', width: '100%'}}>

                                                  <span style={{
                                                      textAlign: 'center',
                                                      paddingTop: '1px',
                                                      width: '100%',
                                                      color: '#3674d4',
                                                      marginRight: '10px'
                                                  }} className='font_size_xsmall thinner'>Set Password for logging to application</span>

                                              </div>

                                          </div>

                                      </div>

                                  </div>

                              </div>

                              <div className="row">
                                  <div className="col-md-12" style={{textAlign: 'center', marginTop: '2%'}}>
                                      {this.state.loadingAdd == true ?

                                          <div className="loader" style={{position: 'relative'}}>
                                              <svg viewBox="0 0 32 32" width="32" height="32">
                                                  <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                              </svg>
                                              <div>Saving your details. Please wait</div>
                                          </div>

                                          :


                                          <button id="btnSave" type="button" className="save_button"
                                                  onClick={() => this.addInfo()}>
                                              Save Information
                                          </button>


                                      }
                                  </div>
                              </div>

                          </div>

                      </div>

                  </div>


              </div>
          </div>




    );
  }
}

export default withRouter(CashierInfo);
