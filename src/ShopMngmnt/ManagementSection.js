import React from 'react';
import FloatingLabel from 'floating-label-react'
import Cashier from './Cashier';
import Ingredients from './Ingredients';
import Categories from './Categories';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import { makeApiCall } from '../Actions/ApiCalls';
import NewItem from './NewItem';

import close from "../images/close-button.svg";
import close_blue from '../images/blueCloseBtn.png';

class ManagementSection extends React.Component {

    constructor() {
        super();
        this.state={
            selectedStock : [],
            active : 'NEW_ENTRY_PAGE'

        };

         this.handleToggle= this.handleToggle.bind(this);
         this.updateValue= this.updateValue.bind(this);
         this.updateShopUi= this.updateShopUi.bind(this);
         //this.togglePopup= this.togglePopup.bind(this);
     };

     componentWillReceiveProps(nextProps){
        this.setState({
            active: nextProps.page,       
        },() => {
            //console.log("componentWillReceiveProps(nextProps)"+this.state.active);
         }) 
     }



     handleToggle(page) {
        //var active = this.state.active;
        //console.log("handleToggle(page)"+page);

        var active = page;
        var newActive = active === 'UPDATE_PAGE' ? 'NEW_ENTRY_PAGE' : 'UPDATE_PAGE';
        this.setState({active: newActive},() => {
            this.props.handler(this.state.active)
         }) 
    }


    updateValue (newValue) {
        this.setState({
            selectValue: newValue,
        });
    }

    // togglePopup(visibility) {
    //
    //     this.props.toggle(visibility)
    // }

    updateShopUi(){

        //console.log("updateShopUi (ManagementSection)")

        this.props.updateShopUi();
    }

     render() {

        var active = this.state.active;

        return (

            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 nopadding" >

                { active === 'UPDATE_PAGE' ? (
                        <ViewEditItem
                            dimen={this.props.data}
                            wholeMenuItems={this.props.wholeMenuItems}
                            category={this.props.category}
                            item={this.props.item}
                            toggleHandler={this.handleToggle}
                            updateShopUi={this.updateShopUi}
                        />

                    ) : active === 'NEW_ENTRY_PAGE' ? (
                        <NewItem
                            // popupHandler={this.togglePopup}
                            updateShopUi={this.updateShopUi}
                            dimen={this.props.data}
                            wholeMenuItems={this.props.wholeMenuItems}
                        />
                    ) : null
                }
                <Cashier/>

            </div>
        
        );
     }

    }

    class ViewEditItem extends React.Component {

        constructor(props){
            super(props)
            this.state={
                items : [],
                active : 'CATEGORY_PAGE',
                selectedMenuItemID : [],
                selectedMenuItemName : [],
                selectedMenuItemPrice : [],
                selectedMenuItemDesc : [],
                selectedMenuItemIngredients : [],
                selectedMenuItemCategory : [],
                selectedMenuItemCalType : [],
                selectedMenuItemIsShowMenu:'',

                visibilityAdd:false,
                deleteIngredietnsLoad:false,
                updateProLoad:false,
                addNewIngLoad:false,

                newIngItemCount:'',
                newIngItemIndex:'',
                newIngCalType:'',
                optionsNewInG:[],


            };

            this.toggleClickHandler= this.toggleClickHandler.bind(this);
            this.viewHandler = this.viewHandler.bind(this);
            this.closeAddIngredients= this.closeAddIngredients.bind(this);
            this.saveThisIngredient= this.saveThisIngredient.bind(this);
            this.addIngredients= this.addIngredients.bind(this);
            this.updateValue= this.updateValue.bind(this);
            this.changeselectedMenuItemCalTypeIng= this.changeselectedMenuItemCalTypeIng.bind(this);
            this.removeThisIngredient= this.removeThisIngredient.bind(this);
            this.updateProductInfo= this.updateProductInfo.bind(this);
            this.showToMenuFlagSet= this.showToMenuFlagSet.bind(this);

        }


        showToMenuFlagSet(){

            if(this.state.selectedMenuItemIsShowMenu =="1"){

                this.setState({selectedMenuItemIsShowMenu: "0"},() => {
                })

            }else{

                this.setState({selectedMenuItemIsShowMenu: "1"},() => {
                })

            }

        }
        componentDidMount(){

            //console.log("PAGE: ViewEditItem")

            this.setState({

                selectedMenuItemID: this.props.item.subItemID,
                selectedMenuItemName: this.props.item.name,
                selectedMenuItemPrice: this.props.item.price,
                selectedMenuItemDesc: this.props.item.desc,
                selectedMenuItemIngredients: this.props.item.calculation_products_json,
                selectedMenuItemCategory: this.props.category,
                selectedMenuItemCalType: this.props.item.cal_type,
                selectedMenuItemIsShowMenu: this.props.item.is_show_to_menu
            }, () => {
                //console.log("##### selected item _ managementSection"+this.state.selectedMenuItemName);

                //this.props.setData({ ingredients: this.state.selectedMenuItemIngredients })
                ////console.log("ingredients data :: " + this.state.selectedMenuItemIngredients);
                ////console.log("show ingredients section ");

                this.viewHandler('SHOW_INGREDIENTS');

            })

        }

        componentWillReceiveProps(nextProps){
            //console.log("selected item _ managementSection"+JSON.stringify(nextProps.item));
           // //console.log("selected item _ cal_type"+nextProps.item.cal_type);
            if(nextProps.item) {
                this.setState({

                    selectedMenuItemID: nextProps.item.subItemID,
                    selectedMenuItemName: nextProps.item.name,
                    selectedMenuItemPrice: nextProps.item.price,
                    selectedMenuItemDesc: nextProps.item.desc,
                    selectedMenuItemIngredients: nextProps.item.calculation_products_json,
                    selectedMenuItemCategory: nextProps.category,
                    selectedMenuItemCalType: nextProps.item.cal_type,
                    selectedMenuItemIsShowMenu:nextProps.item.is_show_to_menu,
                }, () => {
                    ////console.log("selected item _ managementSection"+this.state.selectedMenuItemCalType);

                    //this.props.setData({ ingredients: this.state.selectedMenuItemIngredients })
                    //console.log("ingredients data :: " + this.state.selectedMenuItemIngredients);
                    //console.log("show ingredients section ");

                    this.viewHandler('SHOW_INGREDIENTS');

                })
            }else{

                //this.toggleClickHandler();
            }
        }

        toggleClickHandler(){

            this.setState({page: 'NEW_ENTRY_PAGE'},() => {
                this.props.toggleHandler(this.state.page);
            })  
    
        }



        updateProductInfo(){


            var shop_id = localStorage.getItem("shop_id")

            this.setState({

                updateProLoad: true
            })


            makeApiCall("updateShopMenuproducts",{"name":this.state.selectedMenuItemName,"cal_type":this.state.selectedMenuItemCalType,"is_show_to_menu":this.state.selectedMenuItemIsShowMenu,"pro_id":this.state.selectedMenuItemID,"shop_id":shop_id,"product_price":this.state.selectedMenuItemPrice}).then((response)=> response.json())
                .then((parsedJSON) => {


                    //console.log("updateShopMenuproducts :res "+parsedJSON)
                    if(parsedJSON.status == "true"){



                        /*var  category_id =  parsedJSON.category_id;


                        alert(parsedJSON.status_desc);

                        if (localStorage.getItem("todaysmenu")) {



                            var json = localStorage.getItem("todaysmenu");

                            json = JSON.parse(json);
                            var results = json.results;
                            for (var i = 0; i < results.length; i++) {

                                if (results[i].itemID == category_id) {


                                    //matchFound = true;
                                    //console.log("addShopMenuproducts _ matchFound :: ")

                                    // json.results[i].subCategory.push(prodct_list);
                                    // //console.log("addShopMenuproducts _ json :: " + JSON.stringify(json))
                                    //
                                    // localStorage.setItem("todaysmenu", JSON.stringify(json));

                                    for(var j=0;j<results[i].subCategory.length;j++){

                                        if(results[i].subCategory[j].subItemID==this.state.selectedMenuItemID){


                                            //results[i].subCategory[j].calculation_products_json = [];
                                            results[i].subCategory[j].price = this.state.selectedMenuItemPrice;
                                            ////console.log("shop menu after ingredients added _ json :: " + JSON.stringify(json))
                                            localStorage.setItem("todaysmenu", JSON.stringify(json));

                                        }
                                    }
                                    //subCategory.concat(prodct_list)
                                }

                            }
                        }*/


                        var shopJson = {};
                        shopJson["status"] = "true";
                        shopJson["status_desc"] = "true";
                        shopJson["results"] = parsedJSON.results;

                        localStorage.setItem("todaysmenu", JSON.stringify(shopJson));


                        this.setState({

                            updateProLoad: false
                        })

                        this.props.updateShopUi();

                    }else{


                        alert(parsedJSON.status_desc)

                        this.setState({

                            updateProLoad: false
                        })
                    }
                })
                .catch(function(e) {
                    //console.error('Error during updateProLoad:', e);
                    alert("Unable to update product now. Please try again later")
                    this.setState({

                        updateProLoad: false
                    })
                });


        }

        closeAddIngredients(){

            //console.log("closeAddIngredients");
            this.setState({visibility: true,visibilityAdd:false},() => {
            })
        }


        removeThisIngredient(index){


            //console.log("removeThisIngredient");

            var subId = this.state.selectedMenuItemIngredients[index].subItemID;
            var shop_id = localStorage.getItem("shop_id")

            this.setState({

                deleteIngredietnsLoad: true
            })

            makeApiCall("removeIngredient",{"pro_id":this.state.selectedMenuItemID,"shop_id":shop_id,"ing_pro_id":subId}).then((response)=> response.json())
                .then((parsedJSON) => {

                    if(parsedJSON.status == "true"){



                        var  category_id =  parsedJSON.category_id;

                        var array = this.state.selectedMenuItemIngredients;
//console.log("removeThisIngredient :: array :: delete :: "+JSON.stringify(array))
                        //console.log("removeThisIngredient ::index  :: "+index)
                        array.splice(index, 1);

                        this.setState({selectedMenuItemIngredients: array});
                        alert(parsedJSON.status_desc);

                        /*if (localStorage.getItem("todaysmenu")) {



                            var json = localStorage.getItem("todaysmenu");

                            json = JSON.parse(json);
                            var results = json.results;
                            for (var i = 0; i < results.length; i++) {

                                if (results[i].itemID == category_id) {


                                    //matchFound = true;
                                    //console.log("addShopMenuproducts _ matchFound :: ")

                                    // json.results[i].subCategory.push(prodct_list);
                                    // //console.log("addShopMenuproducts _ json :: " + JSON.stringify(json))
                                    //
                                    // localStorage.setItem("todaysmenu", JSON.stringify(json));

                                    for(var j=0;j<results[i].subCategory.length;j++){

                                        if(results[i].subCategory[j].subItemID==this.state.selectedMenuItemID){


                                            results[i].subCategory[j].calculation_products_json = [];
                                            results[i].subCategory[j].calculation_products_json.push(this.state.selectedMenuItemIngredients);
                                            //console.log("shop menu after ingredients added _ json :: " + JSON.stringify(json))
                                            localStorage.setItem("todaysmenu", JSON.stringify(json));

                                        }
                                    }
                                    //subCategory.concat(prodct_list)
                                }

                            }
                        }*/

                        var shopJson = {};
                        shopJson["status"] = "true";
                        shopJson["status_desc"] = "true";
                        shopJson["results"] = parsedJSON.results;

                        localStorage.setItem("todaysmenu", JSON.stringify(shopJson));



                        this.setState({

                            deleteIngredietnsLoad: false
                        })

                        this.props.updateShopUi();

                    }else{


                        alert(parsedJSON.status_desc)

                        this.setState({

                            deleteIngredietnsLoad: false
                        })
                    }
                })
                .catch(function(e) {
                //console.error('Error during addNewProductByShop:', e);
                alert("Unable to save product now. Please try again later")
                    this.setState({

                        deleteIngredietnsLoad: false
                    })
            });



        }

        saveThisIngredient(){



            var qty_ing = this.state.newIngItemCount;
            var pro_id_index = this.state.newIngItemIndex;
            var pro_list = this.state.optionsNewInG[pro_id_index];
            var newIngCalType = this.state.newIngCalType;
            var shop_id = localStorage.getItem("shop_id")

            //console.log("saveThisIngredient _ pro_list" +JSON.stringify(pro_list));
            //console.log("saveThisIngredient _ qty_ing" +qty_ing);
            if(qty_ing && pro_list){


                if(newIngCalType!="Any"){


                    var ingr_new = {};
                    ingr_new["quantity"] =qty_ing;
                    ingr_new["name"] =pro_list.name;
                    ingr_new["subItemID"] =pro_list.subItemID;
                    ingr_new["cal_type"] =pro_list.cal_type;
                    //selectedMenuItemIngredients
                    //console.log("saveThisIngredient _ ingr_new" +JSON.stringify(ingr_new));
                    ////console.log("saveThisIngredient _ selectedMenuItemIngredients" +JSON.stringify(this.state.selectedMenuItemIngredients));

                    var ingr_new_server = {};
                    var ingr_new_server_array = [];
                    ingr_new_server["quantity"] =qty_ing;
                    ingr_new_server["subItemID"] =pro_list.subItemID;
                    ingr_new_server["cal_type"] =pro_list.cal_type;
                    ingr_new_server_array[0] = ingr_new_server;
                    //selectedMenuItemIngredients
                    //console.log("saveThisIngredient _ ingr_new_server_array" +JSON.stringify(ingr_new_server_array));
                    ////console.log("saveThisIngredient _ selectedMenuItemIngredients" +JSON.stringify(this.state.selectedMenuItemIngredients));


                    this.setState({

                        selectedMenuItemIngredients: this.state.selectedMenuItemIngredients.concat(ingr_new),

                    },() => {
                    })


                    this.setState({

                        addNewIngLoad: false
                    })

                    makeApiCall("updateIngredients",{"pro_id":this.state.selectedMenuItemID,"shop_id":shop_id,"cal_field":ingr_new_server_array}).then((response)=> response.json())
                    .then((parsedJSON) => {

                        //console.log("responce  :: "+JSON.stringify(parsedJSON))

                        if(parsedJSON.status == "true"){


                            var  category_id =  parsedJSON.category_id;

                            this.setState({
                                visibility: true,visibilityAdd:false,
                                newIngItemIndex:'',
                                newIngItemCount:'',
                                newIngCalType:'',

                            },() => {
                            })

                            /*if (localStorage.getItem("todaysmenu")) {


                                // //console.log("addShopMenuproducts _ todaysmenu in cache :: ")
                                //
                                 var json = localStorage.getItem("todaysmenu");
                                // //console.log("addShopMenuproducts _ todaysmenu :: " + JSON.stringify(json))

                                json = JSON.parse(json);
                                var results = json.results;

                                ////console.log("category_id :: "+category_id)

                                for (var i = 0; i < results.length; i++) {


                                    ////console.log("results[i].itemID :: "+results[i].itemID)

                                    if (results[i].itemID == category_id) {


                                        //matchFound = true;
                                        //console.log("addShopMenuproducts _ matchFound :: ")

                                        // json.results[i].subCategory.push(prodct_list);
                                        //console.log("subCategory _ json :: " + JSON.stringify(results[i].subCategory))
                                        //
                                        // localStorage.setItem("todaysmenu", JSON.stringify(json));

                                        for(var j=0;j<results[i].subCategory.length;j++){

                                            //console.log("this.state.selectedMenuItemID :: "+this.state.selectedMenuItemID);
                                            //console.log("results[i].subCategory[j].subItemID:: "+results[i].subCategory[j].subItemID);


                                            if(results[i].subCategory[j].subItemID==this.state.selectedMenuItemID){


                                                results[i].subCategory[j].calculation_products_json.push(ingr_new);
                                                //console.log("shop menu after ingredients added _ json :: " + JSON.stringify(json))
                                                localStorage.setItem("todaysmenu", JSON.stringify(json));
                                                break;

                                            }
                                        }
                                        //subCategory.concat(prodct_list)
                                    }

                                }
                            }*/


                            var shopJson = {};
                            shopJson["status"] = "true";
                            shopJson["status_desc"] = "true";
                            shopJson["results"] = parsedJSON.results;

                            localStorage.setItem("todaysmenu", JSON.stringify(shopJson));



                            alert(parsedJSON.status_desc)

                            this.setState({

                                addNewIngLoad: false
                            })

                            this.props.updateShopUi();


                        }else{


                            alert(parsedJSON.status_desc)
                            this.setState({

                                addNewIngLoad: false
                            })

                        }
                    }).catch(function(e) {
                        //console.error('Error during addNewProductByShop:', e);
                        alert("Unable to save ingredients now. Please try again later");
                        this.setState({

                            addNewIngLoad: false
                        })
                    });


                }else{

                    alert("Please select type of cost, ie whether cost per kilo or packet or grams. Currently selected as 'Any' ")


                }


            }else{

                alert("Enter product quantity / select a menu product")
            }


        }





        updateValue(value) {

            var pro_list = this.state.optionsNewInG[value];
            var cal_type = pro_list.cal_type;
            this.setState({ newIngItemIndex:value,newIngCalType: cal_type});
            //console.log('updateValue changed to', value);
        }

        addIngredients(){

            //console.log("addIngredients");
            this.setState({visibility: false,visibilityAdd:true},() => {
            })
        }


        changeselectedMenuItemCalTypeIng(event){


            //console.log("event.target.value : "+event.target.value)

            //alert("Quantity type of this ingredient need to be same as in stock. Please change in stock first.")
            this.setState({selectedMenuItemCalType: event.target.value},() => {
            })
        }


        viewHandler(page){

            this.setState({active: page},() => {
            }) 
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
                  width: '100%',
                },
                label: {
                  marginTop: '.5em',
                  width: '100%'
                },
                height:'100%'
            }

            const divStyle = {
                //height : this.props.dimen.height-240+'px',
                height : '68%',
                padding:'5px'
            }

            //console.log("this.props.dimen.height"+this.props.dimen.height);


            var visibilityAdd = "dialog-container-invisible";
            if (this.state.visibilityAdd) {
                visibilityAdd = "dialog-container-visible";
            }else{
                visibilityAdd = "dialog-container-invisible";
            }


            //console.log("wholeMenuItems :: "+JSON.stringify(this.props.wholeMenuItems))

            var options = [];
            if(this.props.wholeMenuItems && this.props.wholeMenuItems.length>0){

                var options = this.props.wholeMenuItems.map((menu,index) => (






                        menu.itemSubCategory.map((item,subIndex)=>(

                            {

                                subItemID:item.subItemID,
                                name:item.name,
                                cal_type:item.cal_type,

                            }

                        ))





                    )
                )

            }



            var k = 0;
            for(var i=0;i<options.length;i++){

                var singleItem = options[i];
                // //console.log("singleItem :: "+JSON.stringify(singleItem))
                for(var j=0;j<singleItem.length;j++){

                    var productItem = singleItem[j];
                    ////console.log("productItem :: "+JSON.stringify(productItem))
                    productItem["index"] = k;
                    this.state.optionsNewInG[k]=productItem;
                    k = parseFloat(k)+parseFloat(1);
                }

            }




            //console.log("optionsNewInG :: "+JSON.stringify(this.state.optionsNewInG))



            var active = this.state.active;
            return (

                <div className="row form_rgt" style={divStyle} >

                    {this.state.updateProLoad == false ?
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">

                            <div style={{display: 'flex', width: '100%', marginTop: '10px'}}>
                                <div className="add_prd font_size_med"
                                     style={{marginTop: 'auto', marginBottom: 'auto', width: '58%'}}>Menu Item Selected
                                </div>
                                <div align="right" className="right nopadding" onClick={() => this.toggleClickHandler()}>
                                    <div id="btnAddType" className="blue_button font_size_xsmall">
                                        Add New Stock
                                    </div>
                                </div>
                            </div>

                            <div style={{marginBottom: '10px', width: '100%'}}>
                                <span className="blackFont font_size_xsmall">Enter product name (Product name can't be edited)</span>
                                <input
                                    id='productName'
                                    name='productName'
                                    placeholder='Enter product name'
                                    type="text"
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        color: "#3674d4",
                                        borderBottom: "1px solid #ebf5fc"
                                    }}
                                    value={this.state.selectedMenuItemName}
                                />
                            </div>

                            <div style={{marginBottom: '10px', width: '100%'}}>
                                <span className="blackFont font_size_xsmall">Enter price of the product(Including GST)</span>
                                <input
                                    id='productPrice'
                                    name='productPrice'
                                    placeholder='Enter price'
                                    type='text'
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        color: "#3674d4",
                                        borderBottom: "1px solid #ebf5fc"
                                    }}
                                    onChange={(event) => this.setState({selectedMenuItemPrice: event.target.value})}
                                    value={this.state.selectedMenuItemPrice}
                                />
                            </div>

                            <div style={{marginBottom: '10px', width: '100%'}}>
                                <span className="blackFont font_size_xsmall">Enter category of the product</span>
                                <input
                                    id='productCategory'
                                    name='productCategory'
                                    placeholder='Enter category'
                                    type='text'
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        color: "#3674d4",
                                        borderBottom: "1px solid #ebf5fc"
                                    }}
                                    value={this.state.selectedMenuItemCategory}
                                    onFocus={() => {
                                        this.viewHandler('CATEGORY_PAGE')
                                    }}
                                />
                            </div>

                            <div style={{width: '100%', borderBottom: "1px solid #ebf5fc", marginBottom: '10px'}}>
                                <span className="blackFont font_size_xsmall">Enter Unit of the product</span>
                                <select className="app_select"
                                        onChange={(event) => this.changeselectedMenuItemCalTypeIng(event)}
                                        value={this.state.selectedMenuItemCalType ? this.state.selectedMenuItemCalType : "Any"}
                                        style={{width: '100%'}}>
                                    <option value="Any">Any</option>
                                    <option value="count">count</option>
                                    <option value="packet">packet</option>
                                    <option value="grams">grams</option>
                                    <option value="liters">liters</option>
                                    <option value="kilo">kilo</option>
                                </select>
                            </div>


                            {this.state.selectedMenuItemIsShowMenu == "1" ?

                                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <label id="brn1" style={{fontSize: '12px', color: '#00000096'}}
                                           className="container_chk font_size_xsmall"> Add to Menu
                                        <input
                                            type="checkbox"
                                            id="chk1"
                                            checked={true}
                                            onClick={this.showToMenuFlagSet}

                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                :


                                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <label id="brn1" style={{fontSize: '12px', color: '#00000096'}}
                                           className="container_chk font_size_xsmall"> Add to Menu
                                        <input
                                            type="checkbox"
                                            id="chk1"
                                            checked={false}
                                            onClick={this.showToMenuFlagSet}

                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>

                            }

                            {/*<div style={{display:'flex',width:'100%',marginTop: '20px',marginBottom:'10px'}}>
                                    <div className="add_prd font_size_med" style={{marginTop: 'auto',marginBottom: 'auto',width:'75%'}} >Ingredients</div>
                                    <div align="right" className= "right nopadding"  >
                                        <div id="btnAddIngre" className="blue_button2 font_size_small" onClick={()=>this.viewHandler('INGREDIENT_PAGE')}>
                                            View
                                        </div>
                                    </div>
                                </div>*/}

                            <div className="row">
                                <div id="btnAddType" style={{cursor: 'pointer'}}
                                     onClick={() => this.updateProductInfo()}
                                     className="aqua_blue_button font_size_med thick ">Update Product
                                </div>
                            </div>
                        </div>
                        :


                        <div className="loader">
                            <svg viewBox="0 0 32 32" width="32" height="32">
                                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                            </svg>
                        </div>

                    }

                    {/*{ active === 'SHOW_INGREDIENTS' ? (
                        <Ingredients data={this.state.selectedMenuItemIngredients}/>

                        ):""}*/}


                    {this.state.deleteIngredietnsLoad == true ?


                        <div className="loader">
                            <svg viewBox="0 0 32 32" width="32" height="32">
                                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                            </svg>
                        </div>

                        :
                        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6" id="ingrdnt_div"
                             style={{paddingBottom: '5px'}}>
                            <div className="" style={{marginTop: '10px'}}>

                                <div className="row">
                                    <div className="col-md-6">Ingredients</div>
                                    <div className="col-md-6 nopadding" onClick={() => this.addIngredients()}>
                                        <div id="btnAddType" className="white_button2 font_size_small">Add Ingredients
                                        </div>
                                    </div>
                                </div>

                                <div className="category_sctn">


                                    {this.state.selectedMenuItemIngredients.length > 0 ?

                                        this.state.selectedMenuItemIngredients.map((menu, index) => (


                                            <div className="box">
                                                <label className="add_ctgry">{menu.name}</label>
                                                <span> -</span>
                                                <span>{menu.quantity} {menu.cal_type}</span>
                                                <span className="close_icon"
                                                      onClick={() => this.removeThisIngredient(index)}><img
                                                    src={close}/></span>
                                            </div>


                                        )) : <div style={{background: '#ffffff'}}>
                                            <div style={{marginTop: '5%', marginLeft: '5%'}}>Ingredients not added for
                                                this
                                                product
                                            </div>
                                        </div>}


                                </div>
                            </div>
                        </div>
                    }


                    <div className={visibilityAdd}>

                        <div className="dialog">


                            {this.state.addNewIngLoad == true ?

                                <div className="loader">
                                    <svg viewBox="0 0 32 32" width="32" height="32">
                                        <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                    </svg>
                                </div>

                                :<div style={{padding:'0px'}}>

                                    <div className="dialog-title font_size_med thin blueFont">
                                        <span> Add Ingredients</span>
                                        <div align='right'
                                             style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}}>
                                            <img src={close_blue} className='xsmall_icon_unpadded'
                                                 onClick={() => this.closeAddIngredients()}/>
                                        </div>
                                    </div>

                                    <div className="" style={{marginTop: '10px',padding:'20px'}}>

                                        <div className="row form_rgt" style={divStyle}>

                                            <div style={{marginBottom: '8px', width: '100%'}}>

                                                <div className="add_prd font_size_med"
                                                     style={{color: '#41bb68', paddingBottom: '10px',fontSize:'15px'}}> * Specify what are the ingredients required and how much is required for one quantity. eg: 3 onions are required for 1 CB.
                                                </div>

                                                <div className="add_prd font_size_med"
                                                     style={{color: '#47494a', paddingBottom: '10px'}}>Select a product from
                                                    shop stock
                                                </div>
                                                <div>

                                                    <VirtualizedSelect
                                                        options={this.state.optionsNewInG}
                                                        simpleValue
                                                        clearable
                                                        name="select-city"
                                                        value={this.state.newIngItemIndex}
                                                        onChange={this.updateValue}
                                                        searchable
                                                        labelKey="name"
                                                        valueKey="index"
                                                    />


                                                </div>
                                                <div style={{marginBottom: '10px', width: '100%'}}>
                                                    <div className="add_prd font_size_med"
                                                         style={{color: '#47494a', paddingBottom: '0px'}}>Product quantity
                                                    </div>
                                                    <select disabled="true" className="app_select" aria-readonly={"true"}
                                                            onChange={(event) => this.changeselectedMenuItemCalTypeIng(event)}
                                                            value={this.state.newIngCalType ? this.state.newIngCalType : "Any"}
                                                            style={{width: '100%'}}>
                                                        <option value="Any">Any</option>
                                                        <option value="count">count</option>
                                                        <option value="packet">packet</option>
                                                        <option value="grams">grams</option>
                                                        <option value="liters">liters</option>
                                                        <option value="kilo">kilo</option>
                                                    </select>
                                                </div>

                                                <div style={{marginBottom: '10px', width: '100%'}}>

                                                    <span className="blackFont font_size_xsmall" style={{fontSize:'13px'}}>Enter product quanity required ( in {this.state.newIngCalType})</span>
                                                    <input
                                                        id='productPrice'
                                                        name='productPrice'
                                                        placeholder='Enter product quanity required'

                                                        style={{
                                                            width: "100%",
                                                            border: "none",
                                                            color: "#3674d4",
                                                            borderBottom: "1px solid #ebf5fc"
                                                        }}
                                                        value={this.state.newIngItemCount}

                                                        onChange={(event) => this.setState({newIngItemCount: event.target.value},()=>{
                                                           //console.log("newIngItemCount :"+this.state.newIngItemCount)
                                                        })}

                                                    />

                                                    {/*<FloatingLabel
                                                        id='productPrice'
                                                        name='productPrice'
                                                        placeholder='Enter product quanity required'
                                                        type='text'
                                                        styles={inputStyle}
                                                        onChange={(event) => this.setState({newIngItemCount: event.target.value})}
                                                        value={this.state.newIngItemCount}
                                                    />*/}
                                                </div>

                                                <div className="row">
                                                    <div id="btnAddType" style={{cursor: 'pointer'}}
                                                         onClick={() => this.saveThisIngredient()}
                                                         className="aqua_blue_button font_size_small">Add Ingredient
                                                    </div>
                                                </div>

                                            </div>
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


    




export default ManagementSection;