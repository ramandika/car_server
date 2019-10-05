import React from "react"
import PropTypes from "prop-types"
import OtpInput from 'react-otp-input';
import axios from 'axios';

class AreasList extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    componentDidMount() {
    }

    render() {
        return(
            <React.Fragment>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    <h5>Area Parkir Terdaftar</h5>
                </div>
                    <div className="md-form mt-0" style={{margin: 10}}>
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                    </div>
                <div className="list-group" style={{margin: 10}}>
                    <a href="#" className="list-group-item list-group-item-action active">
                        Cras justo odio
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
                    <a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
                    <a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
                    <a href="#" className="list-group-item list-group-item-action disabled">Vestibulum at eros</a>
                </div>
            </React.Fragment>
        )
    }
}

export default AreasList;