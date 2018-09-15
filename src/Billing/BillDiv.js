import React from 'react';
import BillGenerateDiv from './BillGenerateDiv';

class BillDiv extends React.Component {

    constructor(){
        super()
        this.state={
            toBeBilledItems : []
        };
       this.billItemsGenerate= this.billItemsGenerate.bind(this);

       this.handlerBillGenerate= this.handlerBillGenerate.bind(this);
    }

    billItemsGenerate(item) {
        this.setState({toBeBilledItems: item},() => {
            //console.log("bill items"+JSON.stringify(this.state.toBeBilledItems))
        });
      };


    handlerBillGenerate(values) {

        this.props.handler(values)

    };


      
   render() {
        const divStyle = {
            height : this.props.dimen.height-340+'px',
            paddingLeft : 10+'px',
            paddingRight : 10+'px',
            background : '#ffffff'
        } 
      return (
           <div>
                <div id="billDiv" class="scroll" style={divStyle}>                       
                        <div>
                            <table >                                
                                <tr>
                                    <td style={{width:'70%',padding: '10px'}}>
                                        <span class="italics blueFont thin font_size_small">Item Name</span>
                                    </td>
                                    <td style={{width:'10%',padding: '10px'}}>
                                        <span class="italics blueFont thin font_size_small">Quantity</span>
                                    </td>
                                    <td style={{width:'20%',padding: '10px'}}>
                                        <span class="italics blueFont thin font_size_small">Amount</span>
                                    </td>
                                </tr>
                            </table>  
                            <BillItems addedItem={this.props.data} billItemHandler={this.billItemsGenerate} />                         
                        </div>
                </div>
                <BillGenerateDiv billItem={this.props.data} handler={this.handlerBillGenerate}/>
            </div>
      );
   }
}

class BillItems extends React.Component{

    constructor() {
        super();
        this.state={
            billableItems : []
        };
        this.selectItemAdded= this.selectItemAdded.bind(this);
     };

     selectItemAdded(i){

        if(this.props.addedItem[i].quantity>1){
            this.props.addedItem[i].quantity = parseFloat(this.props.addedItem[i].quantity)-1
        }else{
            delete this.props.addedItem[i];
            this.props.addedItem.splice(i,1); 
        }

        this.setState({billableItems: this.props.addedItem},() => {
           this.props.billItemHandler(this.state.billableItems);
        }) 
        
    }

    render(){

        return(
            <table id="itemBill" class="billTable" > 
                {this.props.addedItem.map((item,i) => (
                    <tr key={i} style={{borderRadius: '10px'}} onClick={()=>this.selectItemAdded(i)}>
                        <td>
                            <span class=' blackFont thin font_size_normal'>{item.name}</span>
                        </td>
                        <td>
                            <span class='blackFont thick font_size_normal'>{item.quantity}</span>
                        </td>
                        <td>
                            <span class='blackFont thick font_size_normal'>{item.price}</span>
                        </td>
                    </tr>      
                )) }  

            </table>
        );

    };

}

export default BillDiv;