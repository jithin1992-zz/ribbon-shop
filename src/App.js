import React, {PropTypes}  from 'react';
import {BrowserRouter as Router ,Switch, Route} from 'react-router-dom';
import AppLayout from './AppLayout';
import InitPage from './Onboarding/InitPage';
import BusinessInfo from './Onboarding/BusinessInfo';
import CashierInfo from './Onboarding/CashierInfo';
import PersonalInfo from './Onboarding/PersonalInfo';
import WelcomePage from './Onboarding/WelcomePage';
import LoginPage from './Onboarding/LoginPage';
import BillingSection from './BillingSection.js';
import StockSection from './StockSection.js';
import ExpenseSection from './ExpenseSection.js';
import ShopMngmntSection from './ShopMngmntSection.js';
import ReportSection from "./ReportSection";
import ProfileSection from "./ProfileSection";
import OffLineBill, {processOffLineBills} from './Actions/OffLineBill';

import { withRouter } from "react-router-dom";



class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            width: 0,
            height:0,
            alreadyRegistered : false,
            businessInfo : '',
            personalInfo : ''
        };

        this.updateWindowsDimensions = this.updateWindowsDimensions.bind(this);
        this.onBoardingDataStore = this.onBoardingDataStore.bind(this);
        this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
        this.updateOfflineStatus = this.updateOfflineStatus.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.setFlags = this.setFlags.bind(this);
        //this.setFlags();


        window.addEventListener('online',  this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOfflineStatus);
        window.onload = function(){

            processOffLineBills();
            //alert(navigator.onLine)
        };


        if(localStorage.getItem("is_cashier_flag")){

            ////console.log("is_cashier_flag  :: "+localStorage.getItem("is_cashier_flag"))
            if(localStorage.getItem("is_cashier_flag")==0){


                this.state = {
                    shopOwner: true,
                };

            }else{


                this.state = {
                    shopOwner: false,
                };


            }
        }else{

            this.state = {
                shopOwner: false,
            };

        }
        ////console.log("shopOwner :: "+this.state.shopOwner)

        if(localStorage.getItem("user_id")){


            this.state = {
                alreadyRegistered: true,
            };



        }else{

            this.state = {
                alreadyRegistered: false,
            };

        }

        //console.log("alreadyRegistered : "+this.state.alreadyRegistered);

 //console.log("user_expense_update_perm" +localStorage.getItem("user_expense_update_perm"))
        if(localStorage.getItem("user_expense_update_perm")){


            if(localStorage.getItem("user_expense_update_perm")==1){

                this.setState({
                    expenseUpdate: true,
                },() => {
                    //console.log("expenseUpdate "+this.state.expenseUpdate);
                })

            }else{

                this.setState({
                    expenseUpdate: false,
                },() => {
                    //console.log("expenseUpdate "+this.state.expenseUpdate);
                })

            }

        }else{


            this.setState({
                expenseUpdate: false,
            },() => {
                //console.log("expenseUpdate "+this.state.expenseUpdate);
            })

        }
        //console.log("expenseUpdate "+this.state.expenseUpdate);




    }




     updateOnlineStatus()
    {

        document.getElementById("noNet").style.display="none";
        //console.log("User is online");
        processOffLineBills();
    }

     updateOfflineStatus()
    {

        document.getElementById("noNet").style.display="block";

        //console.log("User is offline");
    }

    closeAlert(){

        document.getElementById("noNet").style.display="none";

    }


    componentDidMount(){
        this.updateWindowsDimensions();

        this.state.alreadyRegistered == true ? (
            this.props.history.push('/landingPage')
        ) : null

        window.addEventListener('resize',this.updateWindowsDimensions);
        this.setFlags();
        if(!navigator.onLine){

            //console.log("navigator.onLine inner : "+navigator.onLine);
            this.updateOfflineStatus();
        }
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.updateWindowsDimensions);
        this.setFlags();
    }

    updateWindowsDimensions(){
        this.setState({width:window.innerWidth,height:window.innerHeight});
    }

    onBoardingDataStore(type,data){

        type === 'Business' ?(
            ////console.log("Business _data"+data.LicenseNo)
            this.setState({businessInfo:data})
        ) : (
            ////console.log("Personnel_data"+data.address2)
            this.setState({personalInfo:data})
        )

    }

    setFlags(){


        if(localStorage.getItem("is_cashier_flag")){

            //console.log("is_cashier_flag  :: "+localStorage.getItem("is_cashier_flag"))
            if(localStorage.getItem("is_cashier_flag")==0){




                this.setState({
                    shopOwner: true,
                },() => {
                    //console.log("shopOwner "+this.state.shopOwner);
                })




            }else{



                this.setState({
                    shopOwner: false,
                },() => {
                    //console.log("shopOwner "+this.state.shopOwner);
                })

            }
        }else{

            this.setState({
                shopOwner: false,
            },() => {
                //console.log("shopOwner "+this.state.shopOwner);
            })


        }
        //console.log("shopOwner :: "+this.state.shopOwner)

        if(localStorage.getItem("user_id")){




            this.setState({
                alreadyRegistered: true,
            },() => {
                //console.log("alreadyRegistered "+this.state.alreadyRegistered);
            })



        }else{



            this.setState({
                alreadyRegistered: false,
            },() => {
                //console.log("alreadyRegistered "+this.state.alreadyRegistered);
            })

        }

        //console.log("alreadyRegistered : "+this.state.alreadyRegistered);



        if(localStorage.getItem("user_expense_update_perm")){


            if(localStorage.getItem("user_expense_update_perm")==1){

                this.setState({
                    expenseUpdate: true,
                },() => {
                    //console.log("expenseUpdate "+this.state.expenseUpdate);
                })

            }else{

                this.setState({
                    expenseUpdate: false,
                },() => {
                    //console.log("expenseUpdate "+this.state.expenseUpdate);
                })

            }

        }else{


            this.setState({
                expenseUpdate: false,
            },() => {
                //console.log("expenseUpdate "+this.state.expenseUpdate);
            })

        }
        //console.log("expenseUpdate "+this.state.expenseUpdate);


    }

    render(){

        const divStyle={ 
            height : this.state.height+'px',
            width : this.state.width+'px',

        };


        const history = this.props.history;
        //console.log("history"+history);

        return(
            <div className="bg " style={divStyle}>



                <div>
                    <Switch>
                        <Route exact={true} path='/' render={(props) => ( <InitPage history={history}  dimensions={this.state}/> )} />
                        <Route exact={true} path='/personalInfo' render={(props) => ( <PersonalInfo history={history} handler={this.onBoardingDataStore} dimensions={this.state}/>)} />
                        <Route exact={true} path='/businessInfo' render={(props) => ( <BusinessInfo history={history} setFlags={this.setFlags} personalInfo={this.state.personalInfo} handler={this.onBoardingDataStore} dimensions={this.state}/>)} />
                        <Route exact={true} path='/welcomePage'  render={(props) => ( <WelcomePage history={history} dimensions={this.state}/>)} /> />
                        <Route exact={true} path='/loginPage' render={(props) => ( <LoginPage setFlags={this.setFlags} history={history} dimensions={this.state}/>)} /> />
                        <Route exact={true} path='/CashierInfo' render={(props) => ( <CashierInfo  setFlags={this.setFlags} history={history} dimensions={this.state}/>)} /> />
                        <AppLayout history={history}  expenseUpdate={this.state.expenseUpdate} shopOwner={this.state.shopOwner} dimensions={this.state}>

                            <Route exact={true} path='/landingPage' render={(props) => ( <BillingSection dimensions={this.state}/> )} />
                            <Route exact={true} path='/stockPage' render={(props) => ( <StockSection dimensions={this.state}/>)} />
                            <Route exact={true} path='/expensePage' render={(props) => ( <ExpenseSection dimensions={this.state}/>)} />
                            <Route exact={true} path='/shopMngmntPage' render={(props) => ( <ShopMngmntSection dimensions={this.state}/>)} />
                            <Route exact={true} path='/reportPage' render={(props) => ( <ReportSection dimensions={this.state}/>)} />
                            <Route exact={true} path='/profilePage' render={(props) => ( <ProfileSection dimensions={this.state}/>)} />

                        </AppLayout>
                        {/*<Route exact={true} path='/landinPage' render={(props) => ( <App  history={history}  dimensions={this.state}/> )} />*/}
                    </Switch>

                </div>
                <div id='noNet' className="alertNoInternet">
                    <span className="closebtn" onClick={this.closeAlert}>&times;</span>

                    <strong>Network!</strong> &nbsp;&nbsp;   You are not connected with internet.
                </div>
            </div>
        );
    };
}

export default withRouter(App);