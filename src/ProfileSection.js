import React from 'react';
import Personal from "./Profile/Personal";
import Business from "./Profile/Business";

class ProfileSection extends React.Component {

    constructor(){
        super()
        this.state={
            items : [],
        };

    }


    render() {

        return (

            <div className="row h-100 justify-content-center align-items-center" >
                <Personal data={this.props.dimensions}/>
                <Business data={this.props.dimensions}/>
            </div>
        )
    }
}

export default ProfileSection;