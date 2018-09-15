import React from 'react';
import BillHeader from './Billing/BillHeader.js';
import BillDiv from './Billing/BillDiv.js';
import Orders from './Billing/Orders.js';
import BillGenerateDiv from './Billing/BillGenerateDiv'
import MenuHeader from './Billing/MenuHeader.js';
import MenuSection from './Billing/MenuSection.js';
import {withRouter} from "react-router-dom";
import BillView from "./Billing/BillView";

class BillingSection extends React.Component {

    constructor(){
        super()
            this.state={
                items : [],
                billDetails : '',
                visibilityPopup: false,
                key: 1
            };
       this.parentHandler= this.parentHandler.bind(this);
       this.billableItems= this.billableItems.bind(this);
       this.togglePopup= this.togglePopup.bind(this);
       this.clearData= this.clearData.bind(this);
    }

    togglePopup(visibility) {
        this.setState({
            visibilityPopup: visibility,
        },()=>{
        });
    }

    clearData() {
        this.setState({
            items: [],
            billDetails : '',
            key: Math.random()
        },()=>{

        });
    }

    parentHandler(values) {

        // console.log("bill items "+values.discountPercent);
        // console.log("bill items "+values.discountValue);
        // console.log("bill items "+values.packingCharges);
        // console.log("bill items "+values.total_Amnt);
        // console.log("bill items "+values.netAmnt);

        this.setState({
            visibilityPopup : true,
            billDetails : values
        },()=>{
            if(document.getElementById("custName"))
            document.getElementById("custName").value = "";

            if(document.getElementById("custPhone"))
            document.getElementById("custPhone").value = "";
            //console.log("parentHandler");
        });


    };

    billableItems(itemsToBeAdded) {
        let itemAddFlag=false;
        let selectData = JSON.parse(JSON.stringify(itemsToBeAdded))

        if(Object.keys(this.state.items).length == 0 )
            {
                selectData.quantity = 1;
                this.setState({items: [...this.state.items, selectData]},() => {
                    //(console.log("this.state.items new item"+JSON.stringify(this.state.items)))
                });

            }
        else{

            this.state.items.map((item) => {
                if(selectData.subItemID == item.subItemID){
                    item.quantity = parseFloat(item.quantity)+1
                    itemAddFlag = true;
                    this.setState({trigger:true});
                }
            })
             
            if(!itemAddFlag){
                    selectData.quantity = 1;
                    this.setState({items: [...this.state.items, selectData]},() => {
                                    //(console.log("this.state.items new item"+JSON.stringify(this.state.items)))
                                });
                }
            }

    };

   render() {
        //console.log("height BillingSection"+this.props.data.height)
      return (
            <div className="row">
                <Bill key={this.state.key} data={this.props.dimensions} handler={this.parentHandler} addedItems = {this.state.items}/>
                {/* <OrderList data={this.props.dimensions}/> */}
                <Menu  data={this.props.dimensions} itemAddingHandler={this.billableItems}/>

                <BillView
                    addedItems = {this.state.items}
                    billDetails = {this.state.billDetails}
                    data={this.props.dimensions}
                    handler={this.togglePopup}
                    clear={this.clearData}
                    visibility={this.state.visibilityPopup}
                />

            </div>
      );
   }
}

class Bill extends React.Component {

    constructor(){
        super()
        this.state={
            items : [],
        };
        this.childHandler= this.childHandler.bind(this);
    }

    childHandler(values) {

        this.props.handler(values)

    };

    render() {

        const divStyleBill = {
            height : this.props.data.height+'px',
        } 

       return (
             <div id="bill" className="col-sm-4 col-md-4 col-lg-4 col-xl-4 nopadding borderRight" style={divStyleBill}>
                   <BillHeader/>
                   <BillDiv dimen={this.props.data} handler={this.childHandler} data={this.props.addedItems}/>
             </div>
       );
    }
 }

 //this is not included
 class OrderList extends React.Component {
    render() {

        const divStyleBill = {
            height : this.props.data.height+'px',
        } 
       return (
            <div id="orders" className="col-sm-3 col-md-3 col-lg-3 col-xl-3 nopadding borderRight" style={{background:'#f2f2f2'}}>
                <div id="orderHeader" className="sub_header nopadding">
                    <span style={{marginLeft:'15px', padding:'5px'}} className="blueFont normal font_size_med">Order List</span>
                </div> 
                <Orders dimens={this.props.data}/>               
            </div>
       );
    }
 }

 class Menu extends React.Component {
    render() {

        const divStyleBill = {
            height : this.props.data.height+'px',
            background:'#3674d4'
        } 
       return (
            <div className="col-sm-8 col-md-8 col-lg-8 col-xl-8 nopadding borderRight" style={{divStyleBill}}>
               <MenuHeader/>
               <MenuSection dimens={this.props.data} handler={this.props.itemAddingHandler}/>
            </div>
       );
    }
 }


export default BillingSection;