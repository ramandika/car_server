import React from "react"
import { GoogleMap, Marker } from "react-google-maps"
import SaveAreaDialog from './save_area_dialog'
import AreaList from './area_list'
import Map from './map'
import { geolocated } from "react-geolocated";

class Area extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    showSaveAreaDialog(boundaries){
        this.setState({show: true, boundaries: boundaries})
    }

    closeSaveAreaDialog(){
        this.setState({show: false})
    }

    showPolygon(polygon){
        this.setState({polygon: polygon})
    }

    render() {
        const userpos = this.props.coords;
        return(
            <div className="row" style={{height: 100}}>
                <SaveAreaDialog closeSaveAreaDialog={this.closeSaveAreaDialog.bind(this)} show={this.state.show} boundaries={this.state.boundaries}/>
                <div className="col-sm-4">
                    <AreaList showPolygon={this.showPolygon.bind(this)} />
                </div>
                <div className=" col-sm-8">
                    <Map polygon={this.state.polygon} showSaveAreaDialog={this.showSaveAreaDialog.bind(this)} user_location={!!userpos ? {lat: userpos.latitude,lng: userpos.longitude} : {lat: -6.1815734,lng: 106.8262006}} />
                </div>
            </div>
        )
    }
}
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Area);