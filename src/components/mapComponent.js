import React from "react"
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {googleKey} from '../assets/config/apiKeys';

const MapComponent = compose(
    withProps({
      googleMapURL: googleKey,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `100%` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>(
    <GoogleMap
      defaultZoom={9}
      defaultCenter={{ lat: props.lat, lng: props.long }}
    >
      {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.long }} onClick={props.onMarkerClick} />}
    </GoogleMap>
  ));

export default MapComponent;