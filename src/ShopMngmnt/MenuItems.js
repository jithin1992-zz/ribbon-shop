import React from 'react';
import { makeApiCall } from '../Actions/ApiCalls';
import trash from '../images/delete.png';

class MenuItems extends React.Component {

    constructor(){

        super()
            this.state={
                items : [],
                isLoading:true
            };
       this.menuItemSelected= this.menuItemSelected.bind(this);
       this.deleteItemSelected= this.deleteItemSelected.bind(this);
    }

   /* fetchData(url){
        fetch(url)
            .then((response)=>{
                if(!response.ok){
                    throw Error(response.statusText);
                }
                this.setState({isLoading:false});
                return response;
            })
            .then((response)=> response.json())
            .then((parsedJSON) => ( parsedJSON.status ?     
                    parsedJSON.results.map(
                        main_menu => (
                                {
                                    itemID : `${main_menu.itemID}`,
                                    itemName : `${main_menu.itemName}`,
                                    itemColor : `${main_menu.itemColor}`,
                                    itemSubCategory : main_menu.subCategory,

                                }
                            )
                        ) : this.setState({
                            errorMsg:parsedJSON.status_msg,
                            hasErrored:true
                        }))
            ).then((items)=> {
                this.setState({
                    items,
                    isLoading:false
                },()=>{
                    this.menuItemSelected(0,this.state.items[0].itemSubCategory[0])
                })
            }).catch((error)=> {
                //console.log("error"+error)
                this.setState({hasErrored:true})
            });
             
    
    };
*/

    fetchDataFullShopProducts(url,shopid){
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

                    this.showShopMenuSectionProducts(parsedJSON);
                    localStorage.setItem("todaysmenu", JSON.stringify(parsedJSON));

                }else{

                    this.setState({
                        errorMsg:parsedJSON.status_msg,
                        hasErrored:true
                    })

                }
            })
            .catch((error)=> {
                //console.log("error"+error)
                this.setState({hasErrored:true})
            });*/

            makeApiCall(url,({"shop_id":shopid})).then((response)=> response.json())
                .then((parsedJSON) => {

                    if(parsedJSON.status){

                        this.showShopMenuSectionProducts(parsedJSON);
                        localStorage.setItem("todaysmenu", JSON.stringify(parsedJSON));

                    }else{

                        this.setState({
                            errorMsg:parsedJSON.status_msg,
                            hasErrored:true
                        })

                    }
                })
                .catch((error)=> {
                    //console.log("error"+error)
                    this.setState({hasErrored:true})
                });



    };


    componentDidMount(){


        //localStorage.setItem("user_id","6600");
        //localStorage.setItem("shop_id","SHOP00000120");

        if(localStorage.getItem("todaysmenu")){

            //console.log("cache found loading from storage menu items");
            var json = localStorage.getItem("todaysmenu");
            this.showShopMenuSectionProducts(JSON.parse(json));

        }else{

            //console.log("cache not found calling through network menu items");

            var shop_id = localStorage.getItem("shop_id")
            //this.fetchDataFullShopProducts('fetchShopMenuListFull','SHOP00000120');
            this.fetchDataFullShopProducts('fetchShopMenuListFull',shop_id);

        }

     }



    updateShopUi(){

        //console.log("updateShopUi MenuItems");

        if(localStorage.getItem("todaysmenu")){

            //console.log("cache found loading from storage menu items");
            var json = localStorage.getItem("todaysmenu");
            this.showShopMenuSectionProducts(JSON.parse(json));

        }else{



        }


    }



    showShopMenuSectionProducts(parsedJSON){

        //alert(prodctsJson);

        //console.log("parsedJSON menu items::: "+JSON.stringify(parsedJSON));

        if(parsedJSON.results.length>0){

            var items  =   parsedJSON.results.map(
                main_menu => (
                    {
                        itemID : `${main_menu.itemID}`,
                        itemName : `${main_menu.itemName}`,
                        itemColor : `${main_menu.itemColor}`,
                        itemSubCategory : main_menu.subCategory,

                    }
                )
            )

            //alert(items);

            this.setState({
                items:items,
                isLoading:false
            },()=>{
                this.menuItemSelected(0,this.state.items[0].itemSubCategory[0])
            })

        }else{

            this.setState({
                items:[],
                isLoading:false
            },()=>{
                //this.menuItemSelected(0,[])
            })

        }





    }


    menuItemSelected(index,seleItem){

        let seleItemCategory = this.state.items[index].itemName;
        //console.log("menu items :: "+seleItemCategory);

        this.setState({
            selectedItem:seleItem,
            page: 'NEW_ENTRY_PAGE'
        },() => {
            this.props.selectedItemHandler(this.state.selectedItem,seleItemCategory,this.state.items);
            this.props.handler(this.state.page);
            ////console.log("selected item _ StockList"+this.state.selectedItems)
        })     
    }

    deleteItemSelected(index,seleItem,subIndex){

        //let seleItemCategory = this.state.items[index].itemName;
        //console.log("deleteItemSelected :: "+JSON.stringify(this.state.items[index]));



        var shop_id = localStorage.getItem("shop_id");
        var r = "Do you want to delete product from your shop?!";
        if (r == true) {

            var pro_id  = this.state.items[index].itemSubCategory[subIndex].subItemID;

            makeApiCall("removeFromStock",{"pro_id": pro_id,"shop_id":shop_id})
                .then((response) => response.json())
                .then((parsedJSON) => {

                    //console.log("addShopMenuproducts _ responce :: " + JSON.stringify(parsedJSON))
                    if (parsedJSON.status == "true") {


                        /*// var array = this.state.items;
                        //
                        // array.splice(index, 1);
                        //
                        // this.setState({items: array});
                        // var json = this.state.items;
                        //
                        // json[index].itemSubCategory.splice(subIndex, 1);
                        // localStorage.setItem("todaysmenu",JSON.stringify(json));
                        // this.setState({items: json});

                        var json = localStorage.getItem("todaysmenu");
                        json = JSON.parse(json);
                        var results = json.results;
                        results[index].itemSubCategory.splice(subIndex, 1);
                        localStorage.setItem("todaysmenu",JSON.stringify(json));
                        this.setState({items: results});
                        // var json = this.state.items;
                        //
                        // for(var j=0;j<this.state.items[index].itemSubCategory.length;j++){
                        //
                        //     if(this.state.items[index].itemSubCategory[j].subItemID==pro_id){
                        //
                        //
                        //     }
                        // }
*/



                        var shopJson = {};
                        shopJson["status"] = "true";
                        shopJson["status_desc"] = "true";
                        shopJson["results"] = parsedJSON.results;

                        localStorage.setItem("todaysmenu", JSON.stringify(shopJson));

                        var json = localStorage.getItem("todaysmenu");
                        this.showShopMenuSectionProducts(JSON.parse(json));


                    }else{

                        alert(parsedJSON.status_desc)
                    }
                }).catch(function (e) {
                //console.error('Error during delete  product:', e);
                alert("Unable to delete  product . Please try again later")
            });

        } else {

        }





        // this.setState({
        //     selectedItem:seleItem,
        //     page: 'NEW_ENTRY_PAGE'
        // },() => {
        //     this.props.selectedItemHandler(this.state.selectedItem,seleItemCategory,this.state.items);
        //     this.props.handler(this.state.page);
        //     ////console.log("selected item _ StockList"+this.state.selectedItems)
        // })
    }


    render() {

        const divStyle = {
            height : this.props.data.height-80+'px',
            padding:'5px'
        } 


        return (
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 nopadding">

                <div className="row">
                    <div className="col-md-7 blueFont" style={{marginTop: 'auto',marginBottom: 'auto'}} >My Menu Items</div>
                    <div className="col-md-5 nopadding" style={{display:'none'}} >
                        <div id="btnAddType"  style={{cursor:'pointer'}}  className="blue_button font_size_small">
                            Add Products
                        </div>
                    </div>
                </div>
                
                <div id="sub-menu" className="subMenu scroll" style={divStyle}>   
                        <div id="" className="row nopadding "> 
                        
                            {this.state.items.map((menu,index) => (
                                menu.itemSubCategory.map((item,subIndex)=>(

                                    <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4 nopadding' onClick={()=>this.menuItemSelected(index,item)}>
                                        <div className='card text_center nopadding'  style={{height:'180px',background : '#ffffff'}}>
                                            <div>
                                                <span id='itemId' className='thin font_size_small blueFont'>#{item.subItemID}</span>
                                                <div align='right' onClick={()=>this.deleteItemSelected(index,item,subIndex)} style={{flex: '1', float: 'right', clear: 'right', position: 'relative',paddingRight:'8px'}}>
                                                    <img src = { trash } className='xxsmall_icon_unpadded'/>
                                                </div>
                                            </div>
                                            <span id='itemName' className='normal font_size_large uppercase blackFont'>{item.name}</span>
                                            <span id='itemDesc'
                                                  className='thin font_size_small grayFont lowercase ellipsis'>{item.desc}</span>

                                            <span id='itemPrice' className='thick font_size_large orangeFont'>{menu.itemName}</span>
                                            <span id='itemPrice' className='thick font_size_large aquaFont'>Rs{item.price}/-</span>      
                                        </div>                                                                      
                                    </div>

                                ))
                            )) }  
        
                        </div>                      
                </div>
            </div>
        );
     }

    }

    export default MenuItems;