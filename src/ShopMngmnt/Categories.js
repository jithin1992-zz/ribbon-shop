import React from 'react'

class Categories extends React.Component{

    constructor(){
        super()
        this.state={
            items : [],
            isLoading:true
        };
        //this.viewSelectedItem= this.viewSelectedItem.bind(this);
    }

    fetchShowShopMenuCategories(url,shopid){

        //console.log("categories.js calling shop category of :: "+shopid);
        fetch(url,{method:'POST',headers:{
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json',
                'Accept':'application/json',

            },body:JSON.stringify({"shop_id":shopid}
            )})

            .then((response)=>{
                if(!response.ok){
                    throw Error(response.statusText);
                }
                this.setState({isLoading:false});
                return response;
            })
            .then((response)=> response.json())
            .then((parsedJSON) => {

                if(parsedJSON.status){

                    this.showShopMenuCategories(parsedJSON);
                    localStorage.setItem("fetchShopMenuCategories", JSON.stringify(parsedJSON));

                }else{

                    this.setState({
                        errorMsg:parsedJSON.status_msg,
                        hasErrored:true
                    })

                }
            })
            .catch((error)=> {
                //console.log("error"+error)
                if(localStorage.getItem("fetchShopMenuCategories")){

                    //console.log("cache found loading from storage in categories.js");
                    var shopMenuCategories = localStorage.getItem("fetchShopMenuCategories");
                    this.showShopMenuCategories(JSON.parse(shopMenuCategories));

                }else{

                    this.setState({hasErrored:true})
                }


            });



    };

    componentDidMount(){
        //this.fetchData('./data.json');
        //this.fetchData('http://50.112.43.161:8080/ribbon_api/api/listProducts');
        /*if(localStorage.getItem("shopMenuCategories")){

            //console.log("cache found loading from storage in categories.js");
            var shopMenuCategories = localStorage.getItem("shopMenuCategories");
            this.showShopMenuCategories(JSON.parse(shopMenuCategories));

        }else{

            //console.log("cache not found calling through network in categories.js");

            //localStorage.setItem("shop_id", "SHOP00000120");

            var shop_id = localStorage.getItem("shop_id")

            this.fetchShowShopMenuCategories('http://50.112.43.161:8080/ribbon_api/api/fetchShopMenuCategories',shop_id);

        }*/

        var shop_id = localStorage.getItem("shop_id")

        this.fetchShowShopMenuCategories('http://50.112.43.161:8080/ribbon_api/api/fetchShopMenuCategories',shop_id);


    }



    showShopMenuCategories(parsedJSON){

        //alert(prodctsJson);

        //console.log("parsedJSON ::: "+JSON.stringify(parsedJSON));
        var items  =  parsedJSON.results.map(


            main_menu => (



                {
                    itemID : `${main_menu.itemID}`,
                    itemName : `${main_menu.itemName}`,
                    itemColor : `${main_menu.itemColor}`,

                }
            )






        )

        //alert(items);
        this.setState({
            items,
            isLoading:false
        },()=>{
            //this.subMenu(0);
        })


    }


    render() {

        return (
        
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6" id="category_div" style={{paddingBottom:'5px'}} >

                        <div class="" style={{marginTop:'10px'}}> 
                            
                            <div class="row">
                                <div class="col-md-7">Categories</div>
                                <div class="col-md-5 nopadding">
                                    <div id="btnAddType" class="white_button2 font_size_small" style={{display:'none'}}>

                                    </div>
                                </div>
                            </div>
                            
                            <div class="category_sctn">



                                {this.state.items.map((menu,index) => (




                                    <div className="box">
                                    <label id="brn1" className="container_chk">{menu.itemName}
                                    <input
                                    type="checkbox"
                                    id="chk1"
                                    />
                                    <span className="checkmark"></span>
                                    </label>
                                    {/* <span class="close_icon"><img src="images/close-button.svg"/></span> */}
                                    </div>



                                )) }






                               
                            </div>

                        </div>
                        </div>
        
        );
     }


}

export default Categories;