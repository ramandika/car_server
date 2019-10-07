import React from "react";
import { GoogleMap, Marker, withGoogleMap, withScriptjs, Polygon } from "react-google-maps"
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={20}
        defaultCenter={props.user_location}
        options={{
            mapTypeControl: true,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.SATELLITE],
                position: google.maps.ControlPosition.BOTTOM_LEFT,
                style: google.maps.MapTypeControlStyle.HORIZONTAL,
            }
        }}
        ref={props.onMapMounted}
    >
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Cari Wilayah"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    marginTop: `5px`,
                    marginLeft: `27px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </SearchBox>
        <DrawingManager
            onOverlayComplete={props.onOverlayComplete}
            options={{
                drawingControlOptions:{
                    position: google.maps.ControlPosition.TOP_CENTER
                }
            }}
        />
        {!!props.polygon && <Polygon
            paths={props.polygon}
            options={{
                fillColor: "#000",
                fillOpacity: 0.4,
                strokeColor: "#000",
                strokeOpacity: 1,
                strokeWeight: 1
            }}
        />}
    </GoogleMap>
))

export default class Map extends React.Component{
    constructor(props) {
        super(props);
    }

    onSearchBoxMounted = (ref) => {
        this.searchBox = ref;
    }

    onPlacesChanged = () => {
        const places = this.searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport)
                this._map.fitBounds(bounds)
            } else {
                console.log("Not view port")
                bounds.extend(place.geometry.location)
            }
        })
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

    handleMapMounted = (map) => {
        this._map = map;
    }

    componentDidUpdate() {
        if(this.props && this.props.polygon){
            this._map.panTo(this.props.polygon[0]);
        }
    }

    render() {
        const user_location = this.props.user_location
        return(<MyMapComponent
            onSearchBoxMounted={this.onSearchBoxMounted}
            onPlacesChanged={this.onPlacesChanged}
            onMapMounted={this.handleMapMounted}
            polygon={this.props.polygon}
            user_location = {user_location}
            onOverlayComplete = {this.onOverlayComplete.bind(this)}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBq5_3DdJ1T12nlbpuvSQ398MXbNonNb3g&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100vh` }} />}
            containerElement={<div style={{width: `100%`}} />}
            mapElement={<div style={{ height: `100vh` }} />}
        />)
    }
}