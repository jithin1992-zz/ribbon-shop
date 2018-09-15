import React from 'react';
import StockList from './Stock/StockList';
import StockUpdate from './Stock/StockUpdate';
import StockNewEntry from './Stock/StockNewEntry';
import {makeApiCall} from "./Actions/ApiCalls";

class StockSection extends React.Component {

    constructor(){
        super()
        this.state={
            items : [],
            selectedStock : [],
            active : 'UPDATE_PAGE'
        };

        this.selectedStockHandler= this.selectedStockHandler.bind(this);

        //this.fetchData= this.fetchData.bind(this);
        this.fetchDataStockProducts= this.fetchDataStockProducts.bind(this);
        this.updateUi= this.updateUi.bind(this);
        //this.stockAdded = React.createRef();

        this.handleToggle= this.handleToggle.bind(this);
    }

    /*fetchData(url){
        fetch(url, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then((response)=>{
                if(!response.ok){
                    throw Error(response.statusText);
                }
                this.setState({isLoading:false});
                return response;
            })
            .then((response)=> response.json())
            .then((parsedJSON) => {

                if (parsedJSON.status) {
                    this.showStockProducts(parsedJSON);

                }else{
                    this.setState({
                        errorMsg:parsedJSON.status_msg,
                        hasErrored:true
                    })
                }

            })
            .catch((error)=> {
                console.log("error"+error)
                this.setState({hasErrored:true})
            });
             
    
    };*/

    fetchDataStockProducts(url,shopid){

        makeApiCall(url,({"shop_id":shopid})).then((response)=> response.json())
            .then((parsedJSON) => {

                if(parsedJSON.status){

                    this.showStockProducts(parsedJSON);
                    //localStorage.setItem("todaysmenu", JSON.stringify(parsedJSON));

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

    updateUi(){

        //console.log("updateUi");
        var json = localStorage.getItem("todaysmenu");
        this.showStockProducts(JSON.parse(json));

    }



    componentDidMount(){
        //this.fetchData('./stock.json');
        //this.fetchData('http://50.112.43.161:8080/ribbon_api/api/listProducts');
        if(localStorage.getItem("todaysmenu")){

            //console.log("cache found loading from storage menu items");
            var json = localStorage.getItem("todaysmenu");
            this.showStockProducts(JSON.parse(json));

        }else{

            //console.log("cache not found calling through network menu items");

            var shop_id = localStorage.getItem("shop_id")
            //this.fetchData('http://50.112.43.161:8080/ribbon_api/api/fetchShopMenuListFull','SHOP00000120');
            this.fetchDataStockProducts('fetchShopMenuListFull',shop_id);

        }
    }

    showStockProducts(parsedJSON) {

        //alert(prodctsJson);
        if (parsedJSON.results.length > 0) {

            //console.log("parsedJSON menu items in if::: "+JSON.stringify(parsedJSON));
            var items = parsedJSON.results.map(
                stock_list => (
                    {
                        /*itemID : `${stock_list.itemID}`,
                        itemName : `${stock_list.itemName}`,
                        itemUpdatedDate : `${stock_list.itemUpdatedDate}`,
                        itemUpdatedPerson : `${stock_list.itemUpdatedPerson}`,
                        itemQuantity : `${stock_list.itemQuantity}`,
                        itemUnit : `${stock_list.itemUnit}`,*/
                        subCategory: stock_list.subCategory,
                    }
                )
            )


            //alert(items);

            this.setState({
                items,
                isLoading: false
            }, () => {
                this.selectedStockHandler(this.state.items[0].subCategory[0])
            })
        }else{

            this.setState({
                isLoading:false
            })
        }

    }

    selectedStockHandler(selectedItem){
        this.setState({selectedStock: selectedItem},() => {
            //console.log("selected item _ stockSection in >"+this.state.selectedStock)
         })
    }

    handleToggle(page) {
        //var active = this.state.active;
        var active = page;
        var newActive = active === 'UPDATE_PAGE' ? 'NEW_ENTRY_PAGE' : 'UPDATE_PAGE';
        this.setState({active: newActive},() => {
         }) 
    }

    render() {
      var active = this.state.active;


      return (

        <div className="row nopadding" >
            <StockList data={this.props.dimensions} toggleHandler={this.handleToggle} stockItems={this.state.items} viewSelectedItemHandler={this.selectedStockHandler}/>
            { active === 'UPDATE_PAGE' ? (
                    <StockUpdate  updateUi={this.updateUi} data={this.props.dimensions} itemToEdit={this.state.selectedStock} toggleHandler={this.handleToggle}/>
                ) : active === 'NEW_ENTRY_PAGE' ? (
                    <StockNewEntry data={this.props.dimensions} />
                ) : null
            }
        </div>
      )
    }
}

export default StockSection;