import React from 'react';
import { makeApiCall } from '../Actions/ApiCalls';

class BillView extends React.Component {

    constructor(){
        super()
        this.state={
            items : [],
            visibility : false,
            isLoading : true,
            bill_id:'',
        };
        this.closePopup= this.closePopup.bind(this);
        this.saveBill= this.saveBill.bind(this);
        this.loadBillData= this.loadBillData.bind(this);
    }

    closePopup(){

        this.setState({
            //selectedItem: this.props.expenseItems[index],
            visibility: false
        },() => {
            // this.props.viewSelectedItemHandler(this.state.selectedItems);
            this.props.handler(this.state.visibility);
            ////console.log("selected item _ StockList"+this.state.selectedItems)
        })
    }

    loadBillData(){


        try{

            var bill_id = this.state.bill_id;
            //console.log("bill_id :: "+bill_id);
            if(bill_id) {
                makeApiCall("fetchBillDetails",
                    {
                        "bill_id": bill_id

                    }
                ).then((response) => response.json())
                    .then((parsedJSON) => {

                        if (parsedJSON.status == "true") {


                            var billDetails = parsedJSON.billdata;
                            var billitemsList = parsedJSON.billitems;
                            this.setState({
                                //selectedItem: this.props.expenseItems[index],
                                isLoading: false,
                                billdata: billDetails,
                                billitems: billitemsList,
                            })

                        } else {


                            alert(parsedJSON.status_desc)


                        }

                    }).catch(function (e) {
                    //console.error('Error during addNewProductByShop:', e);
                    alert("Unable to load bill details. Please try again later");


                });
            }



        }catch(e){


        }

    }

    saveBill(){

        var url = "http://139.59.11.132:8080/ribbon_api/downloadBill?bill="+this.state.bill_id;
        window.open(url, "_blank") //to open new page

    }
    componentWillReceiveProps(nextProps){
        this.state.visibility = nextProps.visibility;
        this.state.bill_id = nextProps.bill_id_selected;
        this.loadBillData()
    }

    render() {

        const divStyle = {
            width : this.props.data.width-100+'px',
            height : this.props.data.height-80+'px',
            background : '#064676',
            marginTop : '3px'
        }

        const divStyle1 = {
            maxWidth : this.props.data.width-40+'px',
            maxHeight : this.props.data.height-150+'px',
            marginTop : '3px'
        }


        var visibility = "dialog-container-invisible";

        if (this.state.visibility) {
            visibility = "dialog-container-visible";
        }else{
            visibility = "dialog-container-invisible";
        }


        ////console.log("height BillingSection"+this.props.data.height)
        return (
            <div className={visibility}>

                <div class="dialog">
                    <div class="dialog-title font_size_med thin blueFont">
                        <span>Bill Item Selected</span>
                        <div align='right' style={{flex:'1',float: 'right',clear: 'right',position: 'relative'}}>
                            <img src='images/blueCloseBtn.png' class='xsmall_icon_unpadded' onClick={()=>this.closePopup()}/>
                        </div>
                    </div>

                    {
                        this.state.isLoading == true ? (

                            <div className="loader">
                                <svg viewBox="0 0 32 32" width="32" height="32">
                                    <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                </svg>
                            </div>


                        ) : (




                        <div className="dialog-body">



                        <div className="row h-100 justify-content-center align-items-center scroll" style={divStyle1}>


                        <div style={{
                        borderBottom: '1px dashed #d9d9d9',
                        display: 'flex',
                        width: '100%',
                        marginTop: '10px',
                        paddingBottom: '10px'
                    }}>



                            <span align='right' style={{width: '50%',fontWeight:'bold',textAlign:'left',fontSize:'15px'}}
                                  className="font_size_small thin blackFont">Bill : {this.state.bill_id}</span>

                            <span align='right' style={{width: '50%',textAlign:'left',fontSize:'15px'}}
                                  className="font_size_small thin blackFont">Date : {this.state.billdata.bill_date}</span>

                        </div>

                        <table className="billGenerated font_size_med">
                        <tr>
                        <td className="font_size_med thick blackFont">Item Name</td>
                        <td style={{textAlign: 'center'}} className="font_size_med thick blackFont">CGST</td>
                        <td style={{textAlign: 'center'}} className="font_size_med thick blackFont">SGST</td>
                        <td style={{textAlign: 'center'}} className="font_size_med thick blackFont">QUANTITY</td>
                        <td style={{textAlign: 'center'}} className="font_size_med thick blackFont">RATE</td>
                        <td style={{textAlign: 'center'}} className="font_size_med thick blackFont">AMOUNT</td>
                        </tr>

                        {this.state.billitems.map((item, i) => (
                            <tr>
                                <td>{item.pro_name}</td>
                                <td style={{textAlign: 'center'}}>{item.cgst}</td>
                                <td style={{textAlign: 'center'}}>{item.sgst}</td>
                                <td style={{textAlign: 'center'}}>{item.quantity}</td>
                                <td style={{textAlign: 'center'}}>{item.rate}</td>
                                <td style={{textAlign: 'center'}}>{item.pro_amount}</td>
                            </tr>
                        ))
                        }

                        <tr style={{paddingTop: '5px'}}>

                        <td style={{textAlign: 'center'}} className='font_size_xsmall normal'>Total Amount</td>
                        <td colSpan={2} style={{textAlign: 'center'}} className='font_size_xsmall normal'>Packing Charges</td>
                        <td colSpan={2} style={{textAlign: 'center'}} className='font_size_xsmall normal'>Discount Amount</td>
                        <td style={{textAlign: 'center'}} className='font_size_xsmall normal'>Net Amount</td>

                        </tr>

                        <tr>

                        <td style={{textAlign: 'center'}} className='font_size_med thick'>{this.state.billdata.total_amount}</td>
                        <td colSpan={2} style={{textAlign: 'center'}} className='font_size_med thick'>{this.state.billdata.packing_charges}</td>
                        <td colSpan={2} style={{textAlign: 'center'}} className='font_size_med thick'>{this.state.billdata.discount_amount}</td>
                        <td style={{textAlign: 'center'}} className='font_size_large thicker'>{this.state.billdata.bill_amount}</td>

                        </tr>

                        </table>







                        <div  style={{margin: '5px', width: '50%', paddingTop: '5px'}}>

                        <span  onClick={() => this.saveBill()} style={{
                        margin: 'auto',
                        cursor: 'pointer'
                    }} className='printBtn thick font_size_normal whiteFont'>Download Bill</span>

                        </div>



                        </div>

                        </div>


                        )
                    }

                </div>
            </div>
        );
    }
}
export default BillView;