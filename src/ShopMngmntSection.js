import React from 'react';
import MenuItems from './ShopMngmnt/MenuItems';
import ManagementSection from './ShopMngmnt/ManagementSection';
import AddNewProduct from "./ShopMngmnt/AddNewProduct";


class ShopMngmntSection extends React.Component {

    constructor() {
        super();
        this.state={
            active : 'NEW_ENTRY_PAGE',
            visibility_NewProduct: false,
        };

        this.togglePage= this.togglePage.bind(this);
       // this.togglePopup= this.togglePopup.bind(this);
        this.itemHandler= this.itemHandler.bind(this);
        this.updateShopUi= this.updateShopUi.bind(this);
        this.menuItems = React.createRef();


    };

    togglePage(page) {
        //var active = this.state.active;
        var active = page;
        var newActive = active === 'UPDATE_PAGE' ? 'NEW_ENTRY_PAGE' : 'UPDATE_PAGE';
        this.setState({active: newActive},() => {
        })
    }

    componentDidMount(){

        this.state.selectedMenuItem === undefined ?
            (
                this.setState({
                    active : 'NEW_ENTRY_PAGE'
                },() => {
                    //console.log("selected item _ stockSection"+this.state.selectedStock)
                })
            ):(
                this.setState({
                    active : 'UPDATE_PAGE'
                },() => {
                    //console.log("selected item _ stockSection"+this.state.selectedStock)
                })
            )

    }

    // togglePopup(visibility) {
    //
    //     this.setState({
    //         visibilityPopup: visibility,
    //     },()=>{
    //     });
    // }

    updateShopUi(){


        //console.log("updateShopUi ShopMngmntSection")
        this.menuItems.current.updateShopUi();

    }

    itemHandler(selectedItem,category,wholeMenuItems) {
        //console.log("itemHandler _ selectedItem"+JSON.stringify(selectedItem))
        //console.log("itemHandler _ category"+category)
        this.setState({
            selectedMenuItem: selectedItem,
            selectedItemCategory : category,
            wholeMenuItems:wholeMenuItems,
        },() => {
            //console.log("selected item _ stockSection"+this.state.selectedStock)
        })
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
            height : this.props.dimensions.height-80+'px',
            padding:'5px'
        }


        return (

            <div>

                <div className="row nopadding" style={{margin: '5px'}}>

                    <MenuItems
                        data={this.props.dimensions}
                        ref={this.menuItems}
                        handler={this.togglePage}
                        selectedItemHandler={this.itemHandler}
                    />

                    <ManagementSection
                        updateShopUi={this.updateShopUi}
                        page={this.state.active}
                        data={this.props.dimensions}
                        handler={this.togglePage}
                        item={this.state.selectedMenuItem}
                        category={this.state.selectedItemCategory}
                        wholeMenuItems={this.state.wholeMenuItems}
                        //toggle={this.togglePopup}
                    />

                </div>

                {/*<AddNewProduct visibility={this.state.visibilityPopup} handler={this.togglePopup}/>*/}

            </div>
        );
    }

}

export default ShopMngmntSection;