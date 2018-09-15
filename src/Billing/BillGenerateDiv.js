import React from 'react';

class BillGenerateDiv extends React.Component {

    constructor() {
        super();
        this.state={
            discountPercent : 0,
            discountValue : 0,
            packingCharges : 0,
            total_Amnt : 0,
            netAmnt : 0,
            takeAway:'Order',
            payment_type:'cash'

        };

        var charge_pack =0;

        if( localStorage.getItem("packing_charge")){

            charge_pack =  localStorage.getItem("packing_charge")

        }


        // this.state={
        //
        //     packingCharges : charge_pack,
        //
        // };

        this.updateInputValue= this.updateInputValue.bind(this);
        this.setPackingCharge= this.setPackingCharge.bind(this);
        this.setPaymentType= this.setPaymentType.bind(this);
        this.generateBill= this.generateBill.bind(this);

        this.precisionRound = this.precisionRound.bind(this)
     };


    setPaymentType(event) {


        //console.log("setPaymentType: " + event.target.value)

        this.setState({payment_type: event.target.value}, () => {
        })


    }

    setPackingCharge(event){


        //console.log("event.target.value : "+event.target.value)

        this.setState({takeAway: event.target.value},() => {
        })

        if(event.target.value=="Take Away"){

            var shop_details = JSON.parse(localStorage.getItem("shop_details"));

            this.setState({

                packingCharges   : shop_details.packing_charges,

            },() => {
                ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
            })

            var netAmount = parseFloat(this.state.netAmnt)+parseFloat(shop_details.packing_charges);
            //console.log("netAmount after take away" +netAmount)
            this.setState({

                netAmnt   : netAmount,

            },() => {
                ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
            })

        }else{


            var shop_details = JSON.parse(localStorage.getItem("shop_details"));
            //var pack = shop_details.packing_charges;
            this.setState({

                packingCharges   : 0,

            },() => {
                ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
            })

            var netAmount = parseFloat(this.state.netAmnt) - parseFloat(shop_details.packing_charges);
            this.setState({

                netAmnt   : netAmount,

            },() => {
                ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
            })

        }
    }

    precisionRound(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
     
    updateInputValue(e) {
       // //console.log("input"+e.target.value)
        this.setState({
          discountValue: e.target.value
        },()=>{
            let perc = (this.state.discountValue/this.state.total_Amnt)*100;

            let totAmnt = this.state.packingCharges + (this.state.total_Amnt - this.state.discountValue);

            this.setState({
                discountPercent : this.precisionRound(perc,2),
                netAmnt : totAmnt
            },() =>{
                //console.log("discountPercent"+this.state.discountPercent);
                //console.log("netAmnt"+this.state.netAmnt);
            });
        });
      }

    componentWillReceiveProps(props){
        let totalAmnt = 0;
        let grandTotal = 0;

        //console.log("componentWillReceiveProps");
        // this.setState({
        //     discountValue : 0,
        //     discountPercent : 0,
        //     packingCharges:0,
        //     takeAway:'Order'
        //
        // },() =>{
        //     document.getElementById("item_discount").value = "";
        // });

        props.billItem.map((item,i) => {
            var itemTotalPrice = parseFloat(item.price) * parseFloat(item.quantity);
            totalAmnt = totalAmnt+itemTotalPrice;
        })

        grandTotal = this.state.packingCharges + (totalAmnt - this.state.discountValue) ;

        this.setState({
            total_Amnt : totalAmnt,
            netAmnt : grandTotal
        },() =>{
            //console.log("totalAmnt"+this.state.total_Amnt);
            //console.log("netAmnt"+this.state.netAmnt);
        });
    }


    generateBill(){

        this.props.handler(this.state);

    }


   render() {

    return (                  
        <div id='billGenerateDiv' class="col-sm-12 col-md-12 col-lg-12 col-xl-12 nopadding">
        
            <div class="card" style={{marginTop:'5px',marginLeft:'5px',marginRight:'5px'}}>

                <div style={{marginTop: '10px'}}>

                    <div style={{display: 'flex', width: '100%', marginRight: '10px'}}>
                        <span style={{width: '50%'}} className="font_size_small thin">Disc.Amount</span>
                        <span style={{width: '50%', marginLeft: '10px'}}
                              className="font_size_small thin">Discount%</span>
                    </div>

                    <div style={{display: 'flex', width: '100%', marginRight: '10px'}}>
                        <div style={{width: '50%', borderBottom: "1px solid #3674d4"}}>
                            <input onChange={this.updateInputValue} id="item_discount" className="font_size_normal thin"
                                   style={{width: "100%", border: "none", color: "#3674d4"}} type="number"
                                   name="itemDiscount"/>
                        </div>
                        <div style={{width: '50%', borderBottom: "1px solid #3674d4", marginLeft: '10px'}}>
                            <span id="totalAmnt" className="font_size_large thick">{this.state.discountPercent}</span>

                        </div>

                    </div>

                </div>
                
                <div style={{marginTop:'10px'}}>
                     
                     <div style={{display:'flex',width:'100%',marginRight:'10px'}}>
                        <span style={{width:'50%'}} class="font_size_small thin">Mode of Payment</span>
                        <span style={{width:'50%',marginLeft:'10px'}} class="font_size_small thin">Order Type</span>
                     </div>

                     <div style={{display:'flex',width:'100%',marginRight:'10px'}}>
{/* value={optionsState} */}
                        <div style={{width:'50%',borderBottom: "1px solid #3674d4"}}>
                            <select  value={this.state.payment_type?this.state.payment_type:"cash"}   onChange={(event) => this.setPaymentType(event)}   class="app_select" style={{width:'100%'}}>
                                <option value="Cash">cash</option>
                                <option value="Card">card</option>
                            </select>
                        </div>
                        <div style={{width:'50%',borderBottom: "1px solid #3674d4",marginLeft:'10px'}}>
                            <select value={this.state.takeAway?this.state.takeAway:"Order"}   onChange={(event) => this.setPackingCharge(event)} class="app_select" style={{width:'100%'}}>
                                <option value="Order">Order</option>
                                <option value="Take Away">Take Away</option>
                            </select>
                        </div>

                     </div>

                </div> 
                
                <div style={{display:'flex',width:'100%',marginTop:'10px'}}>
                     <div style={{width:'40%'}}>
                         <span class="font_size_small thin">Total Amount</span>
                         <div>
                             <span id="totalAmnt" class="font_size_large thick">{this.state.total_Amnt}</span>
                         </div>
                     </div>


                     <div style={{width:'20%'}}>
                         <span class="font_size_small thin">Charges</span>
                         <div>
                             <span id="discount_text" class="font_size_large thick">{this.state.packingCharges}</span>
                         </div>
                     </div>
                    
                    <div align="right" style={{width:'40%'}}>
                         <span class="font_size_small thin">Net Amount Payable</span>
                         <div>
                             <span id="netAmnt" class="font_size_xlarge thick">{this.state.netAmnt}</span>
                         </div>
                     </div>
                
                </div>
            
            </div>
            
            <div style={{marginRight:'5px',marginLeft:'5px'}}>
                     <span style={{cursor:'pointer'}} id='generate' class='aquaBtn thick font_size_small whiteFont' onClick={()=>this.generateBill()}>Generate Bill</span>
            </div>
        
        </div>

      );
   }
}

export default BillGenerateDiv;