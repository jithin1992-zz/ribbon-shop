import React from 'react';

class BillHeader extends React.Component {
   render() {
  
      return (
        <div id="billHeader" className="sub_header nopadding" style={{display:'flex',width:'100%'}}>
            <span className="blueFont normal font_size_med" style={{width:'50%',paddingLeft:'15px'}}>Order Bill</span>
            <span align="right" className="blueFont normal font_size_med" style={{textAlign: 'right',width:'50%',paddingRight:'15px'}}></span>
        </div>
      );
   }
}

export default BillHeader;