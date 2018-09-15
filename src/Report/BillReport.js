import React from 'react';
import { makeApiCall } from '../Actions/ApiCalls';
import moment from 'moment';

class BillReport extends React.Component {

    constructor(){
        super()
        this.state={
            items : [],
            loading:false,
        };
        this.billItemSelected= this.billItemSelected.bind(this);
        this.loadBillData= this.loadBillData.bind(this);
        this.loadBillDataDateCahnge= this.loadBillDataDateCahnge.bind(this);
    }

    billItemSelected(index){

        var bill_id_sel = this.state.items[index].bill_id;
        //console.log("bill_id_sel :: "+bill_id_sel);
        this.setState({
            //selectedItem: this.props.expenseItems[index],
            popUp: true
        },() => {
            // this.props.viewSelectedItemHandler(this.state.selectedItems);
            this.props.handler(this.state.popUp,bill_id_sel);
            ////console.log("selected item _ StockList"+this.state.selectedItems)
        })
    }



    loadBillData(date_bill){

        //console.log("loadBillData calling")
        //var today = new Date();
        //var date_bill = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        //var date_bill = today.format("DD-MM-YYYY");


       // var date_bill = moment().format('DD-MM-YYYY');

        //console.log("loadBillData : bill_date  "+date_bill);


        try {


                this.setState({
                    //selectedItem: this.props.expenseItems[index],
                    loading : true
                })

                var shop_id = localStorage.getItem("shop_id")

                makeApiCall("purchaseBillDetailDay",{"shop_id":shop_id,"purchase_date":date_bill}).then((response)=> response.json())
                    .then((parsedJSON) => {

                        if(parsedJSON.status == "true"){


                            //console.log("responce is ::"+JSON.stringify(parsedJSON))
                           var bill_array_json = parsedJSON.bill_array;
                            if(bill_array_json.length>0){


                                this.setState({
                                    items:bill_array_json,
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

                        var salesData = {};
                        salesData["totalOrder"] = parsedJSON.totalBills;
                        salesData["cashPayments"] = parsedJSON.cashPayments;
                        salesData["cardPayments"] = parsedJSON.cardPayments;
                        salesData["otherPayments"] = parsedJSON.otherPayments;
                        salesData["totalExpenseDay"] = parsedJSON.totalExpenseDay;
                        salesData["total_bill_amount"] = parsedJSON.total_bill_amount;

                        this.props.setSalesView(salesData);

                        this.setState({
                            //selectedItem: this.props.expenseItems[index],
                            loading : false
                        })
                    }).catch(function(e) {
                            //console.error('Error during addNewProductByShop:', e);
                            alert("Unable to load bill details now now. Please try again later");
                            this.setState({
                                //selectedItem: this.props.expenseItems[index],
                                loading : false
                            })
                            this.setState({
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



    loadBillDataDateCahnge(date){

        //console.log("loadBillDataDateCahnge calling")
        //console.log("loadBillDataDateCahnge : bill_date"+date);

        this.setState({
            //selectedItem: this.props.expenseItems[index],
            bill_date : date
        })

        this.loadBillData(date);

    }
    componentDidMount() {


        var bill_date = this.props.startDate;
        //console.log("bill_date calling"+bill_date)
        this.state.bill_date = bill_date;

        this.loadBillData(bill_date);

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
                    <div>

                        {this.state.items.length>0 ?
                            this.state.items.map((item, i) => (


                                <div>
                                    <div className="row" onClick={() => this.billItemSelected(i)}>

                                        <div className="col-md-5">
                                            <div className=" font_size_small thin">Bill Id#</div>
                                            <div>{item.bill_id}</div>
                                        </div>
                                        <div className="col-md-2 centr_txt">
                                            <div className="font_size_small thin">Payment</div>
                                            <div className="blueFont thick">{item.bill_payment}</div>
                                        </div>
                                        <div className="col-md-2 centr_txt">
                                            <div className="font_size_small thin">Amount</div>
                                            <div className="aquaFont thick">Rs{item.bill_amount}</div>
                                        </div>
                                        <div className="col-md-2 centr_txt">
                                            <div className="font_size_small thin">Personnel</div>
                                            <div className="thick">Cashier1</div>
                                        </div>
                                    </div>

                                    <hr style={{margin: '5px !important'}}></hr>
                                </div>

                            ))
                            :
                            <div style={{textAlign:'center'}}> No bill</div>

                        }


                    </div>
                }


            </div>

        );
    }

}
export default BillReport;