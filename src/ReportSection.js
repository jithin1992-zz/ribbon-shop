import React from 'react';
import OrderReport from './Report/OrderReport';
import ExpenseReport from './Report/ExpenseReport';
import SalesReport from './Report/SalesReport';
import BillReport from './Report/BillReport';
import BillView from './Report/BillView';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class ReportSection extends React.Component {

    constructor(){
        super()
        this.state={
            items : [],
            active : 'BILL_PAGE',
            visibilityPopup: false,
            bill_id:'',
            startDate: moment(),
            salesData :{},
            salesDate :moment().format('DD-MM-YYYY'),
        };

        this.billReport = React.createRef();
        this.orderReport = React.createRef();
        this.expenseReport = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleToggle= this.handleToggle.bind(this);
        this.setSalesViewData= this.setSalesViewData.bind(this);
        this.isActive= this.isActive.bind(this);
        this.togglePopup= this.togglePopup.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date,
            salesDate:date.format("DD-MM-YYYY"),

        });

        //this.billReport.current.loadBillData();
        //console.log("handleChange calling")
        //console.log("date.format(\"DD-MM-YYYY\") calling"+date.format("DD-MM-YYYY"))
        //console.log("this.state.salesDate calling"+this.state.salesDate)
        if(this.state.active=="ORDER_PAGE"){


            this.orderReport.current.loadBillDataDateCahnge(date.format("DD-MM-YYYY"));

        }else if(this.state.active=="EXPENSE_PAGE"){

            this.expenseReport.current.loadExpenseDataDateCahnge(date.format("DD-MM-YYYY"));

        }else if(this.state.active=="BILL_PAGE"){

            this.billReport.current.loadBillDataDateCahnge(date.format("DD-MM-YYYY"));

        }else{


        }
    }

    togglePopup(visibility,bill_id_sel) {
        this.setState({
            visibilityPopup: visibility,
            bill_id:bill_id_sel,
        },()=>{
        });
    }


    handleToggle(page) {
        //var active = this.state.active;
        var active = page;
        var newActive;
        newActive = active

        this.setState({active: newActive},() => {
        })
    }

    setSalesViewData(salesDataFull){

        //console.log("setSalesViewData :: "+salesDataFull);
        //if(salesDataFull){

            this.setState({salesData: salesDataFull},() => {
            })

       // }
    }

    isActive(value){
        return 'tab'+((value===this.state.active) ?'Active':'InActive');
    }


    render() {
        var active = this.state.active;

        return (
            <div>
                <div className="row">

                    <div className="col-md-8 nopadding" >
                        <div className="sectn1">
                            <div style={{display:'flex'}}>

                                <label className="tab thick" className={this.isActive('BILL_PAGE')} id="bill" onClick={()=>this.handleToggle('BILL_PAGE')}>Bills</label>
                                <label className="tab thick" className={this.isActive('ORDER_PAGE')} id="history" onClick={()=>this.handleToggle('ORDER_PAGE')}>Orders</label>
                                <label className="tab thick" className={this.isActive('EXPENSE_PAGE')} id="expns" onClick={()=>this.handleToggle('EXPENSE_PAGE')}>Expenses</label>
                                <div align='right' style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}}>
                                    <DatePicker

                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                    />
                                </div>

                            </div>

                            { active === 'ORDER_PAGE' ? (
                                <OrderReport  ref={this.orderReport}  setSalesView={this.setSalesViewData}  startDate={this.state.salesDate} data={this.props.dimensions}/>
                            ) : active === 'EXPENSE_PAGE' ? (
                                <ExpenseReport ref={this.expenseReport}  setSalesView={this.setSalesViewData} startDate={this.state.salesDate} data={this.props.dimensions} />
                            ) : active === 'BILL_PAGE' ? (
                                <BillReport ref={this.billReport} setSalesView={this.setSalesViewData} startDate={this.state.salesDate} data={this.props.dimensions} handler={this.togglePopup} />
                            ) : null
                            }

                        </div>
                    </div>

                    <div className="col-md-4 nopadding">
                        <div className="sectn1">
                            <label className="tab_single thick" id="history">Sales Summary</label>

                            <SalesReport salesdata={this.state.salesData} data={this.props.dimensions}/>

                        </div>
                    </div>

                </div>

                <BillView data={this.props.dimensions} handler={this.togglePopup} bill_id_selected={this.state.bill_id} visibility={this.state.visibilityPopup}/>

            </div>
        );

    }
}

export default ReportSection;