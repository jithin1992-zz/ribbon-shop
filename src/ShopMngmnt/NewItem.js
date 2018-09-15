import {makeApiCall} from "../Actions/ApiCalls";
import Select from "react-select";
import React from "react";
import Ingredients from './Ingredients';
import Categories from './Categories';
import VirtualizedSelect from 'react-virtualized-select';
import FloatingLabel from 'floating-label-react'
import ManagementSection from "./ManagementSection";

import close from "../images/close-button.svg";
import close_blue from '../images/blueCloseBtn.png';

class NewItem extends React.Component {

    constructor(){
        super()
        this.state={
            items : [],
            active : 'CATEGORY_PAGE',
            selectedMenuItemID : '',
            selectedMenuCategoryID : '',
            selectedMenuItemName : '',
            selectedMenuItemPrice : '',
            selectedMenuItemDesc : '',
            selectedMenuItemCalType : '',
            selectedMenuItemIngredients :[],
            backspaceRemoves: true,
            multi: false,
            creatable: false,
            selectedIndex:0,
            visibility : false,
            visibilityNewProduct : false,
            visibilityAdd:false,
            newIngItemCount:'',
            newIngItemIndex:'',
            newIngCalType:'',
            optionsNewInG:[],
            stockTick:false,


            newProductId :'',

            newProductName:'',
            newProductDes:'',
            newProductGstId:'',
            newProductUniqueFlag:false,
            addNewProduct:false,

            // options: [{'value':'PROD00000136','label':'jilebi special'}],

            matchPos: 'label',
            matchValue: false,
            isShowToMenuFlag:false,
            matchLabel: true,
            value: null,
            multi: false



        };

        this.viewHandler= this.viewHandler.bind(this);
        this.clearAllProducts= this.clearAllProducts.bind(this);
        this.getProducts= this.getProducts.bind(this);
        this.onChangeProduct= this.onChangeProduct.bind(this);
        this.createNewProduct= this.createNewProduct.bind(this);
        this.closeIngredients= this.closeIngredients.bind(this);
        this.viewIngredients= this.viewIngredients.bind(this);
        this.changeselectedMenuItemCalType= this.changeselectedMenuItemCalType.bind(this);
        this.changeselectedMenuItemCalTypeIng= this.changeselectedMenuItemCalTypeIng.bind(this);
        this.closeAddIngredients= this.closeAddIngredients.bind(this);
        this.saveThisIngredient= this.saveThisIngredient.bind(this);
        this.addIngredients= this.addIngredients.bind(this);
        this.updateValue= this.updateValue.bind(this);
        this.addNewProductPopup= this.addNewProductPopup.bind(this);
        this.addProductToMenu= this.addProductToMenu.bind(this);
        this.showToMenuFlagSet= this.showToMenuFlagSet.bind(this);
        this.showToStockFlagSet= this.showToStockFlagSet.bind(this);
        this.closeAddNewProductPopup= this.closeAddNewProductPopup.bind(this);
        this.uniqueProductSet= this.uniqueProductSet.bind(this);
        this.removeThisIngredient= this.removeThisIngredient.bind(this);
        this.updateShopUi= this.updateShopUi.bind(this);


        this.CategoriesNewItem = React.createRef();
    }

    viewHandler(page){

        this.setState({active: page},() => {
        })
    }


    removeThisIngredient(index){



        var array = this.state.selectedMenuItemIngredients;

        array.splice(index, 1);

        if(array.length==0)

        this.setState({selectedMenuItemIngredients: array,stockTick:false,});
        else
            this.setState({selectedMenuItemIngredients: array,});



    }

    uniqueProductSet(){

        if(this.state.newProductUniqueFlag){

            this.setState({newProductUniqueFlag: false},() => {
            })

        }else{

            this.setState({newProductUniqueFlag: true},() => {
            })

        }

    }

    changeselectedMenuItemCalType(event){


        //console.log("event.target.value : "+event.target.value)

        this.setState({selectedMenuItemCalType: event.target.value},() => {
        })
    }

    changeselectedMenuItemCalTypeIng(event){


        //console.log("event.target.value : "+event.target.value)

        alert("Quantity type of this ingredient need to be same as in stock. Please change in stock first.")

        // this.setState({newIngCalType: event.target.value},() => {
        // })
    }

    updateShopUi(){

        //console.log("updateShopUi (New Item)")

        this.props.updateShopUi();
    }

    addProductToMenu(){



       // this.updateShopUi();

        var pro_id = this.state.selectedMenuItemID;
        var cal_field = this.state.selectedMenuItemIngredients;
        var shop_id = localStorage.getItem("shop_id");
        var product_quantity_type = this.state.selectedMenuItemCalType;
        var added_id = localStorage.getItem("user_id");
        var product_price = this.state.selectedMenuItemPrice;
        var is_show_to_menu = "0"
        if(this.state.isShowToMenuFlag){

            is_show_to_menu = "1";
        }

        if(!product_price){

            if(this.state.isShowToMenuFlag){

                product_price = "0";
            }
        }
        //console.log("addProductToMenu : "+product_quantity_type);

        if(this.validateShopMenuproducts(pro_id,this.state.isShowToMenuFlag,product_price,product_quantity_type)) {

            makeApiCall("addShopMenuproducts", {
                "category_id": this.state.selectedMenuCategoryID.toString(),
                "pro_id": pro_id.toString(),
                "shop_id": shop_id,
                "cal_field": cal_field,
                "is_show_to_menu": is_show_to_menu,
                "product_quantity_type": product_quantity_type,
                "added_id": added_id,
                "product_price": product_price
            })
                .then((response) => response.json())
                .then((parsedJSON) => {

                    //console.log("addShopMenuproducts _ responce :: " + JSON.stringify(parsedJSON))
                    if (parsedJSON.status == "true") {


                        var category_data = parsedJSON.category_data;
                        var prodct_list = parsedJSON.prodct_list;
                        var category_id = category_data.itemID;

                        var matchFound = false;

                        //console.log("addShopMenuproducts _ prodct_list :: " + JSON.stringify(prodct_list))
                        //console.log("addShopMenuproducts _ category_id :: " + JSON.stringify(category_id))
                        //console.log("addShopMenuproducts _ category_data :: " + JSON.stringify(category_data))

                        if (localStorage.getItem("todaysmenu")) {


                            //console.log("addShopMenuproducts _ todaysmenu in cache :: ")

                            var json = localStorage.getItem("todaysmenu");
                            //console.log("addShopMenuproducts _ todaysmenu :: " + JSON.stringify(json))

                            json = JSON.parse(json);
                            var results = json.results;
                            for (var i = 0; i < results.length; i++) {

                                if (results[i].itemID == category_id) {


                                    matchFound = true;
                                    //console.log("addShopMenuproducts _ matchFound :: ")

                                    json.results[i].subCategory.push(prodct_list);
                                    //console.log("addShopMenuproducts _ json :: " + JSON.stringify(json))

                                    localStorage.setItem("todaysmenu", JSON.stringify(json));
                                    //subCategory.concat(prodct_list)
                                }

                            }

                        }

                        if (!matchFound) {

                            //console.log("addShopMenuproducts _ matchNotFound :: ")


                            if (localStorage.getItem("todaysmenu")) {


                                var json = localStorage.getItem("todaysmenu");
                                json = JSON.parse(json);
                                var results = json.results;
                                var pro_array = [];
                                pro_array[0] = prodct_list;
                                category_data["subCategory"] = pro_array;
                                var len = json.results.length;
                                len = parseFloat(len) + parseFloat(1);
                                json.results.push(category_data);
                                //console.log("addShopMenuproducts _ json :: " + JSON.stringify(json))

                                localStorage.setItem("todaysmenu", JSON.stringify(json));

                            } else {


                                //console.log("addShopMenuproducts _ new json :: ")

                                var json = {}
                                json["status"] = "true";
                                json["status_desc"] = "Data fetched";
                                var results = [];


                                category_data["subCategory"] = prodct_list;
                                results[0] = category_data;

                                json["results"] = results;
                                //console.log("addShopMenuproducts _ json :: " + JSON.stringify(json))

                                localStorage.setItem("todaysmenu", JSON.stringify(json));


                            }

                        }


                    } else {


                        alert(parsedJSON.status_desc)

                    }

                    this.updateShopUi();
                }).catch(function (e) {
                //console.error('Error during addNewProductByShop:', e);
                alert("Unable to add product into menu . Please try again later")
            });
        }

    }

    showToMenuFlagSet(){

        if(this.state.isShowToMenuFlag){

            this.setState({isShowToMenuFlag: false},() => {
            })

        }else{

            this.setState({isShowToMenuFlag: true},() => {
            })

        }

    }

    showToStockFlagSet(){



            this.setState({stockTick: true},() => {
            })



    }


    viewIngredients(){

        this.setState({visibility: true},() => {
        })
    }

    addNewProductPopup(){

        if(this.state.selectedMenuCategoryID){

            this.setState({visibilityNewProduct: true},() => {
            })
            //this.props.popupHandler(this.state.visibilityNewProduct);

        }else{

            alert("Please select a category ")
        }

    }

    closeAddNewProductPopup(){

        this.setState({visibilityNewProduct: false},() => {
        })
    }

    closeIngredients(){

        //console.log("closeIngredients");

        this.setState({visibility: false,visibilityAdd:false},() => {
        })
    }

    closeAddIngredients(){

        //console.log("closeAddIngredients");
        this.setState({visibility: true,visibilityAdd:false},() => {
        })
    }

    saveThisIngredient(){



        var qty_ing = this.state.newIngItemCount;
        var pro_id_index = this.state.newIngItemIndex;
        var pro_list = this.state.optionsNewInG[pro_id_index];
        var newIngCalType = this.state.newIngCalType;

        //console.log("saveThisIngredient _ pro_list" +JSON.stringify(pro_list));
        //console.log("saveThisIngredient _ qty_ing" +qty_ing);
        //console.log("saveThisIngredient _ pro_id_index" +pro_id_index);
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

                this.setState({
                    visibility: true,visibilityAdd:false,
                    newIngItemIndex:'',
                    newIngItemCount:'',
                    newIngCalType:'',
                    stockTick:false,
                    selectedMenuItemIngredients: this.state.selectedMenuItemIngredients.concat(ingr_new),

                },() => {
                })

            }else{

                alert("Please select type of cost, ie whether cost per kilo or packet or grams. Currently selected as 'Any' ")


            }


        }else{

            alert("Enter product quantity / select a menu product")
        }


    }

    addIngredients(){

        //console.log("addIngredients");
        this.setState({visibility: false,visibilityAdd:true},() => {
        })
    }


    clearAllProducts(categoryId){
        //console.log("clearAllProducts"+categoryId);



        /*this.setState({
            selectedMenuItemID:0,
            selectedMenuItemName:[],
            selectedMenuItemPrice:0,
            selectedMenuItemCalType:[],
            selectedMenuCategoryID:categoryId
        })*/

        this.setState({

            selectedMenuItemID:0,
            selectedMenuItemName:'',
            selectedMenuItemPrice:0,
            selectedMenuItemCalType:[],
            selectedMenuCategoryID:categoryId,
            selectedIndex:categoryId,
            selectedMenuItemIngredients:[]


        },() => {
        })


        ////console.log("selectedMenuCategoryID"+selectedMenuCategoryID);

    }


    createNewProduct(){


        //console.log("createNewProduct")
        var newProductName = this.state.newProductName;
        var newProductDes= this.state.newProductDes;

        var category_id = this.state.selectedMenuCategoryID;
        var gst_id = this.state.newProductGstId;
        var shop_id = localStorage.getItem("shop_id")
        var unique_flag = this.state.newProductUniqueFlag;
        var unique = 0;
        if(unique_flag)
            unique = 1;

        if(shop_id){



            if(newProductDes)
                newProductDes = newProductDes;
            else
                newProductDes = newProductName;

            //console.log("createNewProduct :: "+newProductDes);


            if(this.newProductInsertValidation(newProductName,newProductDes,category_id)){


                this.setState({

                    addNewProduct: true
                })


                makeApiCall("addNewProductByShop",{"pro_name":newProductName,"quantity":"Any","gst_id":gst_id,"pro_category_id":category_id,"unique_flag":unique.toString(),"shop_id":shop_id,"pro_desc":newProductDes}).then((response)=> response.json())
                    .then((parsedJSON) => {

                        if(parsedJSON.status == "true"){


                            var productId = parsedJSON.product_id;
                            //console.log("response  productId : "+parsedJSON)

                            var productJson = {};
                            productJson["pro_id"] = newProductName;
                            productJson["pro_category_id"] = category_id;
                            productJson["pro_name"] = newProductName;

                            this.setState({
                                newProductId :'',
                                newProductName:'',
                                newProductDes:'',
                                newProductGstId:'',
                                newProductUniqueFlag:false,

                                selectedMenuItemName: productJson,
                                selectedMenuItemID:productId,
                                selectedIndex:category_id,

                            },() => {
                            })
                            alert(parsedJSON.status_desc)
                            this.closeAddNewProductPopup();

                        }else{


                            alert(parsedJSON.status_desc)

                        }

                        this.setState({

                            addNewProduct: false
                        })

                    }).catch(function(e) {
                    //console.error('Error during addNewProductByShop:', e);
                    alert("Unable to save product now. Please try again later")
                    this.setState({

                        addNewProduct: false
                    })
                });





            }




        }else{

            alert("Invalid shop details")
        }





    }

    newProductInsertValidation(newProductName,newProductDes,category_id){


        if(newProductName){

            if(newProductDes){




                    if(category_id){

                        return true;

                    }else{

                        alert("Please choose a category")
                        return false;

                    }





            }else{

                alert("Please enter product description")
                return false;

            }
        }else{

            alert("Please enter product name")
            return false;
        }
    }

    onChangeProduct (value) {


        //console.log("selectedMenuItemName is(value) :: "+value.pro_id);
        //this.selectedMenuItemID = value.pro_id;

        this.setState({
            selectedIndex: value.pro_category_id,
            selectedMenuCategoryID:value.pro_category_id,
            selectedMenuItemName:value,
            selectedMenuItemID : value.pro_id

        },() => {
        })
        //console.log("selectedMenuItemName is :: "+this.selectedMenuItemID);

        this.CategoriesNewItem.current.newProductSelected(value.pro_category_id);

    }

    getProducts (input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }
        //console.log("getProducts"+input);
        var shop_id = localStorage.getItem("shop_id")
        var category = this.state.selectedMenuCategoryID;

        //console.log("getProducts category"+category);
        if(category)
            category = category;
        else
            category = "";


        /*return fetch("http://50.112.43.161:8080/ribbon_api/api/fetchAllProductsByMatchName",{method:'POST',headers:{
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json',
                'Accept':'application/json',

            },body:JSON.stringify({"shop_id":shop_id,"productName":input ,"category_id":category}
            )})

            .then((response)=>{
                if(!response.ok){
                    throw Error(response.statusText);
                }
                //this.setState({isLoading:false});
                return response;
            })
            .then((response)=> response.json())
            .then((parsedJSON) => {


                if(parsedJSON.status){


                    //options: ['ji']
                    //console.log("getProducts:"+parsedJSON.products_list);
                    //console.log("getProducts:"+JSON.stringify(parsedJSON));
                    ////console.log("getProducts_options:"+options);

                    return { options: (parsedJSON.products_list) };

                }else{

                    return Promise.resolve({ options: [] });

                }
            })
            .catch((error)=> {
                //console.log("getProducts:catch "+error);

                return Promise.resolve({ options: [] });

            });*/


        return makeApiCall("fetchAllProductsByMatchName",{"shop_id":shop_id,"productName":input ,"category_id":category}).then((response)=> response.json())
            .then((parsedJSON) => {


                if(parsedJSON.status){


                    //options: ['ji']
                    //console.log("getProducts:"+parsedJSON.products_list);
                    //console.log("getProducts:"+JSON.stringify(parsedJSON));
                    ////console.log("getProducts_options:"+options);

                    return { options: (parsedJSON.products_list) };

                }else{

                    return Promise.resolve({ options: [] });

                }
            })
            .catch((error)=> {
                //console.log("getProducts:catch "+error);

                return Promise.resolve({ options: [] });

            });

        // return fetch(`https://api.github.com/search/users?q=${input}`)
        //     .then((response) => response.json())
        //     .then((json) => {
        //         return { options: json.items };
        //     });
    }

    handleKeyDown (event) {
        alert("handleKeyDown")
        if (event.which === this.ESCAPE_KEY) {
            this.setState({
                editText: this.props.name,
                editing: false
            });
        } else if (event.which === this.ENTER_KEY) {
            this.handleSubmit(event);
        }
    }



    updateValue(value) {

        var pro_list = this.state.optionsNewInG[value];
        var cal_type = pro_list.cal_type;
        this.setState({ newIngItemIndex:value,newIngCalType: cal_type});
        //console.log('updateValue changed to', value);
    }




    render() {


        //console.log("wholeMenuItems :: "+JSON.stringify(this.props.wholeMenuItems))


        /*  var items  =  this.props.wholeMenuItems.map(


              main_menu => (



                  {
                      itemID : `${main_menu.itemID}`,
                      itemName : `${main_menu.itemName}`,
                      itemColor : `${main_menu.itemColor}`,
                      itemSubCategory : main_menu.subCategory,

                  }
              )






          )*/

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
            // console.log("singleItem :: "+JSON.stringify(singleItem))
            for(var j=0;j<singleItem.length;j++){

                var productItem = singleItem[j];
                //console.log("productItem :: "+JSON.stringify(productItem))
                productItem["index"] = k;
                this.state.optionsNewInG[k]=productItem;
                k = parseFloat(k)+parseFloat(1);
            }

        }




        //console.log("optionsNewInG :: "+JSON.stringify(this.state.optionsNewInG))


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


        var visibility = "dialog-container-invisible";
        var visibilityNewProduct = "dialog-container-invisible";
        var visibilityAdd = "dialog-container-invisible";

        if (this.state.visibility) {
            visibility = "dialog-container-visible";
        }else{
            visibility = "dialog-container-invisible";
        }

        if (this.state.visibilityNewProduct) {
            visibilityNewProduct = "dialog-container-visible";
        }else{
            visibilityNewProduct = "dialog-container-invisible";
        }

        if (this.state.visibilityAdd) {
            visibilityAdd = "dialog-container-visible";
        }else{
            visibilityAdd = "dialog-container-invisible";
        }

        const selectTypeCss = {


            backgroundColor: '#fff',
            borderColor: '#d9d9d9 #ccc #b3b3b3',
            borderRadius: '4px',
            border: '1px solid #ccc',
            color: '#333',
            cursor: 'default',
            display: 'table',
            borderSpacing: '0',
            borderCollapse: 'separate',
            height: '36px',
            outline: 'none',
            overflow: 'hidden',
            position: 'relative',
            width: '100%'

        }

        const divStyle = {
            // height : this.props.dimen.height-240+'px',
            height : '68%',
            padding:'5px'
        }


        const AsyncComponent = this.state.creatable
            ? Select.AsyncCreatable
            : Select.Async;


        var active = this.state.active;
        var matchProp = 'label';

        return (



            <div class="row form_rgt" style={divStyle}>

                <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6">

                    <div style={{display:'flex',width:'100%',marginTop: '10px'}}>
                        <div class="add_prd font_size_med" style={{marginTop: 'auto',marginBottom: 'auto',width:'70%'}} >New Stock Item</div>
                        {/* <div align="right" class= "right nopadding"  >
                                    <div id="btnAddType" class="blue_button font_size_small">
                                        Add Item
                                    </div>
                                </div> */}
                    </div>

                    <div  style={{marginBottom:'8px',width:'100%'}}>

                        <div class="add_prd font_size_med" style={{color:'#47494a',paddingBottom:'10px',display:'none'}}>Search Product</div>
                        <div style={{marginTop:'10px',backgroundColor: '#fff', borderColor: '#d9d9d9 #ccc #b3b3b3',borderRadius: '4px',border: '1px solid #ccc',color: '#333',cursor: 'default',display: 'table',borderSpacing: '0',borderCollapse: 'separate',height: '36px',outline: 'none',overflow: 'hidden',position: 'relative',width: '100%'}}>
                            <AsyncComponent   multi={this.state.multi}  value={this.state.selectedMenuItemName} onKeyDown={this.handleKeyDown.bind(this)} onChange={this.onChangeProduct}  loadOptions={this.getProducts} valueKey="pro_id"  labelKey="pro_name"  backspaceRemoves={this.state.backspaceRemoves} />

                        </div>

                        <div className="italics font_size_small" style={{marginTop:'5px',width:'100%'}}>

                            <div style={{color:'#333333'}}>Could not find the product? <a style={{color:'#021bef',textDecoration:'underline',cursor:'pointer'}} onClick={this.addNewProductPopup}>Create one</a></div>
                        </div>


                    </div>

                    <div style={{marginBottom:'10px',width:'100%'}}>
                        <span class="blackFont font_size_xsmall">Enter price of the product (Including GST)</span>
                        <input
                            id='productPrice'
                            name='productPrice'
                            placeholder='Enter price '
                            type="number"
                            style={{width: "100%", border: "none", color: "#3674d4", borderBottom: "1px solid #ebf5fc"}}
                            value = {this.state.selectedMenuItemPrice}
                            onChange={(event) => this.setState({selectedMenuItemPrice: event.target.value})}
                        />
                    </div>

                    {/* <div style={{marginBottom:'10px',width:'100%'}}>
                                <FloatingLabel
                                    id='productCategory'
                                    name='productCategory'
                                    placeholder='Enter category of the product'
                                    type='text'
                                    styles={inputStyle}
                                    onFocus = {() => {this.viewHandler('CATEGORY_PAGE')}}
                                />
                            </div>*/}

                    <div style={{width:'100%',borderBottom: "1px solid #ebf5fc",marginBottom:'10px'}}>
                        <span className="blackFont font_size_xsmall">Enter Unit of the product</span>
                        <select value={this.state.selectedMenuItemCalType?this.state.selectedMenuItemCalType:"Any"}   onChange={(event) => this.changeselectedMenuItemCalType(event)} class="app_select" style={{width:'100%'}}>
                            <option value="Any">Any</option>
                            <option value="count">count</option>
                            <option value="packet">packet</option>
                            <option value="grams">grams</option>
                            <option value="liters">liters</option>
                            <option value="kilo">kilo</option>
                        </select>
                    </div>

                    <div style={{display:'flex',width:'100%',marginTop: '20px',marginBottom:'10px'}}>
                        <div class="add_prd font_size_med" style={{marginTop: 'auto',marginBottom: 'auto',width:'75%'}} >Ingredients</div>
                        <div align="right" class= "right nopadding"  >
                            <div id="btnAddIngre" class="blue_button2 font_size_small" onClick={()=>this.viewIngredients()}>
                                View
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <label id="brn1"  style={{fontSize:'12px',color:'#00000096'}} className="container_chk font_size_xsmall"> Add to Menu
                            <input
                                type="checkbox"
                                id="chk1"

                                onClick={this.showToMenuFlagSet}

                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>


                    {this.state.selectedMenuItemIngredients.length > 0 ?



                        <div id={'showStockId'}></div>

                        :

                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <label id="brn1"  style={{fontSize:'12px',color:'#00000096'}} className="container_chk font_size_xsmall"> Add to Stock
                                <input
                                    type="checkbox"
                                    id="chk1"
                                    checked={true}
                                    readOnly={true}


                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                    }

                    {/*<div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">*/}
                        {/*<label id="brn1"  style={{fontSize:'12px',color:'#00000096'}} className="container_chk font_size_xsmall"> Add to Stock*/}
                            {/*<input*/}
                                {/*type="checkbox"*/}
                                {/*id="chk1"*/}
                                {/*checked={this.state.stockTick}*/}
                                {/*onClick={this.showToStockFlagSet}*/}

                            {/*/>*/}
                            {/*<span className="checkmark"></span>*/}
                        {/*</label>*/}
                    {/*</div>*/}


                    <div class="row">
                        <div id="btnAddType" class="aqua_blue_button font_size_small" style={{cursor:'pointer'}} onClick={()=>this.addProductToMenu()}>Add Product</div>
                    </div>
                </div>

                { active === 'CATEGORY_PAGE' ? (
                    <CategoriesNewItem ref={this.CategoriesNewItem}  checked={this.state.selectedIndex}  onChangeCategory={this.clearAllProducts}/>
                )  : null
                }

                <div className={visibility}>

                    <div style={{minWidth:'40%',minHeight:'50%',overflow:'scroll'}} className="dialog">
                        <div className="dialog-title font_size_med thin blueFont">
                            <span>Ingredients</span>
                            <div align='right'
                                 style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}}>
                                <div id="btnAddType" onClick={() => this.addIngredients()} className="white_button2 font_size_small">Add Ingredients</div>
                            </div>
                        </div>

                        <div className="row h-100 justify-content-center align-items-center scroll" style={{marginTop: '10px',width:'100%',height:'100%'}}>


                            <div style={{margin:'5px',width:'100%'}} className="category_sctn">


                                {this.state.selectedMenuItemIngredients.length > 0 ?

                                    this.state.selectedMenuItemIngredients.map((menu, index) => (


                                        <div className="box">
                                            <label className="add_ctgry">{menu.name}</label>
                                            <span> -</span>
                                            <span>{menu.quantity} {menu.cal_type}</span>
                                            <span className="close_icon"  onClick={() => this.removeThisIngredient(index)} ><img src={close}/></span>
                                        </div>


                                    )) : <div style={{background: '#ffffff'}}>
                                        <div class="italics" style={{margin:'auto',textAlign:'center',width:'100%'}}>Ingredients not added for this
                                            product
                                        </div>
                                    </div>}

                            </div>

                            <div  style={{width:'50%',paddingTop:'5px'}}>

                                <div style={{cursor: 'pointer'}}
                                     className="aqua_blue_button font_size_small"
                                     onClick={() => this.closeIngredients()}>Ok
                                </div>

                            </div>



                        </div>
                    </div>

                </div>

                <div className={visibilityNewProduct}>

                    <div className="dialog">

                        {this.state.addNewProduct == true ?

                            <div className="loader">
                                <svg viewBox="0 0 32 32" width="32" height="32">
                                    <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                </svg>
                            </div>

                            :
                            <div style={{padding: '0px'}}>
                                <div className="dialog-title font_size_med thin blueFont">
                                    <span>New Product</span>
                                    <div align='right'
                                         style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}}>
                                        <img src={close_blue} className='xsmall_icon_unpadded'
                                             onClick={() => this.closeAddNewProductPopup()}/>
                                    </div>
                                </div>

                                <div className="" style={{marginTop: '10px', padding: '20px'}}>


                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                        <div style={{marginBottom: '10px', width: '100%'}}>
                                            <FloatingLabel
                                                id='newProductName'
                                                name='newProductName'
                                                placeholder='Enter product name'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(event) => this.setState({newProductName: event.target.value})}
                                                value={this.state.newProductName}
                                            />
                                        </div>

                                    </div>


                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                        <div style={{marginBottom: '10px', width: '100%'}}>
                                            <FloatingLabel
                                                id='newProductGstId'
                                                name='newProductGstId'
                                                placeholder='Enter GST identification number'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(event) => this.setState({newProductGstId: event.target.value})}
                                                value={this.state.newProductGstId}
                                            />
                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                        <div style={{marginBottom: '10px', width: '100%'}}>
                                            <FloatingLabel
                                                id='newProductDes'
                                                name='newProductDes'
                                                placeholder='Enter Product Description'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(event) => this.setState({newProductDes: event.target.value})}
                                                value={this.state.newProductDes}
                                            />
                                        </div>

                                    </div>

                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <label id="brn1" className="container_chk">Our special product
                                            <input
                                                type="checkbox"
                                                id="chk1"

                                                onClick={this.uniqueProductSet}

                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>


                                    <div className="row">
                                        <div id="btnAddType" style={{cursor: 'pointer'}}
                                             className="aqua_blue_button font_size_small"
                                             onClick={() => this.createNewProduct()}>Add Product
                                        </div>
                                    </div>

                                </div>

                            </div>
                        }

                    </div>

                </div>


                <div className={visibilityAdd}>

                    <div className="dialog">
                        <div className="dialog-title font_size_med thin blueFont">
                            <span> Add Ingredients  </span>
                            <div align='right'
                                 style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}}>
                                <img src={close_blue} className='xsmall_icon_unpadded'
                                     onClick={() => this.closeAddIngredients()}/>
                            </div>
                        </div>

                        <div className="" style={{marginTop: '10px'}}>

                            <div class="row form_rgt" style={divStyle}>

                                <div style={{marginBottom: '8px', width: '100%'}}>

                                    <div className="add_prd font_size_med"
                                         style={{color: '#41bb68', paddingBottom: '10px',fontSize:'15px'}}> * Specify what are the ingredients required and how much is required for one quantity. eg: 3 onions are required for 1 CB.
                                    </div>

                                    <div className="add_prd font_size_med"
                                         style={{color: '#47494a', paddingBottom: '10px'}}>Select a product from shop stock
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
                                    <div style={{marginBottom:'10px',width:'100%'}}>
                                        <div className="add_prd font_size_med"
                                             style={{color: '#47494a', paddingBottom: '10px'}}>Product quantity
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

                                    <div style={{marginBottom:'10px',width:'100%'}}>
                                        <FloatingLabel
                                            id='productPrice'
                                            name='productPrice'
                                            placeholder='Enter product quanity required'
                                            type='text'
                                            styles={inputStyle}
                                            onChange={(event) => this.setState({newIngItemCount: event.target.value}, () => {console.log("productPrice : ingredient "+this.state.newIngItemCount)})}
                                            value = {this.state.newIngItemCount}
                                        />
                                    </div>

                                    <div className="row">
                                        <div id="btnAddType" style={{cursor:'pointer'}}   onClick={() => this.saveThisIngredient()} className="aqua_blue_button font_size_small">Add Ingredient
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        );
    }

    validateShopMenuproducts(pro_id, is_show_to_menu, product_price,product_quantity_type) {

        if(pro_id){

            if(product_quantity_type != "Any" && product_quantity_type ){



                if(!this.state.isShowToMenuFlag){

                    if(product_price){

                        return true;

                    }else{

                        alert("Please enter product price")
                        return false;

                    }

                }else{

                    return true;

                }

            }else{

                alert("Please select type of cost, ie whether cost per kilo or packet or grams. Currently selected as 'Any' ")
                return false;
            }



        }else{

            alert("Please select a product")
            return false;
        }

    }
}


class CategoriesNewItem extends React.Component{

    constructor(props){
        super(props)
        this.state={
            items : [],
            isLoading:true,

        };

        this.newCategoryClicked = this.newCategoryClicked.bind(this);
        this.newProductSelected = this.newProductSelected.bind(this);

        //this.viewSelectedItem= this.viewSelectedItem.bind(this);
    }

    fetchShowShopMenuCategories(url,shopid){

        //console.log("categories.js calling shop category of :: "+shopid);
        /*fetch(url,{method:'POST',headers:{
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json',
                'Accept':'application/json',

            },body:JSON.stringify({"shop_id":shopid}
            )})

            .then((response)=>{
                if(!response.ok){
                    throw Error(response.statusText);
                }
                this.setState({isLoading:false});
                return response;
            })
            .then((response)=> response.json())
            .then((parsedJSON) => {

                if(parsedJSON.status){

                    this.showShopMenuCategories(parsedJSON);
                    localStorage.setItem("fetchShopMenuCategories", JSON.stringify(parsedJSON));

                }else{

                    this.setState({
                        errorMsg:parsedJSON.status_msg,
                        hasErrored:true
                    })

                }
            })
            .catch((error)=> {
                console.log("error"+error)
                if(localStorage.getItem("fetchShopMenuCategories")){

                    console.log("cache found loading from storage in categories.js");
                    var shopMenuCategories = localStorage.getItem("fetchShopMenuCategories");
                    this.showShopMenuCategories(JSON.parse(shopMenuCategories));

                }else{

                    this.setState({hasErrored:true})
                }


            });
*/


        makeApiCall(url,{"shop_id":shopid}).then((response)=> response.json())
            .then((parsedJSON) => {

                if(parsedJSON.status){

                    this.showShopMenuCategories(parsedJSON);
                    localStorage.setItem("fetchShopMenuCategories", JSON.stringify(parsedJSON));

                }else{

                    this.setState({
                        errorMsg:parsedJSON.status_msg,
                        hasErrored:true
                    })

                }
            })
            .catch((error)=> {
                //console.log("error"+error)
                if(localStorage.getItem("fetchShopMenuCategories")){

                    //console.log("cache found loading from storage in categories.js");
                    var shopMenuCategories = localStorage.getItem("fetchShopMenuCategories");
                    this.showShopMenuCategories(JSON.parse(shopMenuCategories));

                }else{

                    this.setState({hasErrored:true})
                }


            });

    };

    componentDidMount(){

        var shop_id = localStorage.getItem("shop_id")

        this.fetchShowShopMenuCategories('fetchShopMenuCategories',shop_id);


    }



    showShopMenuCategories(parsedJSON){

        //alert(prodctsJson);

        //console.log("parsedJSON ::: "+JSON.stringify(parsedJSON));
        if(parsedJSON.results.length>0){

            var items  =  parsedJSON.results.map(


                main_menu => (



                    {
                        itemID : `${main_menu.itemID}`,
                        itemName : `${main_menu.itemName}`,
                        itemColor : `${main_menu.itemColor}`,

                    }
                )






            )

            //alert(items);
            this.setState({
                items,
                isLoading:false
            },()=>{
                //this.subMenu(0);
            })


        }else{

            this.setState({

                isLoading:false
            })


        }



    }

    newProductSelected(categoryId){

        //alert("newProductSelected"+categoryId);
        //console.log("newCategoryClicked : "+categoryId);
        //console.log("newCategoryClicked_selectedIndex : "+this.selectedIndex);
        //this.selectedIndex = categoryId;
        /*this.setState({
            selectedIndex: categoryId},() => {
        })
*/

        // this.setState({selectedIndex : categoryId,})

        //console.log("newCategoryClicked_selectedIndex : "+this.selectedIndex);


    }




    newCategoryClicked(e){

        //console.log("newCategoryClicked : "+e.target.getAttribute('data-key'));
        /*this.setState({
            selectedIndex: e.target.getAttribute('data-key')},() => {
        })*/



        this.props.onChangeCategory(e.target.getAttribute('data-key'))
    }
    render() {

        return (

            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6" id="category_div" style={{paddingBottom:'5px'}} >

                <div class="" style={{marginTop:'10px'}}>

                    <div class="row">
                        <div class="col-md-7">Categories</div>
                        <div class="col-md-5 nopadding">
                            <div id="btnAddType" class="white_button2 font_size_small" style={{display:'none'}}>

                            </div>
                        </div>
                    </div>

                    <div class="category_sctn">


                        {this.state.items.length>0?
                            this.state.items.map((menu, index) => (


                                <div className="box">
                                    <label id="brn1" className="container_chk">{menu.itemName}
                                        <input
                                            type="checkbox"
                                            id="chk1"
                                            checked={menu.itemID == this.props.checked}
                                            onClick={this.newCategoryClicked}
                                            data-key={menu.itemID}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    {/* <span class="close_icon"><img src="images/close-button.svg"/></span> */}
                                </div>


                            )): <div style={{background: '#ffffff'}}>
                                <div style={{marginTop: '5%', marginLeft: '5%'}}>Loading category
                                </div>
                            </div>

                        }






                    </div>

                </div>
            </div>

        );
    }


}

export default NewItem;