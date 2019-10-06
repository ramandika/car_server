import React from "react"
import PropTypes from "prop-types"
import OtpInput from 'react-otp-input';
import axios from 'axios';

class AreasList extends React.Component{
    constructor(props){
        super(props)
        this.GET_BOUNDARIES="http://localhost:8080/api/v1/areas/"
        this.state={}
    }

    onClickArea = (id,index) => {
        this.setState({areaClicked: index})
        //Get bondaries
        axios.get(`${this.GET_BOUNDARIES}/${id}`).then((response) => {
            this.props.showPolygon(response.data.boundaries)
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        const {areas} = this.props
        return(
            <React.Fragment>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    <h5>Area Parkir Terdaftar</h5>
                </div>
                    <div className="md-form mt-0" style={{margin: 10}}>
                        <input onChange={(event) => this.props.onSearch(event.target.value)} className="form-control" type="text" placeholder="Search" aria-label="Search" />
                    </div>
                <ul className="list-group" style={{margin: 10}}>
                    {!!areas && areas.map((area,index) =>(
                        <li className={`list-group-item ${index === this.state.areaClicked ? 'active' : ''}`} onClick={this.onClickArea.bind(this,area.id,index)} key={area.id}>
                            {area.name}
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        )
    }
}

export default AreasList;