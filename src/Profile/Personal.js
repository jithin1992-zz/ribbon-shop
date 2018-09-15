import React from 'react';
import {makeApiCall} from "../Actions/ApiCalls";
import dp from '../images/dp.png'


class Personal extends React.Component {

    constructor(){
        super()
        this.state={
            items       : [],
            displayName : [],
            userId      : [],
            userName    : [],
            pswd        : [],
            emailId     : [],
            mobileNo    : [],
            address1    : [],
            address2    : [],
            title       : "Edit Details",
            readOnly: true,
            isLoading : false,

        };
        //this.state = {};

        this.updatePersonalInfo = this.updatePersonalInfo.bind(this);

    }


    updatePersonalInfo (){

        //console.log("title :: "+this.state.title);

        /*this.setState(
            prevState => ({readOnly: !prevState.readOnly}),
            this.nameInput.focus(),
            {title: "Save Details"}
        )*/

        if (this.state.title=="Edit Details" ){

            /*prevState => ({readOnly: !prevState.readOnly});
            this.nameInput.focus(),



            this.setState({

                title: "Save Details",
            },() => {
                ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
            })*/


            //console.log("Profile ::Edit Details")
            this.setState({

                title: "Save Details",
                readOnly:false
            },() => {
                ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
            })


        }
        else{

        var user_id         = this.state.userId;
        var display_name    = this.state.displayName;
        var email_id        = this.state.emailId;
        var mobile_no       = this.state.mobileNo;
        var addr1           = this.state.address1;
        var addr2           = this.state.address2;
        var pswd           = this.state.pswd;

        if (this.validatePersonalInfo(display_name,email_id,mobile_no,addr1,addr2)) {


            this.setState({

                isLoading:true,
            },() => {
                ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
            })


            makeApiCall("personalInfo",{"pswd":pswd,"user_id":user_id.toString(),"userName":display_name,"user_email": email_id,"user_phone": mobile_no,"user_address_line1": addr1,"user_address_line2": addr2}).then((response)=> response.json())
                .then((parsedJSON) => {

                    this.setState({

                        isLoading:false,
                    },() => {
                        ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
                    })


                    //console.log(" Profile api res :: "+JSON.stringify(parsedJSON))
                    if (parsedJSON.status == "true"){

                        ////console.log("Success "+status)
                        alert("Profile details updated successfully!!!");
                        var shopUser = parsedJSON.shopUser;
                        localStorage.setItem("user_details",JSON.stringify(shopUser));
                        prevState => ({readOnly: !prevState.readOnly});
                        this.setState({

                            title: "Edit Details",
                            readOnly:true
                        },() => {
                            ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
                        })


                    }else{
                        alert("Failed to update the Profile details, "+parsedJSON.status_msg);
                        this.setState({
                            errorMsg:parsedJSON.status_desc,
                            hasErrored:true
                        })

                    }
                })
                .catch((error)=> {
                    alert("Failed to update the Profile details!!!");
                    ////console.log("error"+error)
                    this.setState({hasErrored:true})
                })
            


        }

        }



    }


    componentDidMount() {

        var user_details = JSON.parse(localStorage.getItem("user_details"));

        //console.log("user_details :: "+user_details)

        this.setState({
            title       : "Edit Details",
            userId      : user_details.user_id,
            displayName : user_details.userName,
            userName    : user_details.userName,
            pswd        : user_details.password,
            emailId     : user_details.user_email,
            mobileNo    : user_details.user_phone,
            address1    : user_details.user_address_line1,
            address2    : user_details.user_address_line2,

        },() => {
            ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
        })

    }

    updateInputValue(value, key) {

        if(key == 'displayName'){
            this.setState({
                displayName: value,
            },() => {
            })
        }else if(key == 'userName'){
            this.setState({
                userName: value,
            },() => {
            })
        }else if(key == 'pswd'){
            this.setState({
                pswd: value,
            },() => {
            })
        }else if(key == 'emailId'){
            this.setState({
                emailId: value,
            },() => {
            })
        }else if(key == 'mobileNo'){
            this.setState({
                mobileNo: value,
            },() => {
            })
        }else if(key == 'address1'){
            this.setState({
                address1: value,
            },() => {
            })
        }else if(key == 'address2'){
            this.setState({
                address2: value,
            },() => {
            })
        }


    }

    validatePersonalInfo(name,email,mobile,aadr1,addr2){

        if (name){
            if (email) {
                if (mobile) {
                    if (aadr1) {
                        if (addr2) {
                            return true;
                        }else{
                            alert("Please enter the Address");
                            return false;
                        }

                    }else{
                        alert("Please enter the Address");
                        return false;
                    }

                }else{
                    alert("Please enter the Mobile No");
                    return false;
                }

            }else{
                alert("Please enter the Email Id");
                return false;
            }

        }else{
            alert("Please enter the Name");
            return false;
        }
    }


    render() {

        var val = this.state.title;
        //console.log("val _ render()"+val);

        const inputStyle = {
            floating: {
                color: '#3674d4'
            },
            focus: {
                borderColor: '#3674d4',
            },
            input: {
                borderBottomWidth: 1,
                borderBottomColor: '#ebf5fc',
                width: '100%',
            },
            label: {
                marginTop: '.5em',
                width: '100%'
            },
            height:'100%'
        }

        const divStyle = {
            height : this.props.data.height-150+'px',
            background : '#ffffff',
        }

        return (
            <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 profileDiv nopadding">
                <div className="nopadding" style={divStyle}>
                    <div  className="col-sm-12 col-md-12 col-lg-12 col-xl-12 nopadding" >
                        <div style={{height:'100%'}}>

                            <div className=" dialog-title font_size_large thin blackFont" style={{borderBottom:'1px solid #d9d9d9',padding:'12px'}}>
                                <span>Personal Information</span>
                                <div align='right' style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}} onClick={this.updatePersonalInfo}>
                                    <div id="btnAddType" className="white_button2 font_size_small" >{this.state.title}</div>
                                </div>
                            </div>
                            {this.state.isLoading == true ?

                                <div className="loader">
                                    <svg viewBox="0 0 32 32" width="32" height="32">
                                        <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
                                    </svg>
                                </div>
                                :
                                <div style={{margin: '25px'}}>

                                    <div style={{display: 'flex', width: '100%', marginBottom: '10px'}}>
                                        <div style={{width: '50%'}}>

                                            <div align="center" style={{marginRight: 'auto', marginLeft: 'auto'}}>
                                                <img src={dp} className='xlarge_icon'/>
                                            </div>

                                        </div>

                                        <div style={{width: '50%', marginLeft: '10px'}}>

                                            <div style={{marginBottom: '10px', width: '100%'}}>

                                                    <span style={{
                                                        paddingTop: '1px',
                                                        width: '100%',
                                                        color: '#3674d4',
                                                    }} className='font_size_small normal'>Display Name</span>

                                                <input
                                                    id='displayName'
                                                    placeholder="Enter Your Name"
                                                    className="font_size_med thick"
                                                    style={{width: '100%', border: 'none'}}
                                                    type="text"
                                                    name="displayName"
                                                    ref={(input) => {
                                                        this.nameInput = input;
                                                    }}
                                                    readOnly={this.state.readOnly}
                                                    value={this.state.displayName}
                                                    onChange={(e) => {
                                                        this.updateInputValue(e.target.value, 'displayName')
                                                    }}/>

                                            </div>

                                            <div style={{marginBottom: '10px', width: '100%', display: 'none',}}>

                                                    <span style={{
                                                        paddingTop: '1px',
                                                        width: '100%',
                                                        color: '#3674d4',
                                                    }} className='font_size_small normal'>Username</span>

                                                <input
                                                    id='userName'
                                                    placeholder="Enter Username"
                                                    className="font_size_med thick"
                                                    style={{width: '100%', border: 'none'}}
                                                    type="text"
                                                    name="userName"
                                                    readOnly={true}
                                                    value={this.state.userName}
                                                    onChange={(e) => {
                                                        this.updateInputValue(e.target.value, 'userName')
                                                    }}
                                                />

                                            </div>

                                            <div style={{marginBottom: '10px', width: '100%'}}>

                                                    <span style={{
                                                        paddingTop: '1px',
                                                        width: '100%',
                                                        color: '#3674d4',
                                                    }} className='font_size_small normal'>Password</span>

                                                <input
                                                    id='pswd'
                                                    placeholder="Enter Password"
                                                    className="font_size_med thick"
                                                    style={{width: '100%', border: 'none'}}
                                                    type="password"
                                                    name="pswd"
                                                    readOnly={this.state.readOnly}
                                                    value={this.state.pswd}
                                                    onChange={(e) => {
                                                        this.updateInputValue(e.target.value, 'pswd')
                                                    }}
                                                />

                                            </div>

                                            <div style={{marginBottom: '10px', width: '100%'}}>

                                            <span style={{
                                                paddingTop: '1px',
                                                width: '100%',
                                                color: '#3674d4',
                                            }} className='font_size_small normal'>Registered Email Id</span>

                                                <input
                                                    id='emailId'
                                                    placeholder="Enter Registered Email Id"
                                                    className="font_size_med thick"
                                                    style={{width: '100%', border: 'none'}}
                                                    type="text"
                                                    name="emailId"
                                                    readonly={this.state.readOnly}
                                                    value={this.state.emailId}
                                                    onchange={(e) => {
                                                        this.updateInputValue(e.target.value, 'emailId')
                                                    }}
                                                />

                                            </div>

                                            <div style={{marginBottom: '10px', width: '100%'}}>

                                            <span style={{
                                                paddingTop: '1px',
                                                width: '100%',
                                                color: '#3674d4',
                                            }} className='font_size_small normal '>Mobile Number</span>

                                                <input
                                                    id='mobileNo'
                                                    placeholder="Enter Mobile Number"
                                                    className="font_size_med thick"
                                                    style={{width: '100%', border: 'none'}}
                                                    type="text"
                                                    name="mobileNo"
                                                    readonly={this.state.readOnly}
                                                    value={this.state.mobileNo}
                                                    onchange={(e) => {
                                                        this.updateInputValue(e.target.value, 'mobileNo')
                                                    }}
                                                />

                                            </div>

                                        </div>

                                    </div>


                                    <div style={{marginBottom: '10px', width: '100%'}}>

                                            <span style={{
                                                paddingTop: '1px',
                                                width: '100%',
                                                color: '#3674d4',
                                            }} className='font_size_small normal'>Address Line 1</span>

                                        <input
                                            id='address1'
                                            placeholder="Enter Address"
                                            className="font_size_med thick"
                                            style={{width: '100%', border: 'none'}}
                                            type="text"
                                            name="address1"
                                            readOnly={this.state.readOnly}
                                            value={this.state.address1}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'address1')
                                            }}
                                        />

                                    </div>

                                    <div style={{marginBottom: '10px', width: '100%'}}>

                                            <span style={{
                                                paddingTop: '1px',
                                                width: '100%',
                                                color: '#3674d4',
                                            }} className='font_size_small normal'>Address Line 2</span>

                                        <input
                                            id='address2'
                                            placeholder="Enter Address"
                                            className="font_size_med thick"
                                            style={{width: '100%', border: 'none'}}
                                            type="text"
                                            name="address2"
                                            readOnly={this.state.readOnly}
                                            value={this.state.address2}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'address2')
                                            }}
                                        />

                                    </div>

                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Personal;