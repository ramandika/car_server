import React from "react"
import PropTypes from "prop-types"
import OtpInput from 'react-otp-input';
import axios from 'axios';

class AreasList extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    render() {
        const {areas, areaClicked} = this.props
        return(
            <div style={{margin: 50}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    <h5>Area Parkir Terdaftar</h5>
                </div>
                <div className="md-form mt-0">
                    <input onChange={(event) => this.props.onSearch(event.target.value)} className="form-control" type="text" placeholder="Search" aria-label="Search" />
                </div>
                <ul className="list-group">
                    {!!areas && areas.map((area,index) =>(
                        <li className={`list-group-item ${index === areaClicked ? 'active' : ''}`} onClick={() => this.props.onClickArea(area.id,index)} key={area.id}>
                            {area.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default AreasList;