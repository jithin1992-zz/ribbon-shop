import React from 'react';
import FloatingLabel from 'floating-label-react'
import { makeApiCall } from '../Actions/ApiCalls';

import close_blue from '../images/blueCloseBtn.png';

class Cashier extends React.Component {

    constructor() {
        super();
        this.state={

            items:[],
            visibility: false,
            visibilityEdit: false,
            newCashierName:"",
            newCashierPhone:"",
            newCashierEmail:"",
            newCashierLoading:false,
            newCashierLoadingEdit:false,

            selectedCashierId :"",
            selectedCashierEmail:[],
            selectedCashierPhone:"",
            selectedCashierName:"",


        };

         this.loadComponets= this.loadComponets.bind(this);
         this.closeAddCashier= this.closeAddCashier.bind(this);
         this.createNewCashierShop= this.createNewCashierShop.bind(this);
         this.openAddCashier= this.openAddCashier.bind(this);
         this.editCashierData= this.editCashierData.bind(this);
         this.closeEditCashier= this.closeEditCashier.bind(this);
         this.editCashierShop= this.editCashierShop.bind(this);
         //this.loadComponets();

     };


    componentDidMount(){


        try {
            if (localStorage.getItem("myshopcashiers")) {
                var json = localStorage.getItem("myshopcashiers");
                var parsedJSON = JSON.parse(json);

                //console.log("Cashier_ parsedJSON :: " + JSON.stringify(parsedJSON))
                // //console.log("Cashier_ cashierListArray :: " + JSON.stringify(parsedJSON.cashierListArray))

                if (parsedJSON.cashierListArray.length > 0) {


                    //console.log("Cashier_ parsedJSON ::IF :: ")

                    ////console.log("Cashier_ parsedJSON BEF :: " + JSON.stringify(this.state.items))

                    //this.state.items = parsedJSON.cashierListArray;
                    this.setState({


                        items: parsedJSON.cashierListArray,
                    })

                    ////console.log("Cashier_ parsedJSON  AFT:: " + JSON.stringify(this.state.items))


                }


            } else {

                ////console.log("Cashier_ parsedJSON ::ELSE :: ")

                this.setState({

                    items: []
                })

            }
        }catch (e) {

            ////console.log("Cashier_ parsedJSON_Exception :: " + e)

        }

    }


     loadComponets() {

         try {
             if (localStorage.getItem("myshopcashiers")) {
                 var json = localStorage.getItem("myshopcashiers");
                 var parsedJSON = JSON.parse(json);

                 //////console.log("Cashier_ parsedJSON :: " + JSON.stringify(parsedJSON))
                // ////console.log("Cashier_ cashierListArray :: " + JSON.stringify(parsedJSON.cashierListArray))

                 if (parsedJSON.cashierListArray.length > 0) {


                     ////console.log("Cashier_ parsedJSON ::IF :: ")

                     ////console.log("Cashier_ parsedJSON BEF :: " + JSON.stringify(this.state.items))

                     //this.state.items = parsedJSON.cashierListArray;
                     this.setState({


                         items: parsedJSON.cashierListArray,
                     })

                     //console.log("Cashier_ parsedJSON  AFT:: " + JSON.stringify(this.state.items))


                 }


             } else {

                 //console.log("Cashier_ parsedJSON ::ELSE :: ")

                 this.setState({

                     items: []
                 })

             }
         }catch (e) {

             //console.log("Cashier_ parsedJSON_Exception :: " + e)

         }

     }

    closeAddCashier(){

        //console.log("closeAddIngredients");
        this.setState({visibility: false},() => {
        })
    }

    closeEditCashier(){

        //console.log("closeEditCashier");
        this.setState({visibilityEdit: false},() => {
        })
    }
    openAddCashier(){

        //console.log("closeAddIngredients");
        this.setState({visibility: true},() => {
        })
    }


    editCashierData(index){


        //console.log("editCashierData");



        var json = this.state.items[index];

        var selectedCashierEmail_edit  = json.user_email;
        ////console.log("editCashierData selectedCashierEmail_edit :: " + selectedCashierEmail_edit)
        this.state.selectedCashierEmail = selectedCashierEmail_edit;

        this.setState({

            visibilityEdit: true,
            selectedCashierId:json.user_id,
            selectedCashierEmail:selectedCashierEmail_edit,
            selectedCashierPhone:json.user_phone,
            selectedCashierName:json.user_name,


        })

        //console.log("editCashierData_selectedCashierEmail  "+this.state.selectedCashierEmail)


    }


    editCashierShop(){


        var selectedCashierId = this.state.selectedCashierId;
        var selectedCashierEmail= this.state.selectedCashierEmail;
        var selectedCashierPhone= this.state.selectedCashierPhone;
        var selectedCashierName= this.state.selectedCashierName;


        if(selectedCashierName && selectedCashierPhone){

            this.setState({

                newCashierLoadingEdit: true
            })

            makeApiCall("editCashier",{"selectedCashierId":selectedCashierId.toString(),"selectedCashierEmail":selectedCashierEmail,"selectedCashierPhone":selectedCashierPhone,"selectedCashierName":selectedCashierName}).then((response)=> response.json())
                .then((parsedJSON) => {

                    if(parsedJSON.status == "true"){


                        // var json = {};
                        // json["user_id"] = selectedCashierId;
                        // json["address_line1"] = "";
                        // json["address_line2"] = "";
                        // json["user_email"] = selectedCashierEmail;
                        // json["user_name"] = selectedCashierName;
                        // json["user_phone"] = selectedCashierPhone;
                        // json["is_active"] = 0;



                        if(localStorage.getItem("myshopcashiers")){

                            var json_db = localStorage.getItem("myshopcashiers");
                            json_db = JSON.parse(json_db);
                            //json_db.cashierListArray.push(json);
                            //localStorage.setItem("myshopcashiers", JSON.stringify(json_db));
                            var cashierListArray = json_db.cashierListArray;

                            for(var i=0;i<cashierListArray.length;i++){

                                if(cashierListArray[i].user_id==selectedCashierId){

                                    json_db.cashierListArray[i].user_email = selectedCashierEmail;
                                    json_db.cashierListArray[i].user_phone = selectedCashierPhone;
                                    json_db.cashierListArray[i].user_name = selectedCashierName;
                                    localStorage.setItem("myshopcashiers", JSON.stringify(json_db));

                                }
                            }

                        }else{



                        }


                        alert(parsedJSON.status_desc);

                        this.closeEditCashier();
                        this.loadComponets();
                        this.setState({

                            newCashierLoadingEdit: false
                        })
                    }else{


                        alert(parsedJSON.status_desc)
                        this.setState({

                            newCashierLoadingEdit: false
                        })

                    }
                }).catch(function(e) {
                //console.error('Error during addNewProductByShop:', e);
                alert("Unable to update details. Please try again later");
                this.setState({

                    newCashierLoadingEdit: false
                })
            });

        }else{

            alert("Please enter cashier name and phone number")
        }

    }

    createNewCashierShop(){



        //console.log("createNewCashierShop")
        var newCashierName = this.state.newCashierName;
        var newCashierPhone= this.state.newCashierPhone;
        var newCashierEmail= this.state.newCashierEmail;
        var shop_id = localStorage.getItem("shop_id")

        if(newCashierName && newCashierPhone){


            this.setState({

                newCashierLoading: true
            })

            makeApiCall("addShopCashier",{"user_name":newCashierName,"shop_id":shop_id,"user_phone":newCashierPhone,"user_email":newCashierEmail}).then((response)=> response.json())
                .then((parsedJSON) => {

                    if(parsedJSON.status == "true"){


                        var json = {};
                        json["user_id"] = parsedJSON.user_id;
                        json["address_line1"] = "";
                        json["address_line2"] = "";
                        json["user_email"] = newCashierEmail;
                        json["user_name"] = newCashierName;
                        json["user_phone"] = newCashierPhone;
                        json["is_active"] = 0;



                        if(localStorage.getItem("myshopcashiers")){

                            var json_db = localStorage.getItem("myshopcashiers");
                            json_db = JSON.parse(json_db);
                            json_db.cashierListArray.push(json);
                            localStorage.setItem("myshopcashiers", JSON.stringify(json_db));

                        }else{

                            var jsonArray = [];
                            jsonArray[0]=json;
                            localStorage.setItem("myshopcashiers", JSON.stringify(jsonArray));

                        }


                        alert(parsedJSON.status_desc);

                        this.closeAddCashier();
                        this.loadComponets();
                        this.setState({

                            newCashierLoading: false
                        })
                    }else{


                        alert(parsedJSON.status_desc)
                        this.setState({

                            newCashierLoading: false
                        })

                    }
                }).catch(function(e) {
                //console.error('Error during addNewProductByShop:', e);
                alert("Unable to save product now. Please try again later");
                this.setState({

                    newCashierLoading: false
                })
            });


        }else{

            alert("Please enter cashier name and phone number")
        }

    }

    render() {


         var visibility = "dialog-container-invisible";
         var visibilityEdit = "dialog-container-invisible";

         if (this.state.visibility) {
             visibility = "dialog-container-visible";
         }else{
             visibility = "dialog-container-invisible";
         }

        if (this.state.visibilityEdit) {
            visibilityEdit = "dialog-container-visible";
         }else{
            visibilityEdit = "dialog-container-invisible";
         }

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
                width: '100%',
            },
            label: {
                marginTop: '.5em',
                width: '100%'
            },
            height:'100%'
        }



        return (
        <div>
            <div class="row form_rgt2 ">


                    <div class="col-md-7"><p class="add_prd">My Cashiers</p></div>
                    <div class="col-md-5">
                        <div id="btnAddType" class="blue_button2 font_size_small" onClick={() => this.openAddCashier()} style={{marginTop: '12px'}}>
                            Add Cashier
                        </div>
                    </div>

                    <div class="cashier_row_wrapper">
                        <div class="cashier_row">

                            {this.state.items.length>0 ?

                                this.state.items.map((menu,index) => (
                                    <div className="cashier_box nopadding">
                                        <div style={{height: '100%', verticalAlign: 'middle', textAlign: 'center'}}
                                             className="card card2 ">
                                            <span id="itemId" className="thin blackFont">{menu.user_name}</span>{menu.is_active==0?<div style={{color:'red',fontSize:'11px'}}>(INACTIVE)</div> :<div style={{color:'green',fontSize:'11px'}}>(ACTIVE)</div>}
                                            <span id="itemname" className=" thin blackFont">{menu.user_email}</span>
                                            <span id="itemDesc" className="thick blueFont">+{menu.user_phone}</span>
                                            <span className="row edit" style={{marginTop: '12px'}}>
                                            <div className="col-md-6" onClick={() => this.editCashierData(index)}><p className="thick">Edit</p> </div>
                                            <div className="col-md-6"><p className="thin redFont">Delete</p></div>
                                        </span>
                                        </div>
                                    </div>
                                ))


                                : <div>No cashier</div>}






                        </div>

                    </div>



            </div>


            <div className={visibility}>

                <div className="dialog">

                        {this.state.newCashierLoading== true ?


                            <div className="loader">
                                <svg viewBox="0 0 32 32" width="32" height="32">
                                    <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                </svg>
                            </div>

                        :


                            <div style={{padding:'0px'}}>
                                <div className="dialog-title font_size_med thin blueFont">
                                    <span>New Cashier</span>
                                    <div align='right'
                                         style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}}>
                                        <img src={close_blue} className='xsmall_icon_unpadded'
                                             onClick={() => this.closeAddCashier()}/>
                                    </div>
                                </div>

                                <div className="" style={{marginTop: '10px'}}>



                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                        <div style={{marginBottom:'10px',width:'100%'}}>
                                            <div
                                                style={{color: '#41bb68', paddingBottom: '10px',fontSize:'15px'}}> *Please provide cashier contact details. We will send an OTP for verification. Please make sure mobile number is valid
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                        <div style={{marginBottom:'10px',width:'100%'}}>
                                            <FloatingLabel
                                                id='newCashierName'
                                                name='newCashierName'
                                                placeholder='Enter Cashier Name'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(event) => this.setState({newCashierName: event.target.value})}
                                                value = {this.state.newCashierName}
                                            />
                                        </div>

                                    </div>



                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                        <div style={{marginBottom:'10px',width:'100%'}}>
                                            <FloatingLabel
                                                id='newCashierPhone'
                                                name='newCashierPhone'
                                                placeholder='Enter Cashier Phone Number'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(event) => this.setState({newCashierPhone: event.target.value})}
                                                value = {this.state.newCashierPhone}
                                            />
                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                        <div style={{marginBottom:'10px',width:'100%'}}>
                                            <FloatingLabel
                                                id='newCashierEmail'
                                                name='newCashierEmail'
                                                placeholder='Enter Cashier Email'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(event) => this.setState({newCashierEmail: event.target.value})}
                                                value = {this.state.newCashierEmail}
                                            />
                                        </div>

                                    </div>






                                    <div className="row">
                                        <div id="btnAddType" style={{cursor:'pointer'}} className="aqua_blue_button font_size_small" onClick={() => this.createNewCashierShop()}>Update Cashier</div>
                                    </div>

                                </div>
                            </div>


                        }

                </div>

            </div>
            <div className={visibilityEdit}>

                <div className="dialog">

                        {this.state.newCashierLoadingEdit== true ?


                            <div className="loader">
                                <svg viewBox="0 0 32 32" width="32" height="32">
                                    <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                </svg>
                            </div>

                        :


                            <div style={{padding:'0px'}}>
                                <div className="dialog-title font_size_med thin blueFont">
                                    <span>Edit Cashier Details</span>
                                    <div align='right'
                                         style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}}>
                                        <img src={close_blue} className='xsmall_icon_unpadded'
                                             onClick={() => this.closeEditCashier()}/>
                                    </div>
                                </div>

                                <div className="" style={{marginTop: '10px'}}>




                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                        <div style={{marginBottom:'10px',width:'100%'}}>
                                            <FloatingLabel
                                                key={Math.random()}
                                                id='newCashierName'
                                                name='newCashierName'
                                                placeholder='Enter Cashier Name'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(event) => this.setState({selectedCashierName: event.target.value})}
                                                value = {this.state.selectedCashierName}
                                            />
                                        </div>

                                    </div>



                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                        <div style={{marginBottom:'10px',width:'100%'}}>
                                            <FloatingLabel
                                                key={Math.random()}
                                                id='newCashierPhone'
                                                name='newCashierPhone'
                                                placeholder='Enter Cashier Phone Number'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(event) => this.setState({selectedCashierPhone: event.target.value})}
                                                value = {this.state.selectedCashierPhone}
                                            />
                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                        <div style={{marginBottom:'10px',width:'100%'}}>
                                            <FloatingLabel
                                                key={Math.random()}
                                                id='newCashierEmail'
                                                name='newCashierEmail'
                                                placeholder='Enter Cashier Email'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(event) => this.setState({selectedCashierEmail: event.target.value})}
                                                value = {this.state.selectedCashierEmail}
                                            />
                                        </div>

                                    </div>






                                    <div className="row">
                                        <div id="btnAddType" style={{cursor:'pointer'}} className="aqua_blue_button font_size_small" onClick={() => this.editCashierShop()}>Update Cashier</div>
                                    </div>

                                </div>
                            </div>


                        }

                </div>

            </div>
        </div>

        
        );
     }

    }

    export default Cashier;