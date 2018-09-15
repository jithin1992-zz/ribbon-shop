import React from 'react';
import FloatingLabel from 'floating-label-react';
import { makeApiCall } from "../Actions/ApiCalls";

import empty from '../images/empty.png';

class StockUpdate extends React.Component {

    constructor() {
        super()
        this.state = {
            items: [],
            page: 'UPDATE_PAGE',
            selectedStockID: [],
            selectedStockName: [],
            selectedStockQuantity: [],
            selectedStockUnits: [],
            selectedStockUpdatedDate: [],
            selectedStockUpdatedPerson: []
        };

        this.updateInputValue = this.updateInputValue.bind(this);

        this.toggleClickHandler = this.toggleClickHandler.bind(this);

        this.updateStockData = this.updateStockData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        ////console.log("selected item _ StockUpdate"+JSON.stringify(nextProps.itemToEdit));
        var today = new Date(),
            date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var user = localStorage.getItem("user_name");

        this.setState({
            selectedStockID: nextProps.itemToEdit.subItemID,
            selectedStockName: nextProps.itemToEdit.name,
            selectedStockQuantity: nextProps.itemToEdit.stock_quantity,
            selectedStockUnits: nextProps.itemToEdit.cal_type,
            selectedStockUpdatedDate: date,//nextProps.itemToEdit.itemUpdatedDate,
            selectedStockUpdatedPerson: user,//nextProps.itemToEdit.itemUpdatedPerson
        }, () => {
            //console.log("selected item _ StockUpdate"+this.state.selectedStockData.itemName);
        })
    }

    updateInputValue(value, key) {

        // this.setState((previousState) => {
        //   const selectedStockData = previousState.selectedStockData
        //   return { selectedStockData: {selectedStockData, [key]: value} }
        // })

        if (key == 'itemQuantity') {
            this.setState({
                selectedStockQuantity: value,
            }, () => {
            })
        }
        else if (key == 'itemUnit') {
            this.setState({
                selectedStockUnits: value,
            }, () => {
            })
        }

    }

    toggleClickHandler() {

        this.setState({ page: 'UPDATE_PAGE' }, () => {
            this.props.toggleHandler(this.state.page);
        })

    }

    updateStockData() {
        var shop_id = localStorage.getItem("shop_id")

        /*console.log("selectedStockID: "+this.state.selectedStockID);
        console.log("selectedStockName: "+this.state.selectedStockName);
        console.log("selectedStockQuantity: "+this.state.selectedStockQuantity);
        console.log("selectedStockUnits: "+this.state.selectedStockUnits);
        console.log("selectedStockUpdatedDate: "+this.state.selectedStockUpdatedDate);
        console.log("selectedStockUpdatedPerson: "+this.state.selectedStockUpdatedPerson);*/

        var selectedID = this.state.selectedStockID;
        var selectedQty = this.state.selectedStockQuantity;
        var selectedUnits = this.state.selectedStockUnits;
        var user_id = localStorage.getItem("user_id")


        if (this.validateStockProducts(selectedID, selectedQty, selectedUnits)) {
            makeApiCall('stockUpdate', ({ "user_id": user_id, "shop_id": shop_id, "stockArray": [{ pro_id: this.state.selectedStockID, shop_id: shop_id, stock_quantity: this.state.selectedStockQuantity }] })).then((response) => response.json())
                .then((parsedJSON) => {

                    console.log("stock update :: parsedJSON :: " + JSON.stringify(parsedJSON));
                    if (parsedJSON.status) {

                        //console.log("Success "+status)
                        alert("Stock details updated successfully!!!");
                        var shopJson = {};
                        shopJson["status"] = "true";
                        shopJson["status_desc"] = "true";
                        shopJson["results"] = parsedJSON.results;

                        localStorage.setItem("todaysmenu", JSON.stringify(shopJson));


                        this.props.updateUi();

                    } else {
                        alert("Failed to update the Stock details, " + parsedJSON.status_msg);
                        this.setState({
                            errorMsg: parsedJSON.status_msg,
                            hasErrored: true
                        })

                    }
                })
                .catch((error) => {
                    alert("Failed to update the Stock details!!!");
                    //console.log("error"+error)
                    this.setState({ hasErrored: true })
                });
        }

    }

    validateStockProducts(selectedID, selectedQty, selectedUnits) {
        if (selectedID) {
            if (selectedQty) {
                if (selectedUnits) {
                    return true;
                } else {
                    alert("Please select the units");
                    return false;
                }

            } else {
                alert("Please enter stock quantity");
                return false;
            }

        } else {
            alert("Please select a stock to update");
            return false;
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
            height: '100%'
        }

        const divStyle = {
            height: this.props.data.height - 55 + 'px',
            background: '#ffffff'
        }

        //console.log("selected item _ render()"+this.state.selectedStockData.itemName);
        return (
            <div id="stockUpdateDiv" class="col-sm-4 col-md-4 col-lg-4 col-xl-4 nopadding">
                <div class="card" style={divStyle}>
                    <div id='expenseGenerateDiv' class="col-sm-12 col-md-12 col-lg-12 col-xl-12 nopadding" style={{ paddingBottom: '15px' }} >
                        <div class="card" style={{ height: '100%' }}>
                            <div style={{ display: 'flex', width: '100%', marginBottom: '10px' }}>
                                <div class="nopadding" style={{ width: '70%' }}>
                                </div>
                                <div align="right" class="nopadding" style={{ width: '50%', display: 'none' }} onClick={() => this.toggleClickHandler()}>
                                    <div style={{ width: '100%' }}>
                                        <span id='newEntry' class='reportBtn thick' >New Stock Entry</span>
                                    </div>
                                </div>
                            </div>

                            {this.state.selectedStockID ?

                                <div>
                                    <div class="row" >
                                        <div style={{ marginBottom: '10px', width: '100%' }}>
                                            <FloatingLabel
                                                key={Math.random()}
                                                id='itemName'
                                                readOnly={true}
                                                name='item_Name'
                                                placeholder='Item Name'
                                                type='text'
                                                styles={inputStyle}
                                                value={this.state.selectedStockName}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', width: '100%', marginBottom: '10px' }}>
                                            <div style={{ width: '50%', marginRight: '10px' }}>
                                                {/*<FloatingLabel
                                                    key={Math.random()}
                                                    id='itemQuantity'
                                                    name='itemQuantity'
                                                    placeholder='Quantity'
                                                    type='text'
                                                    styles={inputStyle}
                                                    value={this.state.selectedStockQuantity}
                                                    onChange = {(e) => {this.updateInputValue(e.target.value, 'itemQuantity')}}
                                                />*/}
                                                <span className="blackFont font_size_xsmall">Quantity</span>

                                                <input
                                                    id='itemQuantity'
                                                    name='itemQuantity'
                                                    placeholder='Quantity'
                                                    type='text'
                                                    style={{ width: "100%", border: "none", color: "#3674d4", borderBottom: "1px solid #ebf5fc" }}
                                                    value={this.state.selectedStockQuantity}
                                                    onChange={(e) => { this.updateInputValue(e.target.value, 'itemQuantity') }}
                                                />

                                            </div>

                                            <div style={{ width: '50%', marginLeft: '10px' }}>
                                                <FloatingLabel
                                                    key={Math.random()}
                                                    id='itemUnit'
                                                    readOnly={true}
                                                    name='itemUnit'
                                                    placeholder='Units'
                                                    type='text'
                                                    styles={inputStyle}
                                                    value={this.state.selectedStockUnits}
                                                    onChange={(e) => { this.updateInputValue(e.target.value, 'itemUnit') }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '10px', width: '100%' }}>
                                            <FloatingLabel
                                                key={Math.random()}
                                                id='itemId'
                                                name='itemId'
                                                readOnly={true}
                                                placeholder='Item #Id'
                                                type='text'
                                                styles={inputStyle}
                                                value={this.state.selectedStockID}
                                            />
                                        </div>
                                        <div style={{ marginBottom: '10px', width: '100%' }}>
                                            <FloatingLabel
                                                key={Math.random()}
                                                id='itemAddedDate'
                                                name='itemAddedDate'
                                                placeholder='Date'
                                                type='text'
                                                readOnly={true}
                                                styles={inputStyle}
                                                value={this.state.selectedStockUpdatedDate}
                                            />
                                        </div>
                                        <div style={{ marginBottom: '10px', width: '100%' }}>
                                            <FloatingLabel
                                                key={Math.random()}
                                                id='itemUpdatedPerson'
                                                name='itemUpdatedPerson'
                                                placeholder='Updated Person'
                                                type='text'
                                                readOnly={true}
                                                styles={inputStyle}
                                                value={this.state.selectedStockUpdatedPerson}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '20px' }}>
                                        <span onClick={() => this.updateStockData()} id='updateExpense' class='expenseBtn thick font_size_normal whiteFont' >Update Stock</span>
                                    </div></div>

                                :

                                <div>

                                    <div align="center" style={{ marginRight: 'auto', marginLeft: 'auto', webkitTransform: 'translate(0%,40%)', transform: 'translate(0%,40%)' }}>

                                        <img style={{ height: '300px', width: '300px' }} src={empty} className='xlarge_icon' />

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

export default StockUpdate;