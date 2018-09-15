// import React from 'react';
// import FloatingLabel from 'floating-label-react'
//
// class AddNewProduct extends React.Component {
//
//     constructor(){
//         super()
//         this.state={
//             items : [],
//             visibility : false,
//             isLoading : true
//         };
//         this.closePopup= this.closePopup.bind(this);
//     }
//
//     closePopup(){
//
//         this.setState({
//             //selectedItem: this.props.expenseItems[index],
//             visibility: false
//         },() => {
//             // this.props.viewSelectedItemHandler(this.state.selectedItems);
//             this.props.handler(this.state.visibility);
//             //console.log("selected item _ StockList"+this.state.selectedItems)
//         })
//     }
//
//
//     componentWillReceiveProps(nextProps){
//         this.state.visibility = nextProps.visibility;
//     }
//
//     render() {
//
//         const inputStyle = {
//             floating: {
//                 color: '#3674d4'
//             },
//             focus: {
//                 borderColor: '#3674d4',
//             },
//             input: {
//                 borderBottomWidth: 1,
//                 borderBottomColor: '#ebf5fc',
//                 width: '100%',
//             },
//             label: {
//                 marginTop: '.5em',
//                 width: '100%'
//             },
//             height:'100%'
//         }
//
//         var visibility = "dialog-container-invisible";
//
//         if (this.state.visibility) {
//             visibility = "dialog-container-visible";
//         }else{
//             visibility = "dialog-container-invisible";
//         }
//
//
//         //console.log("height BillingSection"+this.props.data.height)
//         return (
//             <div className={visibility}>
//
//                 <div className="dialog">
//                     <div className="dialog-title font_size_med thin blueFont">
//                         <span>New Product</span>
//                         <div align='right'
//                              style={{flex: '1', float: 'right', clear: 'right', position: 'relative'}}>
//                             <img src='images/blueCloseBtn.png' className='xsmall_icon_unpadded'
//                                  onClick={() => this.closePopup()}/>
//                         </div>
//                     </div>
//
//                     <div className="" style={{marginTop: '10px'}}>
//
//
//                         <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
//
//                             <div style={{marginBottom:'10px',width:'100%'}}>
//                                 <FloatingLabel
//                                     id='newProductName'
//                                     name='newProductName'
//                                     placeholder='Enter product name'
//                                     type='text'
//                                     styles={inputStyle}
//                                     // onChange={(event) => this.setState({newProductName: event.target.value})}
//                                     // value = {this.state.newProductName}
//                                 />
//                             </div>
//
//                         </div>
//
//
//
//                         <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
//
//                             <div style={{marginBottom:'10px',width:'100%'}}>
//                                 <FloatingLabel
//                                     id='newProductGstId'
//                                     name='newProductGstId'
//                                     placeholder='Enter GST identification number'
//                                     type='text'
//                                     styles={inputStyle}
//                                     // onChange={(event) => this.setState({newProductGstId: event.target.value})}
//                                     // value = {this.state.newProductGstId}
//                                 />
//                             </div>
//
//                         </div>
//
//                         <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
//
//                             <div style={{marginBottom:'10px',width:'100%'}}>
//                                 <FloatingLabel
//                                     id='newProductDes'
//                                     name='newProductDes'
//                                     placeholder='Enter Product Description'
//                                     type='text'
//                                     styles={inputStyle}
//                                     // onChange={(event) => this.setState({newProductDes: event.target.value})}
//                                     // value = {this.state.newProductDes}
//                                 />
//                             </div>
//
//                         </div>
//
//                         <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
//                             <label id="brn1" className="container_chk">Our special product
//                                 <input
//                                     type="checkbox"
//                                     id="chk1"
//                                     // onClick={this.uniqueProductSet}
//                                 />
//                                 <span className="checkmark"></span>
//                             </label>
//                         </div>
//
//
//
//
//                         <div className="row">
//                             <div id="btnAddType"
//                                  style={{cursor:'pointer'}}
//                                  className="aqua_blue_button font_size_small"
//                                  // onClick={() => this.createNewProduct()}
//                             >Add Product</div>
//                         </div>
//
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
// export default AddNewProduct;