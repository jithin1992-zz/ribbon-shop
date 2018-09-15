import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { makeApiCall } from '../Actions/ApiCalls';

class LoginPage extends Component {

  constructor(props) {
      super(props);
      this.state={

          username:'',
          password:'',

          loading:false,



      };

      this.login = this.login.bind(this);

    };
    updateState() {
 
    }
     
     login() {


         //this.props.history.replace('/landingPage');



            if(this.state.username){

                if(this.state.password){


                    try {

                        this.setState({

                            loading: true
                        })

                        makeApiCall("loginUser",{"user_id":this.state.username,"user_password":this.state.password}).then((response)=> response.json())
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

                                        loading: false
                                    })


                                }
                            });

                    }catch (e) {

                        //console.error('outside exception:', e);


                    }




                }else{

                    alert("Please enter password")
                }



            }else{

                alert("Please enter username")
            }


     }
   

  render() {

    return (

        <div className="container">
    
            <div class="login_div_centr">
            
                <span class="login_head">Log In to the system</span>
                
                <div class="name_box">
                    <input
                        onChange={(event) => this.setState({username: event.target.value})}
                        value = {this.state.username}
                        type="text" id="user_name" class="fill_data" placeholder="Enter Username"/>
                </div>

                <div class="pwd_box">
                    <input
                        onChange={(event) => this.setState({password: event.target.value})}
                        value = {this.state.password}
                        type="password" id="pwd" class="fill_data" placeholder="Enter Password"/>
                </div>


                {this.state.loading == true  ?

                    <div className="loader" style={{position:'relative',marginTop:'10%'}}>
                        <svg viewBox="0 0 32 32" width="32" height="32">
                            <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                        </svg>
                        <div style={{color:'white'}}>Verifying details. Please wait </div>
                    </div>

                    :

                    <button id="btnLogin" type="button" className="login_button"
                            onClick={() => this.login()}>Login</button>
                }

                {/* <p class="new_reg">New user ? Register</p> */}
            
            </div>
                   
        </div>

    );
  }
}

export default withRouter(LoginPage);
