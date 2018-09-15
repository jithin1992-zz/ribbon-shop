import React from 'react';
import { makeApiCall } from '../Actions/ApiCalls';
import moment from 'moment';

class BillView extends React.Component {

    constructor(){
        super()
        this.state={
            items : [],
            visibility : false,
            isLoading : false,
            customerPhone:"",
            customerName:"",
            total_gst_amount_added:0,
            payment_type:'cash'

        };
        this.closePopup= this.closePopup.bind(this);
        this.saveBill= this.saveBill.bind(this);
        this.offlineBill= this.offlineBill.bind(this);
        this.printBill= this.printBill.bind(this);
        this.updateGstInfos= this.updateGstInfos.bind(this);

        var today = new Date(),
            date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();



        this.setState({
            //selectedItem: this.props.expenseItems[index],
            today : date
        })


    }

    closePopup(){

        this.setState({
            //selectedItem: this.props.expenseItems[index],
            visibility: false
        },() => {
            // this.props.viewSelectedItemHandler(this.state.selectedItems);
            this.props.handler(this.state.visibility);
            //console.log("selected item _ StockList"+this.state.selectedItems)
        })
    }

    updateGstInfos(){

        //console.log("updateGstInfos")
        if(false) {

            var gst_info = localStorage.getItem("gstDetails");
            var gst_data = JSON.parse(gst_info);
            var gst_list = gst_data.gst_list;
            var gst_ids = [];
            var gst_sgst = [];
            var gst_cgst = [];
            var index = 0;

            if (gst_list.length > 0) {

                for (var i = 0; i < gst_list.length; i++) {

                    var gst = gst_list[i];

                    var gst_id = gst.gst_id;
                    var cgst_value = gst.cgst_value;
                    var sgst_value = gst.sgst_value;

                    if (gst_id && cgst_value && sgst_value) {

                        gst_ids[index] = gst_id;
                        gst_sgst[index] = sgst_value;
                        gst_cgst[index] = cgst_value;
                        index = parseFloat(index) + parseFloat(1);

                    }


                }

            }


            if (gst_ids.length > 0) {

                var addedItems = [];
                var total_gst_amount_added = 0;
                //console.log("BillView props_added items :: " + JSON.stringify(this.props.addedItems));

                for (var j = 0; j < this.props.addedItems.length; j++) {

                    var product = this.props.addedItems[j];
                    var gst_id = product.gst_id;

                    var cgst = 0;
                    var sgst = 0;

                    if (gst_id) {

                        var index = gst_ids.indexOf(gst_id);

                        var cgst_per = gst_cgst[index];
                        var sgst_per = gst_sgst[index];

                        var totalPrice = parseFloat(product.quantity) * parseFloat(product.price);

                        cgst = (totalPrice / 100) * cgst_per;
                        sgst = (totalPrice / 100) * sgst_per;

                    }

                    if (isNaN(cgst))
                        cgst = 0;

                    if (isNaN(sgst))
                        sgst = 0;


                    total_gst_amount_added = parseFloat(total_gst_amount_added) + parseFloat(cgst) + parseFloat(sgst);

                    product.cgst = cgst;
                    product.sgst = sgst;
                    addedItems[j] = product;


                }

                if (addedItems.length > 0) {

                    this.props.addedItems = addedItems;
                    //console.log("BillView addedItems :: " + JSON.stringify(addedItems));
                    //console.log("BillView props_added items :: " + JSON.stringify(this.props.addedItems));

                    this.setState({
                        total_gst_amount_added: total_gst_amount_added
                    }, () => {
                        //console.log("total_gst_amount_added  ::" + this.state.total_gst_amount_added);
                    })


                    // var total_Amnt =  this.props.billDetails.total_Amnt
                    // total_Amnt  = parseFloat(total_Amnt)+parseFloat(total_gst_amount_added);
                    // this.props.billDetails.total_Amnt = total_Amnt;
                    //
                    //
                    //  var netAmnt =  this.props.billDetails.netAmnt
                    // netAmnt  = parseFloat(netAmnt)+parseFloat(total_gst_amount_added);
                    // this.props.billDetails.netAmnt = netAmnt;


                }


            }
        }

    }

    componentDidMount(){


    }

    saveBill(){



        try{


            var shop_id = localStorage.getItem("shop_id")
            var added_id = localStorage.getItem("user_id");


            if(this.props.addedItems.length>0){



                this.setState({
                    //selectedItem: this.props.expenseItems[index],
                    isLoading : true
                })

                //console.log("customer_number : "+this.state.customerPhone);
                //console.log("customer_name : "+this.state.customerName);
                //console.log("purchase_date : "+this.state.today);

                //var today = new Date();
                //var date_bill = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

                var date_bill = moment().format('DD-MM-YYYY');
                var addedItems = this.props.addedItems;
                var billDetails = this.props.billDetails;
                var  tot_amnt = parseFloat(this.props.billDetails.total_Amnt)+ parseFloat(this.state.total_gst_amount_added);
                var  netAmnt = parseFloat(this.props.billDetails.netAmnt) + parseFloat(this.state.total_gst_amount_added);

                var params = {
                    "customer_number": this.state.customerPhone,
                    "customer_name": this.state.customerName,
                    "purchase_date": date_bill,
                    "total_amount": tot_amnt.toString(),
                    "packing_charges": this.props.billDetails.packingCharges.toString(),
                    "discount_amount": this.props.billDetails.discountValue.toString(),
                    "shop_id": shop_id,
                    "user_id": added_id,
                    "payment_type": this.state.payment_type,
                    "bill_amount": netAmnt.toString(),
                    "product_array": this.props.addedItems
                };

                if (navigator.onLine) {
                    // Has connection, go do something


                    makeApiCall("purchaseBill",params ).then((response) => response.json())
                        .then((parsedJSON) => {

                            if (parsedJSON.status == "true") {



                                this.setState({
                                    //selectedItem: this.props.expenseItems[index],
                                    visibility: false
                                }, () => {
                                    // this.props.viewSelectedItemHandler(this.state.selectedItems);
                                    this.props.handler(this.state.visibility);
                                    this.props.clear();
                                    ////console.log("selected item _ StockList"+this.state.selectedItems)
                                })
                                //alert(parsedJSON.status_desc);
                               // alert("Bill id is " + parsedJSON.bill_id)
                                try{

                                    this.printBill(parsedJSON.bill_id,addedItems,billDetails,date_bill);
                                }catch (e) {

                                    //console.error('Error during purchaseBill printBill:', e);

                                }
                            } else {


                                this.offlineBill(params,addedItems,billDetails,date_bill);
                                alert(parsedJSON.status_desc)


                            }
                            this.setState({
                                //selectedItem: this.props.expenseItems[index],
                                isLoading: false
                            })
                        }).catch(function (e) {
                        ////console.error('Error during purchaseBill:', e);
                        //alert("Unable to produce bill. Please try again later");
                        //offlineBill(params,addedItems,billDetails,date_bill);

                    });

                }else{

                    alert("You are not connected to the internet. So the bill is generated through offline. And it will automatically sync once you connected in the internet")

                    this.offlineBill(params,addedItems,billDetails,date_bill);
                }


            }else{


                alert("Customer cart is empty.")

            }


        }catch (e) {

            alert("Billing failed. Kindly please try again")
        }






    }


    printBill(bill_id,addedItems,billDetails,date_bill){


       /* var divContents = '<div > Bill id  : '+bill_id+'</div><div style="padding-top: 10px" > <table  style="width:100%" cellspacing="10"> ';

        //var addedItems = this.props.addedItems;
        //console.log("printBill : addedItems :: "+JSON.stringify(addedItems));
        // this.props.addedItems.map((item, i) =>
        //
        //     (
        //
        //
        //         divContents = divContents+'<tr><td>'+item.name+'</td><td>0</td><td>0</td><td>'+item.quantity+'</td><td>'+item.price+'</td><td>'+item.price*item.quantity+'</td></tr> '
        //     )
        // )

        divContents = divContents+'<tr><td style="font-weight: 500;text-align: left"> ITEM NAME</td> <td style="font-weight: 500;text-align: center">CGST </td>  <td style="font-weight: 500;text-align: center">SGST </td>  <td style="font-weight: 500;text-align: center">QUANTITY </td>  <td style="font-weight: 500;text-align: center">RATE</td>  <td style="font-weight: 500;text-align: center"> AMOUNT</td>  </tr>';

        for(var i=0;i<addedItems.length;i++){


            var item = addedItems[i];
            divContents = divContents+'<tr><td style="text-align: left">'+item.name+'</td><td style="text-align: center">0</td><td style="text-align: center">0</td><td style="text-align: center">'+item.quantity+'</td><td style="text-align: center">'+item.price+'</td><td style="text-align: center">'+item.price*item.quantity+'</td></tr> '

        }

        divContents = divContents+'<tr style="padding-top: 5px"><td style="text-align: center">Total Amount</td><td colspan="2" style="text-align: center">Packing Charges</td><td colspan="2" style="text-align: center">Discount Amount</td><td style="text-align: center">Net Amount</td></tr>'
        divContents = divContents+'<tr style="padding-top: 5px"><td style="text-align: center">'+billDetails.total_Amnt+'</td><td colspan="2" style="text-align: center">'+billDetails.packingCharges+'</td><td colspan="2" style="text-align: center">'+billDetails.discountValue+'</td><td style="text-align: center">'+billDetails.netAmnt+'</td></tr>'

        divContents = divContents+" </table>  </div>";
*/


       /* var shop_details = JSON.parse(localStorage.getItem("shop_details"));


        var shop_name = shop_details.shop_name;

       var divContents = '<div style="padding:10px"><div style="text-align:center;font-size:26px;font-weight:600;">'+shop_name+'</div><div style="border-top:1px dotted black;border-bottom:1px dotted black;padding:10px;margin-top:10px"><span style="font-size:15px;font-weight: bold"> Bill id  : '+bill_id+'</span>\n';

        divContents = divContents+'<span style="font-size:15px;float:right"> Date  : '+date_bill+'</span></div><div style="font-size:18px" > ';

        divContents = divContents+'<table  style="width:100%;border-bottom:1px dotted black;" cellspacing="10"> <tr><td style="font-weight: 500;text-align: left"> ITEM NAME</td> <td style="font-weight: 500;text-align: center">CGST </td>  <td style="font-weight: 500;text-align: center">SGST </td>  <td style="font-weight: 500;text-align: center">QUANTITY </td>  <td style="font-weight: 500;text-align: center">RATE</td>  <td style="font-weight: 500;text-align: center"> AMOUNT</td>  </tr>';


        for(var i=0;i<addedItems.length;i++){

            var item = addedItems[i];
            var item_total  = (parseFloat(item.price)*parseFloat(item.quantity))+parseFloat(item.cgst)+parseFloat(item.sgst)
            divContents = divContents+'<tr><td style="text-align: left">'+item.name+'</td><td style="text-align: center">'+item.cgst+'</td><td style="text-align: center">'+item.sgst+'</td><td style="text-align: center">'+item.quantity+'</td><td style="text-align: center">'+item.price+'</td><td style="text-align: center">'+item_total+'</td></tr>';

        }



        var subTot = parseFloat(billDetails.total_Amnt) + parseFloat(this.state.total_gst_amount_added)
        divContents = divContents+'<tr><td style="font-weight: 500;text-align: left;border-top:1px dotted black;padding-top:10px">Sub Total</td><td style="border-top:1px dotted black;padding-top:10px"></td><td style="border-top:1px dotted black;padding-top:10px"></td><td style="border-top:1px dotted black;padding-top:10px"></td><td style="border-top:1px dotted black;padding-top:10px"></td><td style="text-align: center;border-top:1px dotted black;padding-top:10px">'+subTot+'</td>\n' +
            '        </tr>';

        divContents = divContents+'<tr><td style="font-weight: 500;text-align: left;padding-top:10px">Packing Charge</td><td style="padding-top:10px"></td><td style="padding-top:10px"></td><td style="padding-top:10px"></td><td style="padding-top:10px"></td><td style="text-align: center;padding-top:10px">'+billDetails.packingCharges+'</td>\n' +
            '        </tr>';


        divContents = divContents+'<tr><td style="font-weight: 500;text-align: left">Discount Amount</td><td></td><td></td><td></td><td></td><td style="text-align: center">'+billDetails.discountValue+'</td>\n' +
            '        </tr>';


        var g_total = parseFloat(billDetails.netAmnt) + parseFloat(this.state.total_gst_amount_added);

        divContents = divContents+'<tr><td style="border-top:1px dotted black;padding-top:10px"></td><td style="border-top:1px dotted black;padding-top:10px"></td><td style="border-top:1px dotted black;padding-top:10px"></td><td style="border-top:1px dotted black;padding-top:10px"></td><td style="border-top:1px dotted black;padding-top:10px;font-weight: 550;font-size:20px">G.Total : </td><td style="text-align: center;border-top:1px dotted black;padding-top:10px;font-weight:550;font-size:20px">'+g_total+'</td>\n' +
            '        </tr>';


        divContents = divContents+'</table>';

        divContents = divContents+'</div><p style="font-size:15px;font-weight:400;text-align:center;">Thank you for your visit <br />Have a nice day..</p></div>'

        console.log("divContents :: "+divContents);
        var printWindow = window.open('', '');
        printWindow.document.write('<html><head><title>Bill </title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(divContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
*/

       var orderId = "1";

       if(localStorage.getItem("order_id"+date_bill)){

           var lastOrder_id = localStorage.getItem("order_id"+date_bill);
           lastOrder_id = parseFloat(lastOrder_id)+parseFloat(1);
           orderId = lastOrder_id;
           localStorage.setItem("order_id"+date_bill,orderId);

       }else{

           localStorage.setItem("order_id"+date_bill,"1");
       }

        var shop_details = JSON.parse(localStorage.getItem("shop_details"));
        var user_details = JSON.parse(localStorage.getItem("user_details"));

        //console.log("printing bill...........")
        //console.log("orderId..........."+orderId)

        var shop_name = shop_details.shop_name;
        var region = shop_details.region;

        var divContents = '';



        divContents = divContents+'<div style="width:246px;font-family:monospace;font-size:15px;">  <div style="text-align:center">Date :'+date_bill+' <br /><br />  Employee: '+user_details.userName+'<br />  Terminal: POS-PC <div style="font-size:23px">Order Id: '+orderId+' </div><div style="border-bottom:2px dotted black;padding-bottom:8px;">Bill No :'+bill_id+'</div><table style="font-size:18px;border-bottom:2px dotted black;padding-bottom:8px;margin-top:5px;padding-bottom:15px;width:246px;text-align: center;">';

        for(var i=0;i<addedItems.length;i++){

            var item = addedItems[i];

            //divContents = divContents+'<tr> <td>'+(parseFloat(i)+parseFloat(1))+'</td><td>'+item.name+'</td></tr>'
            divContents = divContents+'<tr> <td>'+item.quantity+'</td><td>'+item.name+'</td></tr>'
        }

        divContents = divContents+'</table></div></div>'



        divContents = divContents+'<div style="text-align:center;font-size:15px;margin-top:35px;">'+shop_name+' <br />'+region+' <br />Kerala</div>';
        divContents = divContents+'<table style="width:246px;font-size:15px;padding-top:15px"><tr><td>Date</td><td>:</td><td>'+date_bill+'</td> </tr> ';
        divContents = divContents+'<tr><td>Employee</td> <td>:</td><td>'+user_details.userName+'</td> </tr> ';
        divContents = divContents+'<tr><td>Bill No</td> <td>:</td><td><span style="font-size:16px;font-weight: bold">'+bill_id+'</span></td> </tr> ';
        divContents = divContents+'<tr><td>Order Id</td> <td>:</td><td><span style="font-size:16px;font-weight: bold">'+orderId+'</span></td> </tr> </table>';


        divContents = divContents+'<table style="border-top:2px dotted black;border-bottom:2px dotted black;margin-top:20px;width:246px;font-size:14px;">';
        divContents = divContents+'<tr><td>ITEM DESC</td><td>QTY</td><td>BASE <br />AMT</td>    <td style="text-align:center;">NET <br />AMT</td></tr>';
        divContents = divContents+'<tr></tr><td>TAX RATE</td><td>CGST</td><td>SGST</td> <td></td></tr>';



        for(var i=0;i<addedItems.length;i++){

            var item = addedItems[i];
            var item_total  = (parseFloat(item.price)*parseFloat(item.quantity))+parseFloat(item.cgst)+parseFloat(item.sgst)
            //divContents = divContents+'<tr><td style="text-align: left">'+item.name+'</td><td style="text-align: center">'+item.cgst+'</td><td style="text-align: center">'+item.sgst+'</td><td style="text-align: center">'+item.quantity+'</td><td style="text-align: center">'+item.price+'</td><td style="text-align: center">'+item_total+'</td></tr>';

            if(i==0){

                divContents = divContents+'<tr><td style="border-top:2px dotted black;padding-top:8px;">'+item.name+'</td><td style="border-top:2px dotted black;padding-top:8px;">'+item.quantity+'</td><td style="border-top:2px dotted black;padding-top:8px;">'+item.price+'</td>    <td style="border-top:2px dotted black;padding-top:8px;text-align:right">'+item_total+'</td></tr>';

            }else{

                divContents = divContents+'<tr><td style="border-top:1px dotted black;padding-top:8px;">'+item.name+'</td><td style="border-top:1px dotted black;padding-top:8px;">'+item.quantity+'</td><td style="border-top:1px dotted black;padding-top:8px;">'+item.price+'</td>    <td style="border-top:1px dotted black;padding-top:8px;text-align:right">'+item_total+'</td></tr>';

            }
            divContents = divContents+'<tr><td>0.00%</td><td>0.00</td><td>0.00</td><td></td></tr>';
        }

        divContents = divContents+'</table>';

        var subTot = parseFloat(billDetails.total_Amnt) + parseFloat(this.state.total_gst_amount_added)

        divContents = divContents+'<div style="padding-top:8px;border-bottom:2px dotted black;padding-bottom:8px;font-size:15px;"><b><span>Sub Total</span> <span style="float:right;">'+subTot+'</span>  </b></div>';
        divContents = divContents+'<div style="padding-top:8px;border-bottom:2px dotted black;padding-bottom:8px;font-size:15px;"><b><span>Packing Charge</span> <span style="float:right;">'+billDetails.packingCharges+'</span>  </b></div>';
        divContents = divContents+'<div style="padding-top:8px;border-bottom:2px dotted black;padding-bottom:8px;font-size:15px;"><b><span>Discount Amount</span> <span style="float:right;">'+billDetails.discountValue+'</span>  </b></div>';

        var g_total = parseFloat(billDetails.netAmnt) + parseFloat(this.state.total_gst_amount_added);

        divContents = divContents+'<div style="padding-top:8px;border-bottom:2px dotted black;padding-bottom:8px;font-size:15px;"><b><span>G.Total</span> <span style="float:right;">'+g_total+'</span>  </b></div>';


        divContents = divContents+'<p style="text-align:center;padding-top:8px;font-size:11px;">Thank you for your visit <br />Have a nice day..</p>';







        var printWindow = window.open('', '');
       /* printWindow.document.write('<html style="width:246px;page-break-after: always"><head><title> </title>');
        printWindow.document.write('</head><body style="padding:5px;margin-top:45px;font-family:monospace;">');
        printWindow.document.write(divContents);
        printWindow.document.write('</body></html>');*/
        printWindow.document.write('<div style="width:246px;page-break-after: always;padding:5px;margin-top:45px;font-family:monospace;">');
        printWindow.document.write(divContents);
        printWindow.document.write('</div>');
        printWindow.document.close();
        printWindow.print();

    }
    offlineBill(params,addedItems,billDetails,date_bill){



        if(localStorage.getItem("offlineBills")){

            var offlineBills = localStorage.getItem("offlineBills");
            offlineBills = JSON.parse(offlineBills);
            offlineBills.push(params);
           // offlineBills = offlineBills
            localStorage.setItem("offlineBills",JSON.stringify(offlineBills))

            this.printBill("OFF_"+date_bill+"_"+offlineBills.length,addedItems,billDetails,date_bill,date_bill);

        }else{

            var offlineBills = [];
            offlineBills.push(params);
            localStorage.setItem("offlineBills",JSON.stringify(offlineBills))
            this.printBill("OFF_"+date_bill+"_1",addedItems,billDetails,date_bill,date_bill);
        }

        this.setState({
            //selectedItem: this.props.expenseItems[index],
            isLoading: false
        })

        this.setState({
            //selectedItem: this.props.expenseItems[index],
            visibility: false
        }, () => {
            // this.props.viewSelectedItemHandler(this.state.selectedItems);
            this.props.handler(this.state.visibility);
            this.props.clear();
            //console.log("selected item _ StockList"+this.state.selectedItems)
        })


    }
    componentWillReceiveProps(nextProps){

        this.setState({
            customerPhone:"",
            customerName:""
        },()=>{
            //console.log("componentWillReceiveProps bill");
        });

        this.state.visibility = nextProps.visibility;
        this.updateGstInfos();
    }

    render() {

        const divStyle = {
            maxWidth : this.props.data.width-40+'px',
            maxHeight : this.props.data.height-150+'px',
            marginTop : '3px'
        }

        var visibility = "dialog-container-invisible";
        var shop_details = JSON.parse(localStorage.getItem("shop_details"));
        var shop_name = shop_details.shop_name;

        var curr_date = moment().format('DD-MM-YYYY');


        if (this.state.visibility) {
            visibility = "dialog-container-visible";
        }else{
            visibility = "dialog-container-invisible";
        }


        //console.log("height BillingSection"+this.props.data.height)onClick={()=>this.closePopup()}
        return (
            <div className={visibility} >

                <div class="dialog" >
                    {
                        this.state.isLoading == true ? (

                            <div className="loader">
                                <svg viewBox="0 0 32 32" width="32" height="32">
                                    <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                </svg>
                            </div>


                        ) : (

                            <div className="dialog-body">

                                <div align='right'
                                     style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}}>
                                    <img src='images/blueCloseBtn.png' className='xsmall_icon_unpadded'
                                         onClick={() => this.closePopup()}/>
                                </div>

                                <div className="row h-100 justify-content-center align-items-center scroll" style={divStyle}>

                                    <span  className="font_size_large thick blackFont">{shop_name} </span>&nbsp;
                                    <span className="font_size_med thin blackFont">[ GST#12ASRRJNTQWX ]</span>

                                    <div style={{borderBottom:'1px dashed #d9d9d9',display: 'flex', width: '100%', marginTop: '10px',paddingBottom: '5px'}}>

                                        <span align='right' style={{width: '50%'}}
                                              className="font_size_small thin blackFont">Date : {curr_date}</span>
                                    </div>

                                    <table class="billGenerated font_size_med">
                                        <tr>
                                            <td className="font_size_med thick blackFont">Item Name</td>
                                            <td style={{textAlign:'center'}} className="font_size_med thick blackFont">CGST</td>
                                            <td style={{textAlign:'center'}} className="font_size_med thick blackFont">SGST</td>
                                            <td style={{textAlign:'center'}} className="font_size_med thick blackFont">QUANTITY</td>
                                            <td style={{textAlign:'center'}} className="font_size_med thick blackFont">RATE</td>
                                            <td style={{textAlign:'center'}} className="font_size_med thick blackFont">AMOUNT</td>
                                        </tr>

                                        {this.props.addedItems.map((item, i) => (
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td style={{textAlign:'center'}}>{item.cgst}</td>
                                                    <td style={{textAlign:'center'}}>{item.sgst}</td>
                                                    <td style={{textAlign:'center'}}>{item.quantity}</td>
                                                    <td style={{textAlign:'center'}}>{item.price}</td>
                                                    <td style={{textAlign:'center'}}>{parseFloat((item.quantity * item.price))+parseFloat(item.cgst)+parseFloat(item.sgst)}</td>
                                                </tr>
                                            ))
                                        }

                                        <tr style={{paddingTop:'5px'}}>

                                            <td style={{textAlign:'center'}} className='font_size_xsmall normal'>Total Amount</td>
                                            <td colSpan={2} style={{textAlign:'center'}} className='font_size_xsmall normal'>Packing Charges</td>
                                            <td colSpan={2} style={{textAlign:'center'}} className='font_size_xsmall normal'>Discount Amount</td>
                                            <td style={{textAlign:'center'}} className='font_size_xsmall normal'>Net Amount</td>

                                        </tr>

                                        <tr>

                                            <td style={{textAlign:'center'}} className='font_size_med thick'>{parseFloat(this.props.billDetails.total_Amnt) + parseFloat(this.state.total_gst_amount_added)}</td>
                                            <td colSpan={2} style={{textAlign:'center'}} className='font_size_med thick'>{this.props.billDetails.packingCharges}</td>
                                            <td colSpan={2} style={{textAlign:'center'}} className='font_size_med thick'>{this.props.billDetails.discountValue}</td>
                                            <td style={{textAlign:'center'}} className='font_size_large thicker'>{parseFloat(this.props.billDetails.netAmnt) + parseFloat(this.state.total_gst_amount_added)}</td>

                                        </tr>

                                    </table>

                                    <div style={{display:'flex',width:'100%'}}>

                                        <div style={{margin:'5px',width:'50%'}}>

                                            <span style={{
                                                paddingTop: '1px',
                                                width: '100%',
                                                color: '#3674d4',
                                            }} className='font_size_xsmall normal'>Customer Name </span>

                                            <input id='custName' placeholder="Enter Customer Name" className="font_size_large thick"
                                                   style={{width: '100%', border: 'none',height:'30px'}} type="text" onChange={(event) => this.setState({customerName: event.target.value})}
                                                   value = {this.state.customerName}
                                                   name="custName"/>

                                        </div>

                                        <div style={{margin:'5px',width:'50%'}}>

                                            <span style={{
                                                paddingTop: '1px',
                                                width: '100%',
                                                color: '#3674d4',
                                            }} className='font_size_xsmall normal'>Customer Number </span>

                                            <input id='custPhone' placeholder="Enter Customer Number" className="font_size_large thick"
                                                   style={{width: '100%', border: 'none',height:'30px'}} type="number"  onChange={(event) => this.setState({customerPhone: event.target.value})}
                                                   value = {this.state.customerPhone}
                                                   name="custPhone"/>

                                        </div>

                                    </div>

                                    <div  style={{margin:'5px',width:'50%',paddingTop:'5px'}}>

                                        <span  onClick={() => this.saveBill()} style={{margin: 'auto',cursor:'pointer'}} className='printBtn thick font_size_normal whiteFont'>Print Bill</span>

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