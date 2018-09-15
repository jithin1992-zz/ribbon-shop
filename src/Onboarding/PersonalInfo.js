import React, { Component } from 'react';
import FloatingLabel from 'floating-label-react'
import { withRouter } from "react-router-dom";
import { makeApiCall } from '../Actions/ApiCalls';

class PersonalInfo extends Component {

  constructor(props) {
      super(props);

      this.state={

          userName:'',
          emailId:'',
          phone:'',
          addressline1:'',
          addressline2:'',
          userloginId:'',
          userloginPwd:'',
          loading:false,

      };


      this.nextPath = this.nextPath.bind(this);

    };
    updateState() {
 
       alert("login")
    }
     
     nextPath() {


         //this.props.history.push('/businessInfo');
         //this.props.handler('Personal',this.state)

         //console.log("userName :: "+this.state.userName);
         if(this.validation(this.state.userName,this.state.emailId,this.state.phone,this.state.addressline1,this.state.addressline2,this.state.userloginId,this.state.userloginPwd)){

             this.setState({

                 loading: true
             })
             makeApiCall("checkUserNameAvailability",{"user_login_id":this.state.userloginId,"user_phone":this.state.phone,"user_email":this.state.emailId}).then((response)=> response.json())
                 .then((parsedJSON) => {

                     //console.log("loadShopCategory :: "+JSON.stringify(parsedJSON))
                     if(parsedJSON.status == "true"){


                         this.setState({

                             loading: false
                         })
                         this.props.handler('Personal',this.state)

                         this.props.history.push('/businessInfo');
                         //alert(parsedJSON.status_desc);


                     }else{

                         alert(parsedJSON.status_desc);

                         this.setState({

                             loading: false
                         })


                     }
                 }).catch(function(e) {
                     //console.error('Error during addNewProductByShop:', e);
                     alert("Unable to check user name availability. Please try again later");
                     this.setState({

                         loading: false
                     })
                 });



         }

     }
   

     validation(userName,emailId,phone,addressline1,addressline2,userloginId,userloginPwd){


        if(userName){


            if(emailId && emailId.length<=50 ){


                if(this.validateEmail(emailId)) {
                    if (phone) {


                        if(this.validatePhone(phone)) {



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


                    } else {


                        alert("Please enter phone");
                        return false;

                    }
                }


            }else{


                alert("Please enter email id less than 50 characters");
                return false;

            }


        }else{


            alert("Please enter name");
            return false;

        }

     }

     validateEmail(mail)
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        alert("You have entered an invalid email address!")
        return (false)
    }

    validatePhone(phone){


        //var pattern = /^\(\d{3}\)\s*\d{3}(?:-|\s*)\d{4}$/
        var a = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(phone);

        if (a) {

            return true;
        }else{

            alert("Please enter a valid phone number without country code")
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



    return (

    <div className="container">
            
            <div  className="heading" style={{display:'flex',width:'100%',marginLeft: 'auto',marginRight: 'auto'}}>
                
                <div align="center" style={{width:'100%',textAlign:'center',float:'center'}}>
                    <span className="heading_title">1. Personal Information</span>
                </div>
                {/* <div align="right" style={{float:'right'}}>
                    <img className="nxt_arw nxt_arwImg" onClick = {() => this.nextPath() }/>
                </div> */}
            </div>
            
            <div className="login_div" style={{background:'#ffffff'}}>

                <div className="reg_bg">

                    <div className="row" style={{marginLeft:'0px'}}>

                        <div className="col-md-7" >
                            
                            <div style={{marginBottom:'10px',width:'100%'}}>
                                <FloatingLabel
                                    id='ownerName'
                                    name='ownerName'
                                    placeholder='Enter Your Name'
                                    type='text'
                                    styles={inputStyle}
                                    onChange={(event) => this.setState({userName: event.target.value})}
                                    value = {this.state.userName}
                                />
                            </div>
                            <div style={{marginBottom:'10px',width:'100%'}}>
                                <FloatingLabel
                                    id='mailId'
                                    name='mailId'
                                    placeholder='Registered Mail Id'
                                    type='text'
                                    styles={inputStyle}
                                    onChange={(event) => this.setState({emailId: event.target.value})}
                                    value = {this.state.emailId}
                                />
                            </div>
                            <div style={{marginBottom:'10px',width:'100%'}}>
                                <FloatingLabel
                                    id='mobNumber'
                                    name='mobNumber'
                                    placeholder='Enter Contact Number'
                                    type='text'
                                    styles={inputStyle}
                                    onChange={(event) => this.setState({phone: event.target.value})}
                                    value = {this.state.phone}
                                />
                            </div>
                            
                            <div style={{marginBottom:'10px',width:'100%'}}>

                                <FloatingLabel
                                    id='address1'
                                    name='address1'
                                    placeholder='Business Address Line1'
                                    type='text'
                                    styles={inputStyle}
                                    onChange={(event) => this.setState({addressline1: event.target.value})}
                                    value = {this.state.addressline1}
                                />
                            </div>
            
                            <div style={{marginBottom:'10px',width:'100%'}}>

                                <FloatingLabel
                                    id='address2'
                                    name='address2'
                                    placeholder='Business Address Line2'
                                    type='text'
                                    styles={inputStyle}
                                    onChange={(event) => this.setState({addressline2: event.target.value})}
                                    value = {this.state.addressline2}
                                />
                            </div>
            
                        </div>

                        <div className="col-md-5">

                            <div style={{marginTop:'3%',marginBottom:'6%'}}>           
                                    <img className="profileImg" width="200" height="200"/> 
                            </div>

                            <div style={{marginBottom:'10px',width:'100%'}}>

                                <div style={{padding:'10px'}}>

                                    <div style={{display:'flex',width:'100%'}}>

                                        <div style={{width:'100%'}}>
                                            <input   onChange={(event) => this.setState({userloginId: event.target.value})}
                                                     value = {this.state.userloginId}  id='username' placeholder="Enter Username" class="font_size_xlarge thick" style={{width:'100%',border:'none',textAlign:'center'}} type="text" name="userName"/>
                                        </div> 
                                        
                                    </div>

                                    <div style={{display:'flex',width:'100%'}}>

                                        <span style={{textAlign:'center',paddingTop:'1px',width:'100%',color:'#3674d4',marginRight:'10px'}} class='font_size_xsmall thinner'>Set Username for logging to application</span>

                                    </div>

                                </div>

                            </div>
                
                            <div style={{marginBottom:'10px',width:'100%'}}>

                                <div style={{padding:'10px'}}>

                                    <div style={{display:'flex',width:'100%'}}>

                                        <div style={{width:'100%'}}>
                                            <input id='password'   onChange={(event) => this.setState({userloginPwd: event.target.value})}
                                                   value = {this.state.userloginPwd}  placeholder="Enter Password" class="font_size_xlarge thick" style={{width:'100%',border:'none',textAlign:'center',}} type="password" name="userName"/>
                                        </div> 
                                        
                                    </div>

                                    <div style={{display:'flex',width:'100%'}}>

                                        <span style={{textAlign:'center',paddingTop:'1px',width:'100%',color:'#3674d4',marginRight:'10px'}} class='font_size_xsmall thinner'>Set Password for logging to application</span>

                                    </div>

                                </div>
                                
                            </div>

                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12" style={{textAlign: 'center',marginTop:'2%'}}>
                            {this.state.loading == true ?

                                <div className="loader" style={{position:'relative'}}>
                                    <svg viewBox="0 0 32 32" width="32" height="32">
                                        <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                    </svg>
                                    <div>Checking username availability</div>
                                </div>

                            :


                                        <button id="btnSave" type="button" className="save_button" onClick = {() => this.nextPath() }>
                                            Save Information
                                        </button>



                            }
                        </div>
                    </div>

                </div>

            </div>
 
    </div>
    );
  }
}

export default withRouter(PersonalInfo);
