import React from 'react';
import FloatingLabel from 'floating-label-react';
import { makeApiCall } from '../Actions/ApiCalls';

class Business extends React.Component {

    constructor(){
        super()
        this.state={
            items           : [],
            shopName        : [],
            shopId          : [],
            shopGstNo       : [],
            shopLicNo       : [],
            businessType    : [],
            region          : [],
            pincode         : [],
            packingCharge   : [],
            title           : "Edit Details",
            isLoading : false,
        };
        this.state = {readOnly: true}
        this.updateBusinessInfo = this.updateBusinessInfo.bind(this);


    }

    updateBusinessInfo(){

        this.setState(
            prevState => ({readOnly: !prevState.readOnly}),
            this.nameInput.focus()
        )

        if (this.state.title=="Edit Details" ){
            // this.setState(
            //     prevState => ({readOnly: !prevState.readOnly}),
            //     this.nameInput.focus(),
            //     {title: "Save Details"}
            // )

            //console.log("Business ::Edit Details")
            prevState => ({readOnly: !prevState.readOnly});
            this.nameInput.focus(),

            this.setState({

                title: "Save Details",
            },() => {
                ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
            })

        }else {

            var shop_name = this.state.shopName;
            var shop_id = this.state.shopId;
            var shop_gst_no = this.state.shopGstNo;
            var shop_lic_no = this.state.shopLicNo;
            var pincode = this.state.pincode;
            var packing_charge = this.state.packingCharge;


            this.setState({

                isLoading:true,
            },() => {
                ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
            })


            if (this.validateBusinessInfo(shop_name, shop_gst_no, shop_lic_no, pincode, packing_charge)) {


                makeApiCall("busInfo", {
                            "shop_id": shop_id,
                                "shop_name": shop_name,
                    "shop_gst_number": shop_gst_no,
                    "licence_number": shop_lic_no,
                    "packing_charge": packing_charge.toString(),
                    "pincode": pincode.toString()

                    }).then((response) => response.json())
                        .then(

                           (parsedJSON) => {


                               this.setState({

                                   isLoading:false,
                               },() => {
                                   ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
                               })


                            //console.log(" busInfo api res :: "+JSON.stringify(parsedJSON))
                            if (parsedJSON.status == "true") {

                                ////console.log("Success "+status)
                                alert("Business details updated successfully!!!");
                                var shop_details = parsedJSON.shop_details;
                                //var packing_charge = parsedJSON.packing_charge;
                                var shopName = parsedJSON.shop_details.shopName;

                                //localStorage.setItem("packing_charge", packing_charge);
                                localStorage.setItem("shop_name", shopName);
                                localStorage.setItem("shop_details", JSON.stringify(shop_details));

                                prevState => ({readOnly: !prevState.readOnly});
                                this.setState({

                                    title: "Edit Details",
                                },() => {
                                    ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
                                })


                            } else {
                                alert("Failed to update the Business details ");
                                this.setState({
                                    errorMsg: parsedJSON.status_msg,
                                    hasErrored: true
                                })

                            }
                        })
                        .catch((error) => {
                            alert("Failed to update the Business details!!!");
                            ////console.log("error"+error)
                            this.setState({hasErrored: true})
                        })


            }
        }
    }

    validateBusinessInfo(shop_name,shop_gst_no,shop_lic_no,pincode,packing_charge){

        if (shop_name){
            if (shop_gst_no) {
                if (shop_lic_no) {
                    if (pincode) {
                        if (packing_charge) {
                            return true;
                        }else{
                            alert("Please enter Packing Charge");
                            return false;
                        }

                    }else{
                        alert("Please enter Pincode");
                        return false;
                    }

                }else{
                    alert("Please enter Shop License Number");
                    return false;
                }

            }else{
                alert("Please enter Shop GST Number");
                return false;
            }

        }else{
            alert("Please enter Shop Name");
            return false;
        }
    }

    componentDidMount() {

        //var packing_charge = localStorage.getItem("packing_charge");
        var shop_details = JSON.parse(localStorage.getItem("shop_details"));

       // //console.log("packing_charge :: "+packing_charge)
        //console.log("shop_details :: "+shop_details)

        this.setState({
            title           : "Edit Details",
            shopId          : shop_details.shop_id,
            shopName        : shop_details.shop_name,
            shopGstNo       : shop_details.shop_gst_number,
            shopLicNo       : shop_details.licence_number,
            businessType    : shop_details.shop_category_id,
            region          : shop_details.region_id,
            pincode         : shop_details.pincode,
            packingCharge   : shop_details.packing_charges,

        },() => {
            ////console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
        })

    }

    updateInputValue(value, key) {

        if(key == 'shopName'){
            this.setState({
                shopName: value,
            },() => {
            })
        }else if(key == 'shopGstNo'){
            this.setState({
                shopGstNo: value,
            },() => {
            })
        }else if(key == 'shopLicNo'){
            this.setState({
                shopLicNo: value,
            },() => {
            })
        }else if(key == 'businessType'){
            this.setState({
                businessType: value,
            },() => {
            })
        }else if(key == 'region'){
            this.setState({
                region: value,
            },() => {
            })
        }else if(key == 'pincode'){
            this.setState({
                pincode: value,
            },() => {
            })
        }else if(key == 'packingCharge'){
            this.setState({
                packingCharge: value,
            },() => {
            })
        }


    }

    render() {

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

        ////console.log("selected item _ render()"+this.state.selectedStockData.itemName);
        return (
            <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 profileDiv nopadding">
                <div className="nopadding" style={divStyle}>
                    <div  className="col-sm-12 col-md-12 col-lg-12 col-xl-12 nopadding" >
                        <div style={{height:'100%'}}>

                            <div className=" dialog-title font_size_large thin blackFont" style={{borderBottom:'1px solid #d9d9d9',padding:'12px'}}>
                                <span>Business Information</span>
                                <div align='right' style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}} onClick={this.updateBusinessInfo}>
                                    <div id="btnAddType" className="white_button2 font_size_small">{this.state.title}</div>
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

                                    <div style={{marginBottom: '10px', width: '100%'}}>

                                                <span style={{
                                                    paddingTop: '1px',
                                                    width: '100%',
                                                    color: '#3674d4',
                                                }} className='font_size_small normal'>Shop Name</span>

                                        <input
                                            id='shopName'
                                            placeholder="Enter Shop Name"
                                            className="font_size_med thick"
                                            style={{width: '100%', border: 'none'}}
                                            type="text"
                                            name="shopName"
                                            ref={(input) => {
                                                this.nameInput = input;
                                            }}
                                            readOnly={this.state.readOnly}
                                            value={this.state.shopName}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'shopName')
                                            }}
                                        />

                                    </div>

                                    <div style={{marginBottom: '10px', width: '100%'}}>

                                                <span style={{
                                                    paddingTop: '1px',
                                                    width: '100%',
                                                    color: '#3674d4',
                                                }} className='font_size_small normal '>Shop GST Number</span>

                                        <input
                                            id='shopGstNo'
                                            placeholder="Enter Shop GST Number"
                                            className="font_size_med thick"
                                            style={{width: '100%', border: 'none'}}
                                            type="text"
                                            name="shopGstNo"
                                            readOnly={this.state.readOnly}
                                            value={this.state.shopGstNo}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'shopGstNo')
                                            }}
                                        />

                                    </div>

                                    <div style={{marginBottom: '10px', width: '100%'}}>

                                                <span style={{
                                                    paddingTop: '1px',
                                                    width: '100%',
                                                    color: '#3674d4',
                                                }} className='font_size_small normal'>Shop License Number</span>

                                        <input
                                            id='shopLicNo'
                                            placeholder="Enter Shop License Number"
                                            className="font_size_med thick"
                                            style={{width: '100%', border: 'none'}}
                                            type="text"
                                            name="shopLicNo"
                                            readOnly={this.state.readOnly}
                                            value={this.state.shopLicNo}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'shopLicNo')
                                            }}
                                        />

                                    </div>

                                    <div style={{marginBottom: '10px', width: '100%', display: 'none',}}>

                                                <span style={{
                                                    paddingTop: '1px',
                                                    width: '100%',
                                                    color: '#3674d4',
                                                }} className='font_size_small normal'>Business Type</span>

                                        <input
                                            id='businessType'
                                            placeholder="Enter Business Type"
                                            className="font_size_med thick"
                                            style={{width: '100%', border: 'none'}}
                                            type="text"
                                            name="businessType"
                                            readOnly={this.state.readOnly}
                                            value={this.state.businessType}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'businessType')
                                            }}
                                        />

                                    </div>

                                    <div style={{marginBottom: '10px', width: '100%', display: 'none',}}>

                                                <span style={{
                                                    paddingTop: '1px',
                                                    width: '100%',
                                                    color: '#3674d4',
                                                }} className='font_size_small normal'>Region</span>

                                        <input
                                            id='region'
                                            placeholder="Enter Region"
                                            className="font_size_med thick"
                                            style={{width: '100%', border: 'none'}}
                                            type="text"
                                            name="region"
                                            readOnly={this.state.readOnly}
                                            value={this.state.region}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'region')
                                            }}
                                        />

                                    </div>

                                    <div style={{marginBottom: '10px', width: '100%'}}>

                                                <span style={{
                                                    paddingTop: '1px',
                                                    width: '100%',
                                                    color: '#3674d4',
                                                }} className='font_size_small normal'>Pincode</span>

                                        <input
                                            id='pincode'
                                            placeholder="Enter Pincode"
                                            className="font_size_med thick"
                                            style={{width: '100%', border: 'none'}}
                                            type="text"
                                            name="pincode"
                                            readOnly={this.state.readOnly}
                                            value={this.state.pincode}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'pincode')
                                            }}
                                        />

                                    </div>

                                    <div style={{marginBottom: '10px', width: '100%'}}>

                                                <span style={{
                                                    paddingTop: '1px',
                                                    width: '100%',
                                                    color: '#3674d4',
                                                }} className='font_size_small normal'>Shop Packing Charges</span>

                                        <input
                                            id='packingCharge'
                                            placeholder="Enter Shop Packing Charges"
                                            className="font_size_med thick"
                                            style={{width: '100%', border: 'none'}}
                                            type="text"
                                            name="packingCharge"
                                            readOnly={this.state.readOnly}
                                            value={this.state.packingCharge}
                                            onChange={(e) => {
                                                this.updateInputValue(e.target.value, 'packingCharge')
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

export default Business;