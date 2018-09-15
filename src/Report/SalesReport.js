import React from 'react';

class SalesReport extends React.Component {

    constructor(){
        super()
            this.state={
                items : [],
                salesdata : {},
            };
       //this.billableItems= this.billableItems.bind(this);
    }

    render() {

        const divStyle = {
            height : this.props.data.height-112+'px',
            background : '#ffffff'
        } 

        //console.log("height BillingSection"+this.props.data.height)
      return (
                <div class="scroll" style={divStyle}>
                        <div>
                            <div class="row row_top">
                                <div class="col-md-9 DarkblueFont thick">Total Orders</div>  
                                <div class="col-md-3 right_txt blueFont thick">{this.props.salesdata.totalOrder}</div>
                            </div>  
                            {/*<div class="row row_top">
                                <div class="col-md-9 DarkblueFont thick">Opening Cash</div>  
                                <div class="col-md-3 right_txt blueFont thick">7685</div>  
                            </div>  */}
                            <div class="row row_top">
                                <div class="col-md-9 DarkblueFont thick">Cash Receipts</div>  
                                <div class="col-md-3 right_txt blueFont thick">{this.props.salesdata.cashPayments}</div>
                            </div> 
                            <div class="row row_top">
                                <div class="col-md-9 DarkblueFont thick">Card Receipts</div>  
                                <div class="col-md-3 right_txt blueFont thick">{this.props.salesdata.cardPayments}</div>
                            </div>
                            <div class="row row_top">
                                <div class="col-md-9 DarkblueFont thick">Other Receipts</div>  
                                <div class="col-md-3 right_txt blueFont thick">{this.props.salesdata.otherPayments}</div>
                            </div>
                            <div class="row row_top">
                                <div class="col-md-9 DarkblueFont thick">Total Expenses</div>  
                                <div class="col-md-3 right_txt blueFont thick">{this.props.salesdata.totalExpenseDay}</div>
                            </div>
                            {/*<div class="row row_top">
                                <div class="col-md-9 DarkblueFont thick">Total Refunds</div>  
                                <div class="col-md-3 right_txt blueFont thick">22785</div>  
                            </div>   */}
                            <div class="row row_top2">
                                <div class="blueFont col-md-12 total_div blueFont thick">Total sales for the day</div>
                            </div>   
                            <div class="row">
                                <div class="DarkblueFont col-md-12 total_div large_font DarkblueFont thicker total_txt">{this.props.salesdata.total_bill_amount}</div>
                            </div>                        
                        </div>              
            </div>

             );
        }

}
export default SalesReport;