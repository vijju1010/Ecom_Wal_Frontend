import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React from 'react';
import { GAPIKEY } from '../secret';
export class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) => {
        console.log(props.mapCenter);
        this.setState({
            selectedPlace: props.mapCenter,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    };

    render() {
        return (
            <Map google={this.props.google} onClick={this.onMapClicked}>
                <Marker
                    onClick={this.onMarkerClick}
                    name={
                        'The marker`s center is at ' +
                        this.state.selectedPlace +
                        ',' +
                        this.state.selectedPlace
                    }
                />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: GAPIKEY,
})(MapContainer);
