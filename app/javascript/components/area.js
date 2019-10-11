import React from "react"
import { GoogleMap, Marker } from "react-google-maps"
import SaveAreaDialog from './save_area_dialog'
import AreaList from './area_list'
import Map from './map'
import { geolocated } from "react-geolocated";
import axios from "axios";

class Area extends React.Component{
    constructor(props){
        super(props);
        this.state={areas: []}
        this.fetchAreas = this.fetchAreas.bind(this)
        this.GET_AREAS_URL="http://car-io.montrax.id/api/v1/areas"
        this.GET_BOUNDARIES="http://car-io.montrax.id/api/v1/areas/"
    }

    componentDidMount() {
        this.fetchAreas();
    }

    fetchAreas = () => {
        console.log("Fetch Areas")
        axios.get(this.GET_AREAS_URL,{
            'content-type': 'application/json'
        }).then((response) => {
            this.setState({areas: response.data.areas})
        }).catch((error) => {
            console.log(error);
        })
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

    onSearch(keyword){
        if(this.state.areaClicked >= 0){
            this.setState({areaClicked: undefined, polygon: undefined})
        }
        axios.get(`${this.GET_AREAS_URL}?query_name=${keyword}`,{
            'content-type': 'application/json'
        }).then((response) => {
            this.setState({areas: response.data.areas})
        }).catch((error) => {
            console.log(error);
        })
    }

    onClickArea = (id,index) => {
        console.log(`${id}-${index}`)
        this.setState({areaClicked: index})
        //Get bondaries
        axios.get(`${this.GET_BOUNDARIES}/${id}`).then((response) => {
            this.showPolygon(response.data.boundaries)
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        const userpos = this.props.coords;
        return(
            <div className="row" style={{height: 100}}>
                <SaveAreaDialog fetchAreas={this.fetchAreas} closeSaveAreaDialog={this.closeSaveAreaDialog.bind(this)} show={this.state.show} boundaries={this.state.boundaries}/>
                <div className="col-sm-4">
                    <AreaList areas={this.state.areas} areaClicked={this.state.areaClicked} onSearch={this.onSearch.bind(this)} onClickArea={this.onClickArea.bind(this)} showPolygon={this.showPolygon.bind(this)} />
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