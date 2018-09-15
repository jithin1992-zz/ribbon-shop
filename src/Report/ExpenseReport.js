import React from 'react';
import {makeApiCall} from "../Actions/ApiCalls";

class ExpenseReport extends React.Component {

    constructor(){
        super()
            this.state={
                items : []
            };
        this.loadExpenseData= this.loadExpenseData.bind(this);
        this.loadExpenseDataDateCahnge= this.loadExpenseDataDateCahnge.bind(this);
    }



    loadExpenseData(date_bill){

        //console.log("loadBillData calling")
        //var today = new Date();
        //var date_bill = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        //var date_bill = today.format("DD-MM-YYYY");


        //var date_bill = this.state.bill_date;

        //console.log("loadBillData : bill_date  "+date_bill);


        try {


            this.setState({
                //selectedItem: this.props.expenseItems[index],
                loading : true
            })

            var shop_id = localStorage.getItem("shop_id")

            makeApiCall("fetchShopExpense",{"shop_id":shop_id,"expense_date":date_bill}).then((response)=> response.json())
                .then((parsedJSON) => {

                    if(parsedJSON.status == "true"){


                        //console.log("responce is ::"+JSON.stringify(parsedJSON))
                        var expenseList = parsedJSON.expenseList;
                        if(expenseList.length>0){


                            this.setState({
                                items:expenseList,
                            })





                        }else{


                            this.setState({
                                items:[],
                            })



                        }


                    }else{

                        this.setState({
                            items:[],
                        })



                        alert(parsedJSON.status_desc)


                    }
                    this.setState({
                        //selectedItem: this.props.expenseItems[index],
                        loading : false
                    })

                    var salesData = {};
                    salesData["totalOrder"] = parsedJSON.totalBills;
                    salesData["cashPayments"] = parsedJSON.cashPayments;
                    salesData["cardPayments"] = parsedJSON.cardPayments;
                    salesData["otherPayments"] = parsedJSON.otherPayments;
                    salesData["totalExpenseDay"] = parsedJSON.totalExpenseDay;
                    salesData["total_bill_amount"] = parsedJSON.total_bill_amount;

                    this.props.setSalesView(salesData);

                }).catch(function(e) {
                    //console.error('Error during addNewProductByShop:', e);
                    alert("Unable to load bill details now now. Please try again later");
                    this.setState({
                        //selectedItem: this.props.expenseItems[index],
                        loading : false,
                        items:[],
                    })

                    var salesData = {};
                    salesData["totalOrder"] = "0";
                    salesData["cashPayments"] = "0";
                    salesData["cardPayments"] = "0";
                    salesData["otherPayments"] = "0";
                    salesData["totalExpenseDay"] = "0";
                    salesData["total_bill_amount"] = "0";

                    this.props.setSalesView(salesData);


            });

        }catch (e) {

            alert("Unable to load bill details now now. Please try again later");


        }

    }





    loadExpenseDataDateCahnge(date){


        //console.log("OrderReport : bill_date"+date);


        this.state.bill_date =date;
        this.loadExpenseData(date);

    }





    componentDidMount() {


        var bill_date = this.props.startDate;
        //console.log("OrderReport calling"+bill_date)

        this.state.bill_date = bill_date;

        this.loadExpenseData(bill_date);

    }



    render() {

        const divStyle = {
            height : this.props.data.height-115+'px',
            background : '#ffffff',
            marginTop : '3px'
        } 

        ////console.log("height BillingSection"+this.props.data.height)
      return (
                <div className="scroll" style={divStyle}>

                    {this.state.loading == true ?


                        <div className="loader">
                            <svg viewBox="0 0 32 32" width="32" height="32">
                                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                            </svg>
                        </div>


                        :

                        <div id="expenseList" className="scroll" style={{height: this.props.data.height - 110 + 'px'}}>
                            <table className="expenseTable" style={{width: '100%', border: '1px solid #b7cdde'}}>
                                <tr>
                                    <td>
                                        <span className="font_size_normal normal italics">Sl No</span>
                                    </td>
                                    <td>
                                        <span className="font_size_normal normal italics">Expense Type</span>
                                    </td>
                                    <td>
                                        <span className="font_size_normal normal italics">Expense Name</span>
                                    </td>
                                    <td>
                                        <span className="font_size_normal normal italics">Quantity</span>
                                    </td>
                                    <td>
                                        <span className="font_size_normal normal italics">Units</span>
                                    </td>
                                    <td>
                                        <span className="font_size_normal normal italics">Amount</span>
                                    </td>
                                </tr>


                                {this.state.items.length > 0 ?
                                    this.state.items.map((item, i) => (

                                            <tr>
                                            <td>
                                                <span className="font_size_small">{i+1}</span>
                                            </td>
                                            <td>
                                                <span className="font_size_small">{item.expenseType}</span>
                                            </td>
                                            <td>
                                                <span className="font_size_small">{item.expenseName}</span>
                                            </td>
                                            <td>
                                                <span className="font_size_small italics">{item.expenseQuantity}</span>
                                            </td>
                                            <td>
                                                <span className="font_size_small">{item.expenseUnit}</span>
                                            </td>
                                            <td>
                                                <span className="font_size_small">Rs {item.expenseAmount}</span>
                                            </td>
                                        </tr>
                                    )) :

                                    <tr>
                                        <td>
                                            <span className="font_size_small">1</span>
                                        </td>
                                        <td>
                                            <span className="font_size_small">Not Added</span>
                                        </td>
                                        <td>
                                            <span className="font_size_small">Not Added</span>
                                        </td>
                                        <td>
                                            <span className="font_size_small italics">Not Added</span>
                                        </td>
                                        <td>
                                            <span className="font_size_small">Not Added</span>
                                        </td>
                                        <td>
                                            <span className="font_size_small">Not Added</span>
                                        </td>
                                    </tr>
                                }



                            </table>

                        </div>


                    }


                </div>

             );
        }

}
export default ExpenseReport;