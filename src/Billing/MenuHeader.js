import React from 'react';

class MenuHeader extends React.Component {
   render() {
  
      return (
        <div id="menuHeader" class="sub_header nopadding" style={{display:'flex',width:'100%'}}>
            <div align="left" style={{width:'80%'}}>
                <span style={{marginLeft:'15px',padding:'5px'}} class="blueFont normal font_size_med">Today's Menu</span>
            </div>
            <div align="right" style={{width:'20%',float: 'right',paddingRight:'15px',margin: 'auto',display:'none'}}>
                <img  id="addItemsMenu" class='small_icon_unpadded' src="images/search.png"/>
            </div>
        </div>
      );
   }
}

export default MenuHeader;