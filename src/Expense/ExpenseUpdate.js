import React from 'react';
import FloatingLabel from 'floating-label-react'
import {makeApiCall} from "../Actions/ApiCalls";

class ExpenseUpdate extends React.Component {


    constructor(){
        super()
        this.state={
            items : [],
            page : 'UPDATE_PAGE',
            selectedExpenseID : "",
            selectedExpenseName : "",
            selectedExpenseType : "",
            selectedExpenseUpdatedPerson : "",
            selectedExpenseQuantity : "",
            selectedExpenseUnit : "",
            selectedExpenseAmount : "",
            selectedExpenseUpdatedDate : "",
            loading:false,

        };

        this.updateInputValue= this.updateInputValue.bind(this);

        this.toggleClickHandler= this.toggleClickHandler.bind(this);

        this.updateStockData= this.updateStockData.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        ////console.log("selected item _ StockUpdate"+JSON.stringify(nextProps.itemToEdit));

        if(nextProps.itemToEdit){


            this.setState({
                selectedExpenseID: nextProps.itemToEdit.expenseID,
                selectedExpenseName: nextProps.itemToEdit.expenseName,
                selectedExpenseType: nextProps.itemToEdit.expenseType,
                selectedExpenseUpdatedPerson: nextProps.itemToEdit.expenseUpdatedPerson,
                selectedExpenseQuantity: nextProps.itemToEdit.expenseQuantity,
                selectedExpenseUnit: nextProps.itemToEdit.expenseUnit,
                selectedExpenseAmount: nextProps.itemToEdit.expenseAmount,
                selectedExpenseUpdatedDate: nextProps.itemToEdit.expenseUpdatedDate
            },() => {
                ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
            })

        }

    }

    updateInputValue(value, key) {

            // this.setState((previousState) => {
            //   const selectedStockData = previousState.selectedStockData
            //   return { selectedStockData: {selectedStockData, [key]: value} }
            // })

            if(key == 'expenseName'){


                this.setState({
                    selectedExpenseName: value,

                },() => {
                })
            }else if(key == 'expenseQuantity'){

                var unit = this.state.selectedExpenseUnit;
                var qty = value;
                var totalAmount = parseFloat(unit)*parseFloat(qty);
                this.setState({
                    selectedExpenseQuantity: value,
                    selectedExpenseAmount: totalAmount,
                    },() => {
                }) 
            }
            else if(key == 'expenseUnit'){


                var unit = value;
                var qty = this.state.selectedExpenseQuantity;
                var totalAmount = parseFloat(unit)*parseFloat(qty);

                this.setState({
                    selectedExpenseUnit: value,
                    selectedExpenseAmount: totalAmount,
                    },() => {
                })
            }
            else if(key == 'expenseAmount'){
                // this.setState({
                //     selectedExpenseAmount: value,
                //     },() => {
                // })
            }

    }   

    toggleClickHandler(){

        this.setState({page: 'UPDATE_PAGE'},() => {
            this.props.toggleHandler(this.state.page);
        })  

    }

    updateStockData(){

       //console.log("ID: "+this.state.selectedExpenseID);
       //console.log("ID: "+this.state.selectedExpenseName);
       //console.log("ID: "+this.state.selectedExpenseType);
       //console.log("ID: "+this.state.selectedExpenseUpdatedPerson);
       //console.log("ID: "+this.state.selectedExpenseQuantity);
       //console.log("ID: "+this.state.selectedExpenseUnit);
       //console.log("ID: "+this.state.selectedExpenseAmount);
       //console.log("ID: "+this.state.selectedExpenseUpdatedDate);


       if(this.state.selectedExpenseName,this.state.selectedExpenseQuantity,this.state.selectedExpenseUnit,this.state.selectedExpenseUpdatedDate,this.state.selectedExpenseType){


           this.setState({

               loading: true
           })

           makeApiCall("updateShopExpense",{"expens_type":this.state.selectedExpenseType,"expens_id":this.state.selectedExpenseID,"expens_name":this.state.selectedExpenseName,"expens_units":this.state.selectedExpenseUnit,"quantity":this.state.selectedExpenseQuantity,"amount":this.state.selectedExpenseAmount.toString()}).then((response)=> response.json())
               .then((parsedJSON) => {

                   if(parsedJSON.status == "true"){



                       this.props.afterUpdate();
                       alert(parsedJSON.status_desc);


                   }else{



                       alert(parsedJSON.status_desc);


                   }
                   this.setState({

                       loading: false
                   })

               }).catch(function(e) {
               //console.error('Error during addNewProductByShop:', e);
               alert("Unable to load expense details now now. Please try again later");
               this.setState({

                   loading: false
               })


           });

       }


    }


    validation(selectedStockName,selectedStockQuantity,selectedStockUnits,selectedStockUpdatedDate,selectedStockType){



        if(selectedStockName){

            if(selectedStockQuantity){


                if(selectedStockUnits){

                    if(selectedStockUpdatedDate){

                        if(selectedStockType){

                            return true;

                        }else{

                            alert("Please enter  expense type");
                            return false;
                        }



                    }else{

                        alert("Please enter date");
                        return false;
                    }



                }else{

                    alert("Please enter number of  units");
                    return false;
                }



            }else{

                alert("Please enter item price per unit");
                return false;
            }

        }else{

            alert("Please enter item name");
            return false;
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
              width: '100%',
            },
            label: {
              marginTop: '.5em',
              width: '100%'
            },
            height:'100%'
        }

        const divStyle = {
            height : this.props.data.height-55+'px',
            background : '#ffffff'
        } 

        return (
            <div id="stockUpdateDiv" className="col-sm-4 col-md-4 col-lg-4 col-xl-4 nopadding">
            <div className="card" style={divStyle}>


                {this.state.loading == true ?

                    <div className="loader">
                        <svg viewBox="0 0 32 32" width="32" height="32">
                            <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                        </svg>
                    </div>

                    : <div>
                        <div id='expenseGenerateDiv' className="col-sm-12 col-md-12 col-lg-12 col-xl-12 nopadding"
                             style={{paddingBottom: '15px'}}>
                            <div className="card" style={{height: '100%'}}>
                                <div style={{display: 'flex', width: '100%', marginBottom: '10px'}}>
                                    <div className="nopadding" style={{width: '70%'}}>
                                    </div>
                                    <div align="right" className="nopadding" style={{width: '50%'}}
                                         onClick={() => this.toggleClickHandler()}>
                                        <div style={{width: '100%'}}>
                                            <span id='newEntry' className='reportBtn thick'>New Expense Entry</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div style={{marginBottom: '10px', width: '100%'}}>
                                        {/*<FloatingLabel
                                            key={Math.random()}
                                            id='expenseName'

                                            name='expenseName'
                                            placeholder='Expense Name'
                                            type='text'
                                            styles={inputStyle}
                                            value={this.state.selectedExpenseName}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'expenseName')
                                            }}
                                        />*/}
                                        <span className="blackFont font_size_xsmall">Expense Name</span>

                                        <input
                                            id='expenseName'
                                            name='expenseName'
                                            placeholder='Expense Name'
                                            type='text'
                                            style={{
                                                width: "100%",
                                                border: "none",
                                                color: "#3674d4",
                                                borderBottom: "1px solid #ebf5fc"
                                            }}
                                            value={this.state.selectedExpenseName}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'expenseName')
                                            }}
                                        />
                                    </div>
                                    <div style={{marginBottom: '10px', width: '100%'}}>
                                        <FloatingLabel
                                            key={Math.random()}
                                            id='expenseType'
                                            readOnly={true}
                                            name='expenseType'
                                            placeholder='Expense Type'
                                            type='text'
                                            styles={inputStyle}
                                            value={this.state.selectedExpenseType}
                                        />
                                    </div>
                                    <div style={{display: 'flex', width: '100%', marginBottom: '10px'}}>
                                        <div style={{width: '50%', marginRight: '10px'}}>
                                            {/*<FloatingLabel
                                                key={Math.random()}
                                                id='expenseQuantity'
                                                name='expenseQuantity'
                                                placeholder='Quantity'
                                                type='text'
                                                styles={inputStyle}
                                                value={this.state.selectedExpenseQuantity}
                                                onChange={(e) => {
                                                    this.updateInputValue(e.target.value, 'expenseQuantity')
                                                }}
                                            />*/}
                                            <span className="blackFont font_size_xsmall">Quantity</span>

                                            <input
                                                id='expenseQuantity'
                                                name='expenseQuantity'
                                                placeholder='Quantity'
                                                type='text'
                                                style={{
                                                    width: "100%",
                                                    border: "none",
                                                    color: "#3674d4",
                                                    borderBottom: "1px solid #ebf5fc"
                                                }}
                                                value={this.state.selectedExpenseQuantity}
                                                onChange={(e) => {
                                                    this.updateInputValue(e.target.value, 'expenseQuantity')
                                                }}
                                            />
                                        </div>

                                        <div style={{width: '50%', marginLeft: '10px'}}>
                                            {/*<FloatingLabel
                                                key={Math.random()}
                                                id='expenseUnit'
                                                name='expenseUnit'
                                                placeholder='Units'
                                                type='text'
                                                styles={inputStyle}
                                                value={this.state.selectedExpenseUnit}
                                                onChange={(e) => {
                                                    this.updateInputValue(e.target.value, 'expenseUnit')
                                                }}
                                            />*/}

                                            <span className="blackFont font_size_xsmall">Units</span>

                                            <input
                                                id='expenseUnit'
                                                name='expenseUnit'
                                                placeholder='Units'
                                                type='number'
                                                style={{
                                                    width: "100%",
                                                    border: "none",
                                                    color: "#3674d4",
                                                    borderBottom: "1px solid #ebf5fc"
                                                }}
                                                value={this.state.selectedExpenseUnit}
                                                onChange={(e) => {
                                                    this.updateInputValue(e.target.value, 'expenseUnit')
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/*<div style={{marginBottom:'10px',width:'100%'}}>*/}
                                    {/*<FloatingLabel*/}
                                    {/*key={Math.random()}*/}
                                    {/*id='expenseAmount'*/}
                                    {/*name='expenseAmount'*/}
                                    {/*placeholder='Expense Amount'*/}
                                    {/*type='text'*/}
                                    {/*readonly='true'*/}
                                    {/*styles={inputStyle}*/}
                                    {/*value={this.state.selectedExpenseAmount}*/}
                                    {/*onChange = {(e) => {this.updateInputValue(e.target.value, 'expenseAmount')}}*/}
                                    {/*/>  */}
                                    {/*</div> */}
                                    <div style={{marginBottom: '10px', width: '100%'}}>
                                        <FloatingLabel
                                            key={Math.random()}
                                            id='itemAddedDate'
                                            name='itemAddedDate'
                                            placeholder='Date'
                                            type='text'
                                            readOnly={true}
                                            styles={inputStyle}
                                            value={this.state.selectedExpenseUpdatedDate}
                                        />
                                    </div>
                                    <div style={{marginBottom: '10px', width: '100%'}}>
                                        <FloatingLabel
                                            key={Math.random()}
                                            id='itemUpdatedPerson'
                                            name='itemUpdatedPerson'
                                            placeholder='Updated Person'
                                            type='text'
                                            readOnly={true}
                                            styles={inputStyle}
                                            value={this.state.selectedExpenseUpdatedPerson}
                                        />
                                    </div>
                                </div>
                                <div style={{marginTop: '20px'}}>
                                    <span onClick={() => this.updateStockData()} id='updateExpense'
                                          className='expenseBtn thick font_size_normal whiteFont'>Update Expense</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }


            </div>
        </div>
        )
    }

}

export default ExpenseUpdate;