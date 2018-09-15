import React from 'react';
import FloatingLabel from 'floating-label-react'


class StockNewEntry extends React.Component {

    constructor(){
        super()
        this.state={
            items : [],
            page : 'NEW_ENTRY_PAGE',
            selectedStockID : [],
            selectedStockName : [],
            selectedStockQuantity : [],
            selectedStockUnits : [],
            selectedStockUpdateDate : [],
            selectedStockUpdatedPerson : []
        };

        this.updateInputValue= this.updateInputValue.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        ////console.log("selected item _ StockUpdate"+JSON.stringify(nextProps.itemToEdit));       
         
    }

    updateInputValue(value, key) {

            // this.setState((previousState) => {
            //   const selectedStockData = previousState.selectedStockData
            //   return { selectedStockData: {selectedStockData, [key]: value} }
            // })

            if(key == 'itemName'){
                this.setState({selectedStockName: value,
                    },() => {
                }) 
            }
            else if(key == 'itemId'){
                this.setState({
                    selectedStockID: value,
                    },() => {
                })
            }
            else if(key == 'itemQuantity'){
                this.setState({
                    selectedStockQuantity: value,
                    },() => {
                }) 
            }
            else if(key == 'itemUnit'){
                this.setState({
                    selectedStockUnits: value,
                    },() => {
                })
            }
            else if(key == 'itemAddedDate'){
                this.setState({
                    selectedStockUpdatedDate: value,
                    },() => {
                }) 
            }
            else if(key == 'itemUpdatedPerson'){
                this.setState({
                    selectedStockUpdatedPerson: value,
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
            height : this.props.data.height-55+'px',
            background : '#ffffff'
        } 
        
        return (
            <div id="stockUpdateDiv" class="col-sm-4 col-md-4 col-lg-4 col-xl-4 nopadding">
                <div class="card" style={divStyle}>
                    <div id='expenseGenerateDiv' class="col-sm-12 col-md-12 col-lg-12 col-xl-12 nopadding" style={{paddingBottom:'15px'}} >                       
                    <div class="card" style={{height:'100%'}}>                            
                        <div class="row" >                       
                                <div style={{marginBottom:'10px',width:'100%'}}>                               
                                    <FloatingLabel
                                        id='itemName'
                                        name='item_Name'
                                        placeholder='Item Name'
                                        type='text'
                                        styles={inputStyle}
                                        onChange = {(e) => {this.updateInputValue(e.target.value, 'itemName')}}
                                    />   
                                </div>                         
                                <div style={{display:'flex',width:'100%',marginBottom:'10px'}}>                                  
                                    <div style={{width:'50%',marginRight:'10px'}}>
                                        <FloatingLabel
                                            id='itemQuantity'
                                            name='itemQuantity'
                                            placeholder='Quantity'
                                            type='text'
                                            styles={inputStyle}
                                            onChange = {(e) => {this.updateInputValue(e.target.value, 'itemQuantity')}}
                                        />
                                    </div>
                                    
                                    <div style={{width:'50%',marginLeft:'10px'}}>
                                        <FloatingLabel
                                            id='itemUnit'
                                            name='itemUnit'
                                            placeholder='Units'
                                            type='text'
                                            styles={inputStyle}
                                            onChange = {(e) => {this.updateInputValue(e.target.value, 'itemUnit')}}
                                        />
                                    </div>
                                </div>
                                <div style={{marginBottom:'10px',width:'100%'}}>
                                    <FloatingLabel
                                        id='itemId'
                                        name='itemId'
                                        placeholder='Item #Id'
                                        type='text'
                                        styles={inputStyle}
                                        onChange = {(e) => {this.updateInputValue(e.target.value, 'itemId')}}
                                    />  
                                </div> 
                                <div style={{marginBottom:'10px',width:'100%'}}>                            
                                    <FloatingLabel
                                        id='itemAddedDate'
                                        name='itemAddedDate'
                                        placeholder='Date'
                                        type='text'
                                        styles={inputStyle}
                                        onChange = {(e) => {this.updateInputValue(e.target.value, 'itemAddedDate')}}
                                    />     
                                </div>  
                                <div style={{marginBottom:'10px',width:'100%'}}>                        
                                    <FloatingLabel
                                        id='itemUpdatedPerson'
                                        name='itemUpdatedPerson'
                                        placeholder='Updated Person'
                                        type='text'
                                        styles={inputStyle}
                                        onChange = {(e) => {this.updateInputValue(e.target.value, 'itemUpdatedPerson')}}
                                    />
                                </div>
                        </div>
                        <div style={{marginTop:'20px'}}>
                            <span id='updateExpense' class='expenseBtn thick font_size_normal whiteFont' >Submit Stock Entry</span>
                        </div>                       
                    </div>                     
                </div>
                </div>
            </div>
        )
    }
}

export default StockNewEntry;