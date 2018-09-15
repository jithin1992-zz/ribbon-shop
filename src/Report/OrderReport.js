import React from 'react';
import { makeApiCall } from '../Actions/ApiCalls';
import moment from 'moment';

class OrderReport extends React.Component {

    constructor(){
        super()
            this.state={
                items : [],
                loading:true,
                bill_date:'',
            };
       this.loadBillData= this.loadBillData.bind(this);
       this.loadBillDataDateCahnge= this.loadBillDataDateCahnge.bind(this);
    }


    loadBillData(date_bill){

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

            makeApiCall("fetchBillItemsDateWise",{"shop_id":shop_id,"purchase_date":date_bill}).then((response)=> response.json())
                .then((parsedJSON) => {

                    if(parsedJSON.status == "true"){


                        //console.log("responce is ::"+JSON.stringify(parsedJSON))
                        var bill_items_array = parsedJSON.bill_items_array;
                        if(bill_items_array.length>0){


                            this.setState({
                                items:bill_items_array,
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





    loadBillDataDateCahnge(date){


        //console.log("OrderReport : bill_date"+date);


        this.state.bill_date =date;
        this.loadBillData(date);

    }



    componentDidMount() {


        var bill_date = this.props.startDate;
        //console.log("OrderReport calling"+bill_date)

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


                            {this.state.items.length > 0 ?
                                this.state.items.map((item, i) => (


                                    <div>
                                        <div className="row">
                                            <div className="col-md-1">
                                                <div className=" font_size_small thin">Sl No</div>
                                                <div>{i+1}</div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className=" font_size_small thin">Product Id#</div>
                                                <div>{item.pro_id}</div>
                                            </div>
                                            <div className="col-md-2 centr_txt">
                                                <div className="font_size_small thin">Product Name</div>
                                                <div className="blueFont thick">{item.pro_name}</div>
                                            </div>
                                            <div className="col-md-2 centr_txt">
                                                <div className="font_size_small thin">Quantity</div>
                                                <div className="redFont thick">{item.qty_total} nos</div>
                                            </div>
                                            <div className="col-md-2 centr_txt">
                                                <div className="font_size_small thin">Amount</div>
                                                <div className="aquaFont thick">Rs {item.amount_total} </div>
                                            </div>

                                        </div>

                                        <hr style={{margin: '5px !important'}}/>
                                    </div>

                                )) :

                                <div style={{textAlign:'center'}}> No bill</div>
                            }


                        </div>

                    }
                    

                </div>

             );
        }

}
export default OrderReport;