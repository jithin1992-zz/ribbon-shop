import React from 'react';
import { makeApiCall } from '../Actions/ApiCalls';

import empty from '../images/empty.png'
class MenuSection extends React.Component {

    constructor() {
        super()
        this.state = {
            menuSelectedItem: []
        };
        this.viewSelectedItem = this.viewSelectedItem.bind(this);
    }

    viewSelectedItem(selectedItem) {
        this.setState({ menuSelectedItem: selectedItem }, () => {
        });
    };

    render() {
        return (
            <div class="nopadding" style={{ display: 'flex', width: '100%' }}>
                <SubMenu data={this.props.dimens} selectedMenuItem={this.state.menuSelectedItem} itemAddingHandler={this.props.handler} />
                <MainMenu data={this.props.dimens} viewSelectedItemHandler={this.viewSelectedItem} />
            </div>
        );
    }
}

class MainMenu extends React.Component {

    constructor() {
        super()
        this.state = {
            items: [],
            isLoading: true,
            noItems: false,
        };
        this.subMenu = this.subMenu.bind(this);
        this.fetchCashierDetails = this.fetchCashierDetails.bind(this);
        this.fetchGstDetails = this.fetchGstDetails.bind(this);

    }

    /*fetchData(url){
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
                    this.subMenu(0);
                })
            }).catch((error)=> {
                ////console.log("error"+error)
                this.setState({hasErrored:true})
            });
             
    
    };*/


    fetchDataFullShopProducts(url, shopid) {


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
                ////console.log("error"+error)
                this.setState({hasErrored:true})
            });*/


        makeApiCall("fetchShopMenuListFull", ({ "shop_id": shopid })).then((response) => response.json())
            .then((parsedJSON) => {

                ////console.log("fetchShopMenuListFull responce : "+parsedJSON)

                if (parsedJSON.status == "true") {

                    if (parsedJSON.results.length > 0) {



                        localStorage.setItem("todaysmenu", JSON.stringify(parsedJSON));
                        this.showShopMenuSectionProducts(parsedJSON);

                    } else {

                        localStorage.setItem("todaysmenu", "");
                        ////console.log("fetchShopMenuListFull in else");
                        this.setState({
                            hasErrored: true,
                            isLoading: false,
                            noItems: true,
                        }, () => {
                            //console.log("noItems : "+this.state.noItems);
                        });
                    }


                } else {

                    localStorage.setItem("todaysmenu", "");
                    //console.log("fetchShopMenuListFull in else1");
                    this.setState({
                        hasErrored: true,
                        isLoading: false,
                        noItems: true,
                    }, () => {
                        //console.log("noItems : "+this.state.noItems);
                    });

                }

            })
            .catch((error) => {
                //console.log("error"+error)



                this.setState({
                    hasErrored: true,
                    isLoading: false,
                    noItems: true,
                }, () => {
                    //console.log("noItems : "+this.state.noItems);
                });

            });


    };


    async fetchShopMenuAsny(url, shopid) {


        //console.log("going to triger asnyc call from menu section "+url);

        /*fetch(url,{method:'POST',headers:{
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'application/json',
                    'Accept':'application/json',

                },body:JSON.stringify({"shop_id":shopid}
                )})

                .then((response)=>{
                    if(!response.ok){
                        //throw Error(response.statusText);
                    }
                    //this.setState({isLoading:false});
                    return response;
                })
                .then((response)=> response.json())
                .then((parsedJSON) => {

                    if(parsedJSON.status){

                        //this.showShopMenuSectionProducts(parsedJSON);
                        //console.log("asnyc call responce is going to save "+JSON.stringify(parsedJSON));

                        localStorage.setItem("todaysmenu", JSON.stringify(parsedJSON));

                    }else{



                    }
                })
*/

        makeApiCall("fetchShopMenuListFull", ({ "shop_id": shopid }))
            .then((response) => response.json())
            .then((parsedJSON) => {

                if (parsedJSON.status) {

                    //this.showShopMenuSectionProducts(parsedJSON);
                    //console.log("asnyc call responce is going to save "+JSON.stringify(parsedJSON));

                    localStorage.setItem("todaysmenu", JSON.stringify(parsedJSON));

                } else {



                }
            })



    }

    async fetchCashierDetails(shopid) {


        //console.log("fetchCashierDetails ");

        makeApiCall("fetchCashier", ({ "shop_id": shopid }))
            .then((response) => response.json())
            .then((parsedJSON) => {

                if (parsedJSON.status) {

                    //this.showShopMenuSectionProducts(parsedJSON);
                    //console.log("fetchCashierDetails responce "+JSON.stringify(parsedJSON));

                    localStorage.setItem("myshopcashiers", JSON.stringify(parsedJSON));

                } else {

                    localStorage.removeItem("myshopcashiers");


                }
            })



    }
    async fetchGstDetails(shopid) {


        //console.log("fetchGstList ");

        makeApiCall("fetchGstList", ({ "shop_id": shopid }))
            .then((response) => response.json())
            .then((parsedJSON) => {

                if (parsedJSON.status) {

                    //this.showShopMenuSectionProducts(parsedJSON);
                    //console.log("fetchGstList responce "+JSON.stringify(parsedJSON));

                    localStorage.setItem("gstDetails", JSON.stringify(parsedJSON));

                } else {



                }
            })



    }


    componentDidMount() {
        //this.fetchData('./data.json');
        //this.fetchData('http://50.112.43.161:8080/ribbon_api/api/listProducts');

        // localStorage.setItem("shop_id","SHOP00000120");
        // localStorage.setItem("user_id","6600");
        // localStorage.setItem("packing_charge","5");

        if (localStorage.getItem("todaysmenu")) {

            //console.log("cache found loading from storage");
            var json = localStorage.getItem("todaysmenu");
            ////console.log("cache found loading from storage : "+JSON.parse(json));

            this.showShopMenuSectionProducts(JSON.parse(json));
            //this.fetchDataFullShopProducts('http://50.112.43.161:8080/ribbon_api/api/fetchShopMenuListFull',"SHOP00000120");
            //localStorage.setItem("shop_id","SHOP00000120");
            //console.log("going to triger asnyc call");

            var shop_id = localStorage.getItem("shop_id")
            this.fetchShopMenuAsny('', shop_id);
            this.timer = setInterval(() => this.fetchShopMenuAsny('', shop_id), 5400000)
            this.fetchCashierDetails(shop_id);
            this.fetchGstDetails(shop_id);

        } else {

            //console.log("cache not found calling through network");

            var shop_id = localStorage.getItem("shop_id")

            this.fetchDataFullShopProducts('', shop_id);
            this.timer = setInterval(() => this.fetchShopMenuAsny('', shop_id), 5400000)

            this.fetchCashierDetails(shop_id);
            this.fetchGstDetails(shop_id);


        }



    }


    showShopMenuSectionProducts(parsedJSON) {

        //alert(prodctsJson);

        //console.log("parsedJSON ::: "+JSON.stringify(parsedJSON));
        if (parsedJSON.results.length > 0) {
            var items = parsedJSON.results.map(


                main_menu => (



                    {
                        itemID: `${main_menu.itemID}`,
                        itemName: `${main_menu.itemName}`,
                        itemColor: `${main_menu.itemColor}`,
                        itemSubCategory: main_menu.subCategory,

                    }
                )






            )

            //alert(items);
            this.setState({
                items,
                isLoading: false,
                noItems: false,
            }, () => {
                this.subMenu(0);
            })

        } else {



            this.setState({
                items: [],
                isLoading: false,
                noItems: true,
            }, () => {
                //console.log("noItems  ::"+this.state.noItems);
            })



        }


    }
    subMenu(index) {

        this.setState({ mainMenuSelectedItem: this.state.items[index] }, () => {
            // //console.log("selected item _ MainMenu"+JSON.stringify(mainMenuSelectedItem))
            this.props.viewSelectedItemHandler(this.state.mainMenuSelectedItem);
        })
    }

    render() {
        const divStyle = {
            height: this.props.data.height - 85 + 'px',
            background: '#ebf5fc',
            width: '25%',
            borderLeft: '1px solid #e1e1e1'
        }
        if (this.state.hasErrored) {
            return <p>{this.state.errorMsg}</p>;
        }

        if (this.state.isLoading) {
            return (<div className="loader">
                <svg viewBox="0 0 32 32" width="32" height="32">
                    <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                </svg>
            </div>);
        }

        return (
            <div class="scroll nopadding" style={divStyle}>
                {this.state.items.length == 0 ?

                    <div style={{ padding: '5px', fontSize: '18px' }}> Menu is empty</div>
                    :


                    this.state.items.map((item, index) => (
                        <div class='menuMainItemDiv' style={{ background: item.itemColor, cursor: 'pointer' }}
                            onClick={() => this.subMenu(index)}>
                            <span class=' thin font_size_large whiteFont' style={{ marginLeft: '5px' }}>{item.itemName}</span>
                        </div>
                    ))
                }
            </div>
        )
    }
}

class SubMenu extends React.Component {

    constructor() {
        super()

        this.state = {
            selectedMenuItem: [],
            itemToAdd: []
        };

        this.itemSelected = this.itemSelected.bind(this);
    }

    itemSelected(itemSelectedtoAdd) {

        this.setState({ itemToAdd: itemSelectedtoAdd }, () => {
            ////console.log("selected item to add _ SubMenu"+JSON.stringify(this.state.itemToAdd))
            this.props.itemAddingHandler(this.state.itemToAdd);
        })

    }

    render() {
        const divStyle = {
            height: this.props.data.height - 85 + 'px',
            width: '75%',
            background: '#ffffff',//this.props.selectedMenuItem.itemColor,
            padding: '3px'
        }

        let obj = this.props.selectedMenuItem.itemSubCategory;
        //console.log("itemSubCategory :: "+this.props.selectedMenuItem.itemSubCategory);
        //console.log("menu details :: "+this.props.selectedMenuItem.itemColor);


        return (
            <div class="subMenu nopadding " style={divStyle}>
                <div class="row nopadding ">
                    {
                        obj === undefined ?
                            (
                                <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 nopadding'>
                                    <div align="center" style={{ marginRight: 'auto', marginLeft: 'auto', webkitTransform: 'translate(0%,40%)', transform: 'translate(0%,40%)' }}>
                                        <img style={{ height: '300px', width: '300px' }} src={empty} className='xxlarge_icon' />
                                    </div>
                                </div>

                            ) : (typeof (obj) == 'object') ?
                                obj.map((item) =>
                                    (
                                        item.is_show_to_menu == "1" ?

                                            <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3 nopadding'>
                                                <div className='card text_center nopadding scroll menuItem' style={{
                                                    height: '150px',
                                                    maxHeight: '150px',
                                                    background: this.props.selectedMenuItem.itemColor,
                                                    cursor: 'pointer'
                                                }} onClick={() => this.itemSelected(item)}>
                                                    {/*<span id='itemId'*/}
                                                    {/*className='thin font_size_small whiteFont'>#{item.subItemID}</span>*/}
                                                    <span id='itemName'
                                                        className='normal font_size_large uppercase whiteFont'>{item.name}</span>
                                                    <span id='itemDesc'
                                                        className='thin font_size_small whiteFont lowercase ellipsis'>{item.desc}</span>
                                                    <span id='itemPrice'
                                                        className='thick font_size_large whiteFont'>Rs{item.price}/-</span>
                                                </div>
                                            </div>

                                            : ""

                                    )
                                )
                                :
                                (
                                    null
                                )
                    }
                </div>
            </div>
        );
    }
}

export default MenuSection;
