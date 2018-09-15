import React, { Component } from 'react';
import FloatingLabel from 'floating-label-react'
import { withRouter } from "react-router-dom";
import { makeApiCall } from '../Actions/ApiCalls';

class BusinessInfo extends Component {

  constructor(props) {
      super(props);

      this.state={

          shopName:'',
          shopLicence:'',
          shopGstNumber:'',
          shopPincode:'',
          shopRegion:'',
          loading:true,
          loadingSave:false,
          items:[],
          shopCateIdArray:[],


      };

      ////console.log("personalInfo.userName :: "+this.props.personalInfo.userName);


      this.nextPath = this.nextPath.bind(this);
      this.loadShopCategory = this.loadShopCategory.bind(this);
      this.newCategoryClicked = this.newCategoryClicked.bind(this);
      this.loadShopCategory();

    };

     
     nextPath() {
         //this.props.history.push('/welcomePage');


         //console.log("shopCateIdArray :: "+this.state.shopCateIdArray)

         //this.props.history.push('/welcomePage');
         //this.props.handler('Personal',this.state)

         var shopCateId;
         for(var i=0;i<this.state.shopCateIdArray.length;i++){

             if(i==0){

                 shopCateId = this.state.shopCateIdArray[i];

             }else{

                 shopCateId = shopCateId+"#"+this.state.shopCateIdArray[i];
             }

         }
         //console.log("shopCateId :: "+shopCateId)


         if(this.validate(this.state.shopName,this.state.shopLicence,this.state.shopGstNumber,this.state.shopPincode,this.state.shopRegion,shopCateId)){


             this.setState({

                 loadingSave: true
             })
             makeApiCall("registerNewShop",{
                 "region_name":this.state.shopRegion,
                 "shop_name":this.state.shopName,
                 "shop_category_id":shopCateId,
                 "pincode":this.state.shopPincode,
                 "distibutor_franchise_id":"0",
                 "manufacturer_franchise_id":"0",
                 "licence_number":this.state.shopLicence,
                 "shop_gst_number":this.state.shopGstNumber,
                 "user_password":this.props.personalInfo.userloginPwd,
                 "user_phone":this.props.personalInfo.phone,
                 "user_email":this.props.personalInfo.emailId,
                 "user_address_line1":this.props.personalInfo.addressline1,
                 "user_address_line2":this.props.personalInfo.addressline2,
                 "user_login_id":this.props.personalInfo.userloginId,
                 "user_name":this.props.personalInfo.userName,

             }).then((response)=> response.json())
                 .then((parsedJSON) => {

                     //console.log("loadShopCategory :: "+JSON.stringify(parsedJSON))
                     if(parsedJSON.status == "true"){


                         var user_id = parsedJSON.user_id;
                         var shopUser = parsedJSON.shopUser;
                         var shop_details = parsedJSON.shop_details;
                         var shop_id = parsedJSON.shop_id;
                         var packing_charge = parsedJSON.packing_charge;

                         var is_cashier_flag = shopUser.is_cashier_flag;
                         var user_inventory_perm = shopUser.user_inventory_perm;
                         var user_expense_update_perm = shopUser.user_expense_update_perm;


                         localStorage.setItem("is_cashier_flag",is_cashier_flag);
                         localStorage.setItem("user_inventory_perm",user_inventory_perm);
                         localStorage.setItem("user_expense_update_perm",user_expense_update_perm);

                         localStorage.setItem("user_id",user_id);
                         localStorage.setItem("shop_id",shop_id);
                         localStorage.setItem("packing_charge",packing_charge);
                         localStorage.setItem("shop_name",this.state.shopName);
                         localStorage.setItem("user_name",this.props.personalInfo.userName);
                         localStorage.setItem("user_details",JSON.stringify(shopUser));
                         localStorage.setItem("shop_details",JSON.stringify(shop_details));
                         this.props.setFlags();
                         this.props.history.push('/welcomePage');
                         this.props.handler('Business',this.state)

                         //alert("Successfully registered");


                     }else{

                         alert(parsedJSON.status_desc);

                         this.setState({

                             loadingSave: false
                         })


                     }
                 }).catch(function(e) {
                     //console.error('Error during addNewProductByShop:', e);
                     alert("Unable to save details. Please try again later");
                     this.setState({

                         loadingSave: false
                     })
             });


         }


     }

     validate(shopName,shopLicence,shopGstNumber,shopPincode,shopRegion,shopCateId){

        if(shopName && shopName.length<=50){

            if(shopLicence){

                if(shopGstNumber){


                    if(shopPincode){


                        if(shopRegion && shopRegion.length<=50){


                            if(shopCateId){

                                return true;

                            }else{


                                alert("Please select categories ");
                                return false;
                            }
                        }else{

                            alert("Please enter region less than 50 characters ");
                            return false;

                        }




                    }else{

                        alert("Please enter  pincode ");
                        return false;

                    }



                }else{

                    alert("Please enter shop gst number");
                    return false;

                }



            }else{

                alert("Please enter shop licence");
                return false;

            }


        }else{

            alert("Please enter valid shop name less than 50 characters");
            return false;
        }

     }


    loadShopCategory(){


        makeApiCall("fetchShopCategory",{}).then((response)=> response.json())
            .then((parsedJSON) => {

                //console.log("loadShopCategory :: "+JSON.stringify(parsedJSON))
                if(parsedJSON.status == "true"){


                    var shop_category_list = parsedJSON.shop_category_list;
                    this.setState({

                        loading: false,
                        items:shop_category_list,
                    })

                }else{


                    this.setState({

                        loading: false
                    })


                }
            }).catch(function(e) {
                //console.error('Error during addNewProductByShop:', e);
                alert("Unable to load categories. Please try again later");
                this.setState({

                    loading: false
                })
        });

    }


    newCategoryClicked(e){

        //console.log("categoryClicked : "+e.target.getAttribute('data-key'));
        ////console.log("categoryClicked : "+e.target.getAttribute('data-key'));

        var category_id = e.target.getAttribute('data-key');
        var index = this.state.shopCateIdArray.indexOf(category_id);

        if(index > -1){


            this.state.shopCateIdArray.splice(index, 1);


        }else{

            this.state.shopCateIdArray.push(category_id)
        }
        //console.log("selected_ids : "+this.state.shopCateIdArray);
        /*var selected_ids = this.state.shopCateId;
        if(selected_ids && selected_ids.length>0){

            selected_ids = selected_ids+"#"+category_id;


        }else{

            selected_ids = category_id;
        }

        //console.log("selected_ids : "+selected_ids);

        this.setState({
            shopCateId: selected_ids,
        },() =>{
            //console.log("categoryClicked : "+this.state.shopCateId);
        });*/







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

    return (

    <div className="container">
    
        <div  className="heading" style={{display:'flex',width:'100%',marginLeft: 'auto',marginRight: 'auto'}}>
                
                <div align="center" style={{width:'100%',textAlign:'center',float:'center'}}>
                    <span className="heading_title">2. Business Information</span>
                </div>
                {/* <div align="right" style={{float:'right'}}>
                    <img className="nxt_arw nxt_arwImg" onClick = {() => this.nextPath() }/>
                </div> */}
        </div>
        
        <div className="login_div" style={{background:'#ffffff'}}>
        
            <div className="reg_bg">
                
                <div className="row" style={{marginLeft:'0px'}}>
                    
                    <div className="col-md-7">
        
                        <div style={{marginBottom:'10px',width:'100%'}}>
                            <FloatingLabel
                                id='shopName'
                                name='shopName'
                                placeholder='Enter business shop name'
                                type='text'
                                styles={inputStyle}
                                onChange={(event) => this.setState({shopName: event.target.value})}
                                value = {this.state.shopName}
                            />
                        </div>
        
                        <div style={{marginBottom:'10px',width:'100%'}}>
                            <FloatingLabel
                                id='licenseNumber'
                                name='licenseNumber'
                                placeholder='Enter License Number'
                                type='text'
                                styles={inputStyle}
                                onChange={(event) => this.setState({shopLicence: event.target.value})}
                                value = {this.state.shopLicence}
                            />
                        </div>
        
                        <div style={{marginBottom:'10px',width:'100%'}}>
                            <FloatingLabel
                                id='gstNumber'
                                name='gstNumber'
                                placeholder='Enter GST Number'
                                type='text'
                                styles={inputStyle}
                                onChange={(event) => this.setState({shopGstNumber: event.target.value})}
                                value = {this.state.shopGstNumber}
                            />
                        </div>
        
                        <div style={{marginBottom:'10px',width:'100%'}}>
                            <FloatingLabel
                                id='pincode'
                                name='pincode'
                                placeholder='Enter Pincode of your business'
                                type='number'
                                styles={inputStyle}
                                onChange={(event) => this.setState({shopPincode: event.target.value})}
                                value = {this.state.shopPincode}
                            />
                        </div>
        
                        <div style={{marginBottom:'10px',width:'100%'}}>
                            <FloatingLabel
                                id='region'
                                name='region'
                                placeholder='Enter the Region of your business'
                                type='text'
                                styles={inputStyle}
                                onChange={(event) => this.setState({shopRegion: event.target.value})}
                                value = {this.state.shopRegion}
                            />
                        </div>    
                    </div>

                    <div className="col-md-5">


                        <div className="" style={{marginTop: '2%'}}>

                            <div className="row">
                                <div className="col-md-7">Business Types

                                </div>
                            </div>


                            {this.state.loading == true ?


                                <div className="loader" style={{position:'relative',marginTop:'50%',marginLeft:'25%'}}>
                                    <svg viewBox="0 0 32 32" width="32" height="32" style={{marginLeft:'25%'}}>
                                        <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                    </svg>
                                    <div>Loading Business Types</div>
                                </div>

                            :





                                <div className="box" style={{marginTop: '10px'}}>
                                {this.state.items.length>0 ?

                                    this.state.items.map((menu,index) => (



                                            <label id="brn1" className="container_chk" style={{width:'100%'}}>
                                            {menu.shop_category}
                                                <input type="checkbox"
                                                       id="chk1"
                                                       data-key={menu.shop_category_id}
                                                       onClick={this.newCategoryClicked}

                                                />
                                                <span className="checkmark"></span>
                                            </label>


                                    ))


                                    : <div>No category</div>}
                                </div>




                        }

                        </div>
                        <div className="form-group">
                            
                        </div>

                    </div>
   
                </div>

                <div className="row">
                    <div className="col-md-12" style={{textAlign:'center'}}>
                        {this.state.loadingSave == true  ?

                            <div className="loader" style={{position:'relative'}}>
                                <svg viewBox="0 0 32 32" width="32" height="32">
                                    <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                </svg>
                                <div>Registering details. Please wait </div>
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

export default withRouter(BusinessInfo);
