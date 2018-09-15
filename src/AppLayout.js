import React, {PropTypes}  from 'react';
import BillingSection from './BillingSection.js';
import StockSection from './StockSection.js';
import ExpenseSection from './ExpenseSection.js';
import {BrowserRouter as Router ,Switch, Route,Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import ShopMngmntSection from './ShopMngmntSection.js';
import ReportSection from "./ReportSection";
import ProfileSection from "./ProfileSection";

import menu from './images/menu.png';
import bill from './images/bill.png';
import stock from './images/stock.png';
import expense from './images/expense.png';
import mngmnt from './images/management.png';
import report from './images/report.png';
import profile from './images/profile.png';


class AppLayout extends React.Component {
    constructor(props){
        super(props)
        this.state = {width: 0,height:0};
        this.updateWindowsDimensions = this.updateWindowsDimensions.bind(this);



    }

    componentDidMount(){
        this.updateWindowsDimensions();
        window.addEventListener('resize',this.updateWindowsDimensions);
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.updateWindowsDimensions);
    }

    updateWindowsDimensions(){
        this.setState({width:window.innerWidth,height:window.innerHeight});
    }

    render() {
        const divStyle = {
            height : this.state.height+'px',
            width : this.state.width+'px',
        }

        ////console.log("height AppLayout"+this.state.height)
        //console.log("this.props.childrens"+this.props.children)
        return (
            <div>
                <Header expenseUpdate={this.props.expenseUpdate}   shopOwner={this.props.shopOwner} history={this.props.history}/>
                {/*<Content data={this.state} path={this.props.match.path}/>*/}
                <div className="main" style={divStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class Header extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            visibilityMenu: false,
            activePage : "Items Billing"
          };
         
          this.toggleMenu = this.toggleMenu.bind(this);
          this.logOut = this.logOut.bind(this);

        if(localStorage.getItem("user_name")){

            var user_name = localStorage.getItem("user_name");
            this.state = {userName:user_name};

        }else{

            this.state = {userName:''};
        }
        //console.log("userName :: "+this.state.userName)

    }

    logOut(){

        localStorage.removeItem("user_id");
        localStorage.removeItem("shop_id");
        localStorage.removeItem("packing_charge");
        localStorage.removeItem("is_cashier_flag");
        localStorage.removeItem("user_inventory_perm");
        localStorage.removeItem("user_expense_update_perm");
        localStorage.removeItem("shop_name");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_details");
        localStorage.removeItem("shop_details");
        localStorage.removeItem("todaysmenu");
        localStorage.removeItem("myshopcashiers");

        localStorage.removeItem("myshopcashiers");
        localStorage.removeItem("fetchShopMenuCategories");
        this.props.history.replace('/')

    }

    toggleMenu(pageSelected) {
        this.setState({
            visibilityMenu: !this.state.visibilityMenu,
            activePage : pageSelected
        },()=>{
        });
      }

    render() {
       return (
           <div>
                <div className="header" style={{display:'flex',width:'100%'}}>
                    <div onClick={()=>this.toggleMenu(this.state.activePage)} style={{marginTop: 'auto',marginBottom: 'auto'}}> 
                        <img src={menu} className='small_icon_unpadded'/>
                    </div>
                    <div style={{marginTop: 'auto',marginBottom: 'auto'}}>
                        <div className="header__title">
                            <span align="right" className="font_size_med thick">{this.state.activePage}</span>
                        </div>
                    </div>
                    
                    <div className="header__title">
                        <span style={{float: 'right',clear: 'right',position: 'relative'}} className="font_size_small thin nopadding">Logged in as </span>
                        <span style={{float: 'right',clear: 'right',position: 'relative'}} className="whiteFont font_size_small thick nopadding">{this.state.userName} </span>
                    </div>   
                    <div align="right" className= "right" style={{marginTop: 'auto',marginBottom: 'auto'}}   onClick={this.logOut}>
                        <div id="logout" className= "right logout_btn blueFont font_size_med thick nopadding">Logout</div>
                    </div>

                </div>
                <Menu expenseUpdate={this.props.expenseUpdate}   shopOwner={this.props.shopOwner} menuSelection={this.toggleMenu} menuVisibility={this.state.visibilityMenu}/>
            </div>
       );
    }
 }

 class Content extends React.Component {
    render() {
        
        const divStyle = {
            height : this.props.data.height+'px',
            width : this.props.data.width+'px',
        } 
        //console.log("height Content"+this.props.data.height)

       return (  
                <div className="main" style={divStyle}>
                    <Switch>
                        <Route exact={true} path='/' render={(props) => ( <BillingSection dimensions={this.props.data}/> )} />
                        <Route exact={true} path='/stockPage' render={(props) => ( <StockSection dimensions={this.props.data}/>)} />
                        <Route exact={true} path='/expensePage' render={(props) => ( <ExpenseSection dimensions={this.props.data}/>)} />
                        <Route exact={true} path='/shopMngmntPage' render={(props) => ( <ShopMngmntSection dimensions={this.props.data}/>)} />
                        <Route exact={true} path='/reportPage' render={(props) => ( <ReportSection dimensions={this.props.data}/>)} />
                        <Route exact={true} path='/profilePage' render={(props) => ( <ProfileSection dimensions={this.props.data}/>)} />
                    </Switch>
                </div>
       );
    }
 }

 class Menu extends React.Component {

    constructor(props){
        super(props)

        this.updateMenuSelection = this.updateMenuSelection.bind(this);

    }
    updateMenuSelection(pageSelected){

        //console.log("height updateMenuSelections");
        this.props.menuSelection(pageSelected);
    }

    render() {
      var visibility = "hide";
   
      if (this.props.menuVisibility) {
        visibility = "show";
      }
      if (!this.props.menuVisibility) {
        visibility = "hide";
      }
   
    const divStyle = {
        padding : '10px',borderBottom: '1px solid #f9f9f9',display:'flex'
    }
    const spanStyle = {
        padding : '10px',
    }

      return (
        <div id="flyoutMenu" className={visibility}>
          
          <div className="darkBlueFont thin font_size_large" style={divStyle} >
            <div style={{width:'15%',paddingLeft : '5px'}}>
                <img src={bill} className='small_icon_unpadded'/>
            </div>
            <Link to="/landingPage">
                <MenuItem handler={this.updateMenuSelection} hash="Items Billing">Billing</MenuItem>
            </Link>
          </div>

          <div className="darkBlueFont thin font_size_large" style={divStyle} >
            <div style={{width:'15%',paddingLeft : '5px'}}>
                <img src={stock} className='small_icon_unpadded'/>
            </div>
            <Link to="/stockPage">
                <MenuItem handler={this.updateMenuSelection} hash="Stock">Stock</MenuItem>
            </Link>
          </div>

          <div className="darkBlueFont thin font_size_large" style={divStyle}  >
            <div style={{width:'15%',paddingLeft : '5px'}}>
                <img src={expense} className='small_icon_unpadded'/>
            </div>
            <Link to="/expensePage">
                <MenuItem handler={this.updateMenuSelection} hash="Expense">Expense</MenuItem>
            </Link>
          </div>
            {this.props.shopOwner==true ?

                <div className="darkBlueFont thin font_size_large" style={divStyle}>
                    <div style={{width: '15%', paddingLeft: '5px'}}>
                        <img src={mngmnt} className='small_icon_unpadded'/>
                    </div>
                    <Link to="/shopMngmntPage">
                        <MenuItem handler={this.updateMenuSelection} hash="Shop Management">Shop Management</MenuItem>
                    </Link>
                </div>

                : null}



          <div className="darkBlueFont thin font_size_large" style={divStyle}  >
            <div style={{width:'15%',paddingLeft : '5px'}}>
                <img src={report} className='small_icon_unpadded'/>
            </div>
            <Link to="/reportPage">
                <MenuItem handler={this.updateMenuSelection} hash="Report">Sales Report</MenuItem>
            </Link>
          </div>

            {this.props.shopOwner==true ?

                <div className="darkBlueFont thin font_size_large" style={divStyle}>
                    <div style={{width: '15%', paddingLeft: '5px'}}>
                        <img src={profile} className='small_icon_unpadded'/>
                    </div>
                    <Link to="/profilePage">
                        <MenuItem handler={this.updateMenuSelection} hash="My Profile">My Profile</MenuItem>
                    </Link>
                </div>

                : null}

          {/* <div className="darkBlueFont thin font_size_large" style={divStyle}>
            <Link to="/notificationPage">    
                <MenuItem handler={this.updateMenuSelection} hash="Notifications">Notifications</MenuItem>
            </Link>
          </div> */}
        </div>
      );
    }
  }

  class MenuItem extends React.Component{

    navigate(hash) {
        window.location.hash = hash;
        this.props.handler(hash)
      }

    render(){
        return <div onClick={this.navigate.bind(this, this.props.hash)}>{this.props.children}</div>;
      }
  }

  export default withRouter(AppLayout);