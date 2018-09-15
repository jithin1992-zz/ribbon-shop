import React from 'react';
import close from "../images/close-button.svg";

class Ingredients extends React.Component{
    constructor(){
        super();
        this.state={}

    };

    render() {

        return (

            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-6" id="ingrdnt_div" style={{paddingBottom:'5px'}} >
                <div class="" style={{marginTop:'10px'}}>

                    <div class="row">
                        <div class="col-md-6">Ingredients</div>
                        <div class="col-md-6 nopadding">
                            <div id="btnAddType" class="white_button2 font_size_small">Add Ingredients</div>
                        </div>
                    </div>

                    <div class="category_sctn">

                        <div class="box">
                            <label class="add_ctgry">Cashew Nuts</label>
                            <span> -</span>
                            <span>10g</span>
                            <span class="close_icon"><img src={close}/></span>
                        </div>

                        <div class="box">
                            <label class="add_ctgry">Cashew Nuts</label>
                            <span> -</span>
                            <span>10g</span>
                            <span class="close_icon"><img src={close}/></span>
                        </div>

                        <div class="box">
                            <label class="add_ctgry">Cashew Nuts</label>
                            <span> -</span>
                            <span>10g</span>
                            <span class="close_icon"><img src={close}/></span>
                        </div>

                        <div class="box">
                            <label class="add_ctgry">Cashew Nuts</label>
                            <span> -</span>
                            <span>10g</span>
                            <span class="close_icon"><img src={close}/></span>
                        </div>

                        <div class="box">
                            <label class="add_ctgry">Cashew Nuts</label>
                            <span> -</span>
                            <span>10g</span>
                            <span class="close_icon"><img src={close}/></span>
                        </div>

                        <div class="box">
                            <label class="add_ctgry">Cashew Nuts</label>
                            <span> -</span>
                            <span>10g</span>
                            <span class="close_icon"><img src={close}/></span>
                        </div>

                        <div class="box">
                            <label class="add_ctgry">Cashew Nuts</label>
                            <span> -</span>
                            <span>10g</span>
                            <span class="close_icon"><img src={close}/></span>
                        </div>

                    </div>
                </div>
            </div>

        );
    }


}

export default Ingredients;