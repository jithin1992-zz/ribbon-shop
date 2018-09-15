import React from 'react';
import FloatingLabel from 'floating-label-react'
import {makeApiCall} from "../Actions/ApiCalls";
import DatePicker from 'react-datepicker';
import moment from 'moment';

class ExpenseNewEntry extends React.Component {

    constructor(props){
        super(props)
        this.state={
            items : [],
            page : 'NEW_ENTRY_PAGE',
            selectedStockID : "",
            selectedStockName : "",
            selectedStockQuantity : "",
            selectedStockUnits : "",
            selectedStockUpdateDate : "",
            selectedStockUpdatedPerson : "",
            selectedStockType : "",
            loading:false,
            expenseDate: moment()
        };

        this.updateInputValue= this.updateInputValue.bind(this);
        this.submitExpense= this.submitExpense.bind(this);
        this.changeselectedMenuItemCalType= this.changeselectedMenuItemCalType.bind(this);
        this.handleChange = this.handleChange.bind(this);






    }
    
    componentWillReceiveProps(nextProps){
        ////console.log("selected item _ StockUpdate"+JSON.stringify(nextProps.itemToEdit));



         
    }

    handleChange(date) {
        this.setState({
            expenseDate: date,

            selectedStockUpdatedDate:date.format("DD-MM-YYYY"),
        });
    }



    submitExpense(){


        var selectedStockName = this.state.selectedStockName;
        var selectedStockQuantity = this.state.selectedStockQuantity;
        var selectedStockUnits = this.state.selectedStockUnits;
        var selectedStockUpdatedDate = this.state.selectedStockUpdatedDate;
        var selectedStockUpdatedPerson = this.state.selectedStockUpdatedPerson;
        var selectedStockType = this.state.selectedStockType;

        //console.log("selectedStockName  :: "+selectedStockName);
        //console.log(" selectedStockQuantity :: "+selectedStockQuantity);
        //console.log("selectedStockUnits  :: "+selectedStockUnits);
        //console.log("selectedStockUpdatedDate  :: "+selectedStockUpdatedDate);
        //console.log("selectedStockType  :: "+selectedStockType);


        //var today = new Date();
        //var date_bill = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var date_bill = moment().format('DD-MM-YYYY');


        if(!selectedStockUpdatedDate)
            selectedStockUpdatedDate = date_bill

        //console.log("selectedStockUpdatedDate  :: "+selectedStockUpdatedDate);


        if(this.validation(selectedStockName,selectedStockQuantity,selectedStockUnits,selectedStockUpdatedDate,selectedStockType)){



            var amount = parseFloat(selectedStockQuantity)*parseFloat(selectedStockUnits)

            var shop_id = localStorage.getItem("shop_id")
            var user_id = localStorage.getItem("user_id")


            this.setState({

                loading: true
            })


            makeApiCall("addNewShopExpense",{"user_id":user_id,"shop_id":shop_id,"expens_date":selectedStockUpdatedDate,"expens_type":selectedStockType,"expens_name":selectedStockName,"expens_units":selectedStockUnits,"quantity":selectedStockQuantity,"amount":amount.toString()}).then((response)=> response.json())
                .then((parsedJSON) => {

                    if(parsedJSON.status == "true"){


                        this.props.afterAdd();

                        alert(parsedJSON.status_desc);


                    }else{



                        alert(parsedJSON.status_desc);


                    }
                    this.setState({

                        loading: false
                    })

                }).catch(function(e) {
                //console.error('Error during addNewProductByShop:', e);
                alert("Unable to add expense details now. Please try again later");
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

    changeselectedMenuItemCalType(event){


        //console.log("event.target.value : "+event.target.value)

        this.setState({selectedStockType: event.target.value},() => {
        })
    }

    updateInputValue(value, key) {

            // this.setState((previousState) => {
            //   const selectedStockData = previousState.selectedStockData
            //   return { selectedStockData: {selectedStockData, [key]: value} }
            // })

            if(key == 'itemName'){
                this.setState({selectedStockName: value,
                    },() => {
                }) 
            }
            else if(key == 'itemId'){
                this.setState({
                    selectedStockID: value,
                    },() => {
                })
            }
            else if(key == 'itemQuantity'){
                this.setState({
                    selectedStockQuantity: value,
                    },() => {
                }) 
            }
            else if(key == 'itemUnit'){
                this.setState({
                    selectedStockUnits: value,
                    },() => {
                })
            }
            else if(key == 'itemAddedDate'){
                this.setState({
                    selectedStockUpdatedDate: value,
                    },() => {
                }) 
            }
            else if(key == 'itemUpdatedPerson'){
                this.setState({
                    selectedStockUpdatedPerson: value,
                    },() => {
                })
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

                {this.state.loading == true ?

                    <div className="loader">
                        <svg viewBox="0 0 32 32" width="32" height="32">
                            <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                        </svg>
                    </div>

                    :
                    <div className="card" style={divStyle}>
                        <div id='expenseGenerateDiv' className="col-sm-12 col-md-12 col-lg-12 col-xl-12 nopadding"
                             style={{paddingTop: '15px',paddingBottom: '15px'}}> <div style={{paddingLeft:'15px',fontWeight:'bold',paddingBottom:'2%'}}>New Expense Entry Form</div>
                            <div className="card">
                                <div className="row">


                                    <div style={{marginBottom: '10px', width: '100%'}}>
                                        {/*<FloatingLabel
                                            id='itemAddedDate'
                                            name='itemAddedDate'
                                            placeholder='Date'
                                            type='text'
                                            styles={inputStyle}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'itemAddedDate')
                                            }}
                                        />*/}
                                        <div style={{width:'auto',float:'left',paddingRight:'5%',fontSize:'18px'}}> Expense Date :  </div>
                                        <DatePicker
                                            dateFormat="DD-MM-YYYY"
                                            selected={this.state.expenseDate}
                                            onChange={this.handleChange}
                                        />

                                    </div>

                                    <div style={{marginBottom: '10px', width: '100%'}}>
                                        <FloatingLabel
                                            id='itemName'
                                            name='item_Name'
                                            placeholder='Expense Item Name'
                                            type='text'
                                            styles={inputStyle}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'itemName')
                                            }}
                                        />
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        borderBottom: "1px solid #3674d4",
                                        marginBottom: '10px'
                                    }}>
                                        <select onChange={(event) => this.changeselectedMenuItemCalType(event)}
                                                className="app_select" style={{width: '100%'}}>
                                            <option value="dafault">Enter Expense Type</option>
                                            <option value="Purchase">Purchase</option>
                                            <option value="Expense">Expense</option>
                                            <option value="Others">Others</option>
                                            <option value="Advance">Advance</option>
                                        </select>
                                    </div>
                                    <div style={{display: 'flex', width: '100%', marginBottom: '10px'}}>
                                        <div style={{width: '50%', marginRight: '10px'}}>
                                            <FloatingLabel
                                                id='itemQuantity'
                                                name='itemQuantity'
                                                placeholder='Price per unit'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(e) => {
                                                    this.updateInputValue(e.target.value, 'itemQuantity')
                                                }}
                                            />
                                        </div>

                                        <div style={{width: '50%', marginLeft: '10px'}}>
                                            <FloatingLabel
                                                id='itemUnit'
                                                name='itemUnit'
                                                placeholder='Number of units'
                                                type='text'
                                                styles={inputStyle}
                                                onChange={(e) => {
                                                    this.updateInputValue(e.target.value, 'itemUnit')
                                                }}
                                            />
                                        </div>
                                    </div>



                                </div>
                                <div style={{marginTop: '20px'}}>
                                    <span onClick={() => this.submitExpense()} id='updateExpense'
                                          className='expenseBtn thick font_size_normal whiteFont'>Submit Expense Entry</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default ExpenseNewEntry;