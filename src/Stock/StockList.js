import React from 'react';

class StockList extends React.Component {

    constructor(){
        super()
        this.state={
            selectedItems : [],
            page: 'NEW_ENTRY_PAGE'
        };

        this.stockItemSelected= this.stockItemSelected.bind(this);
        this.parseQuantityofProduct= this.parseQuantityofProduct.bind(this);

    }

    stockItemSelected(index,items,subindex){

        this.setState({
            selectedItems: this.props.stockItems[index].subCategory[subindex],
            page: 'NEW_ENTRY_PAGE'
        },() => {
            this.props.viewSelectedItemHandler(this.state.selectedItems);
            this.props.toggleHandler(this.state.page);
            //console.log("StockList_selectedItems "+this.state.selectedItems)
        })
    }

    parseQuantityofProduct(qnty,type){

        if(type === 'kilo')
            return `${Math.floor(qnty)}Kilo ${Math.round((qnty%1) * 1000)}grams`
        else if(type === 'grams')
            return `${Math.floor(qnty)}grams ${Math.round((qnty%1) * 1000)}milligrams`
        else if(type === 'liters')
            return `${Math.floor(qnty)}Liters ${Math.round((qnty%1) * 1000)}milliliters`
        else
            return `${qnty} ${type}`;

    }


    // componentDidMount(){
    //     this.stockItemSelected(0);      
    // }

    render() {
        const divStyle = {
            height : this.props.data.height+'px',
            background : '#ffffff'
        }
        let count = 1


        return (
                <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 nopadding">
                    <div class="card" >
                            <div style={{display:'flex',width:'100%',marginBottom:'10px',marginTop:'10px'}}>
                                <div class="nopadding" style={{width:'50%',display:'none'}}>
                                        <select id="expDate" class="font_size_small normal" style={{border:'none',color:'#3674d4'}}>
                                            <option value="1">06-04-2018</option>
                                            <option value="2">07-04-2018</option>
                                            <option value="3">08-04-2018</option>
                                            <option value="4">09-04-2018</option>
                                        </select>
                                </div>
                                <div align="right" class="nopadding" style={{width:'100%',display:'none'}}>
                                    <div style={{width:'20%'}}>
                                        <span id='updateExpense' class='reportBtn thick' >Generate Report</span>
                                    </div>
                                </div>
                            </div>
                            <div id="stockList" class="scroll" style={{height:this.props.data.height-85+'px'}}>
                                <table class="expenseTable" style={{width:'100%',border: '1px solid #b7cdde'}}>
                                        <tr>
                                            <td>
                                                <span class="font_size_normal normal italics">Sl No</span>
                                            </td>
                                            <td>
                                                <span class="font_size_normal normal italics">Item Id</span>
                                            </td>
                                            <td>
                                                <span class="font_size_normal normal italics">Item Name</span>
                                            </td>
                                            <td>
                                                <span class="font_size_normal normal italics">Quantity</span>
                                            </td>
                                            {/*<td>
                                                <span class="font_size_normal normal italics">Units</span>
                                            </td>*/}
                                        </tr>

                                        {this.props.stockItems.length>0 ?

                                            this.props.stockItems.map((item,index) => (

                                            item.subCategory.map((items,subindex) => (

                                                Object.keys(items.calculation_products_json).length==0 ?

                                                <tr onClick={() => this.stockItemSelected(index,items,subindex)}>
                                                    <td>
                                                        <span className="font_size_small">{count++}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font_size_small">{items.subItemID}</span>
                                                    </td>
                                                    <td>
                                                        <span className="font_size_small">{items.name}</span>
                                                    </td>
                                                    <td>
                                                        {/*<span*/}
                                                            {/*className="font_size_small italics">{items.stock_quantity}</span>*/}
                                                        <span className="font_size_small italics"> {this.parseQuantityofProduct(items.stock_quantity,items.cal_type)}</span>

                                                    </td>
                                                   {/* <td>
                                                        <span className="font_size_small">{items.cal_type}</span>
                                                    </td>*/}
                                                </tr>

                                                :

                                                <tr></tr>

                                            ))

                                        ))
                                            :
                                            <tr align="center">
                                                <td colspan="5">No Stock Items</td>
                                            </tr>
                                        }

                                    </table>

                            </div>
                    </div>
                </div>
        )
    }
}

export default StockList;