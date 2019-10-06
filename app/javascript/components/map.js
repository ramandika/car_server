import React from "react";
import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polygon } from "react-google-maps"
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={20}
        defaultCenter={props.user_location}
    >
        <DrawingManager onOverlayComplete={props.onOverlayComplete}/>
        {console.log(props.polygon)}
        {!!props.polygon && <Polygon
            paths={props.polygon}
            strokeColor='#FF0000'
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor='#FF0000'
            fillOpacity={0.35}
        />}
    </GoogleMap>
))

export default class Map extends React.Component{
    constructor(props) {
        super(props);
    }

    onOverlayComplete = (event) => {
        if(event.type === google.maps.drawing.OverlayType.POLYGON){
            let bounds = event.overlay.getPath().getArray();
            bounds = bounds.map(function(latlng){
                var point = {
                    lat: latlng.lat(),
                    lng: latlng.lng()
                };
                return point
            })
            this.props.showSaveAreaDialog(bounds);
        }else{
            alert("Not supported yet");
        }
        event.overlay.setMap(null);
    }

    render() {
        const user_location = this.props.user_location
        return(<MyMapComponent
            polygon={this.props.polygon}
            user_location = {user_location}
            onOverlayComplete = {this.onOverlayComplete.bind(this)}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100vh` }} />}
            containerElement={<div style={{width: `100%`}} />}
            mapElement={<div style={{ height: `100vh` }} />}
        />)
    }
}