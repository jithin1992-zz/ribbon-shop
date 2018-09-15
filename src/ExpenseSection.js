import React from 'react';
import FloatingLabel from 'floating-label-react';
import ExpenseList from './Expense/ExpenseList';
import ExpenseUpdate from './Expense/ExpenseUpdate';
import ExpenseNewEntry from './Expense/ExpenseNewEntry';
import {makeApiCall} from "./Actions/ApiCalls";
import moment from 'moment';
import DatePicker from 'react-datepicker';

class ExpenseSection extends React.Component {

    constructor(){
        super()
        this.state={
            items : [],
            selectedExpense : [],
            active : 'NEW_ENTRY_PAGE',
            expenseDate :"",
        };

        this.selectedExpenseHandler= this.selectedExpenseHandler.bind(this);

        this.fetchData= this.fetchData.bind(this);
        this.changeExpenseDate= this.changeExpenseDate.bind(this);
        this.updatedExpense= this.updatedExpense.bind(this);
        global.date_exp = "";
        this.handleToggle= this.handleToggle.bind(this);
    }

    fetchData(date_bill){

        var shop_id = localStorage.getItem("shop_id")
        //var today = new Date();
        //var date_bill = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();


        global.date_exp =  date_bill;
        //console.log("global.date_exp is ::: "+global.date_exp);

        makeApiCall("fetchShopExpense",{"shop_id":shop_id,"expense_date":date_bill}).then((response)=> response.json())
            .then((parsedJSON) => ( parsedJSON.status == "true" ?


                parsedJSON.expenseList.map(
                    expense_list => (
                        {
                            expenseID : `${expense_list.expenseID}`,
                            expenseName : `${expense_list.expenseName}`,
                            expenseType : `${expense_list.expenseType}`,
                            expenseUpdatedPerson : `${expense_list.expenseUpdatedPerson}`,
                            expenseQuantity : `${expense_list.expenseQuantity}`,
                            expenseUnit : `${expense_list.expenseUnit}`,
                            expenseAmount : `${expense_list.expenseAmount}`,
                            expenseUpdatedDate : `${expense_list.expenseUpdatedDate}`
                        }
                    )
                )




                : this.setState({
                    errorMsg:parsedJSON.status_msg,
                    hasErrored:true
                }))




            )

            .then((items)=> {
            this.setState({
                items,
                isLoading:false
            },()=>{
                //this.selectedExpenseHandler(this.state.items[0])
            })

            this.state.items.length>0 ? this.setState({

                active : 'UPDATE_PAGE',

            },()=>{
                this.selectedExpenseHandler(this.state.items[0])
            }) : console.log("no expense iteems so redirecting to new entry page")


            }).catch(function(e) {
            //console.error('Error during addNewProductByShop:', e);
            alert("Unable to load expense details now now. Please try again later");
            this.setState({hasErrored:true})

        });



    };



    componentDidMount(){
        //this.fetchData('./expense.json');
        //this.fetchData('http://50.112.43.161:8080/ribbon_api/api/listProducts');

        var date_bill = moment().format('DD-MM-YYYY');



        this.fetchData(date_bill);
    }

    changeExpenseDate(date){

        this.fetchData(date);


    }

    updatedExpense(){


        this.fetchData(global.date_exp);


    }
    selectedExpenseHandler(selectedItem){
        this.setState({selectedExpense: selectedItem},() => {
            //console.log("selected item _ stockSection"+this.state.selectedStock)
         }) 
    }

    handleToggle(page) {
        //var active = this.state.active;
        var active = page;
        var newActive = active === 'UPDATE_PAGE' ? 'NEW_ENTRY_PAGE' : 'UPDATE_PAGE';
        this.setState({active: newActive},() => {
         }) 
    }

    render() {
      var active = this.state.active;

      return (
       <div className="row nopadding" >
            
            <ExpenseList data={this.props.dimensions} changeDate={this.changeExpenseDate} toggleHandler={this.handleToggle} expenseItems={this.state.items} viewSelectedItemHandler={this.selectedExpenseHandler}/>
            
            { active === 'UPDATE_PAGE' ? (
                    <ExpenseUpdate data={this.props.dimensions} itemToEdit={this.state.selectedExpense}  afterUpdate={this.updatedExpense} toggleHandler={this.handleToggle}/>
                ) : active === 'NEW_ENTRY_PAGE' ? (
                    <ExpenseNewEntry  updateView ={this.fetchData}  afterAdd={this.updatedExpense}  data={this.props.dimensions} />
                ) : null
            }
            
            
        </div>


      )
    }
}

export default ExpenseSection;