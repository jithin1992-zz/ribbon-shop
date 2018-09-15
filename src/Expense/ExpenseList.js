import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
class ExpenseList extends React.Component {

    constructor(){
        super()
        this.state={
            selectedItems : [],
            page: 'NEW_ENTRY_PAGE',
            expenseDate: moment(),
            expenseLoadDate: "",
        };

        this.expenseItemSelected= this.expenseItemSelected.bind(this);
        this.handleChange= this.handleChange.bind(this);

    }

    expenseItemSelected(index){

        this.setState({
            selectedItems: this.props.expenseItems[index],
            page: 'NEW_ENTRY_PAGE'
        },() => {
            this.props.viewSelectedItemHandler(this.state.selectedItems);
            this.props.toggleHandler(this.state.page);
            //console.log("selected item _ StockList"+this.state.selectedItems)
        })     
    }

    handleChange(date) {
        this.setState({
            expenseDate: date,

            expenseLoadDate:date.format("DD-MM-YYYY"),
        });

        this.props.changeDate(date.format("DD-MM-YYYY"));
    }


    render() {
        const divStyle = {
            height : this.props.data.height-55+'px',
            background : '#ffffff'
        } 

        return (
                <div className="col-sm-8 col-md-8 col-lg-8 col-xl-8 nopadding">
                    <div className="card" >
                            <div style={{display:'flex',width:'100%',marginBottom:'10px',marginTop:'10px'}}>                    
                                <div className="nopadding" style={{width:'50%'}}>

                                    <div><div style={{width:'auto',float:'left',paddingRight:'10px'}}>Expense list of</div><div> <DatePicker
                                        dateFormat="DD-MM-YYYY"
                                        selected={this.state.expenseDate}
                                        onChange={this.handleChange}
                                    /> </div></div>


                                </div>        
                                <div align="right" className="nopadding" style={{width:'50%'}}>
                                    <div style={{width:'30%',display:'none'}}>
                                        <span id='updateExpense' className='reportBtn thick' >Generate Report</span>
                                    </div> 
                                </div>
                            </div>
                            <div id="expenseList" className="scroll" style={{height:this.props.data.height-110+'px'}}>               
                                <table className="expenseTable" style={{width:'100%',border: '1px solid #b7cdde'}}>              
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
                                        {this.props.expenseItems.length>0 ? this.props.expenseItems.map((item,index) => (
                                                
                                                <tr onClick={()=>this.expenseItemSelected(index)}>
                                                    <td>
                                                        <span className="font_size_small">{index+1}</span>
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
                                                        <span className="font_size_small">{item.expenseAmount}</span>
                                                    </td>
                                                </tr>
    
                                                ))

                                            :
                                            <tr align="center">
                                                <td colSpan="6">No Expense Items For This Date</td>
                                            </tr>

                                        }
             
                                    </table>
                                
                            </div>
                    </div>                  
                </div>
        )
    }

}

export default ExpenseList;