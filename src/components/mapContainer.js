import React, {Component} from "react";
import MapComponent from './mapComponent';

class MapContainer extends Component {

    constructor(props){
      super(props);

      this.state = {
        isMarkerShown: false,
      }

      this.delayedShowMarker = this.delayedShowMarker.bind(this);
      this.handleMarkerClick = this.handleMarkerClick.bind(this);
    }
    
    componentDidMount() {
      this.delayedShowMarker()
    }

    delayedShowMarker(){
      setTimeout(() => {
        this.setState({ isMarkerShown: true })
      }, 3000)
    }

    handleMarkerClick(){
      this.setState({ isMarkerShown: false })
      this.delayedShowMarker()
    }

    render() {
      return (
        <MapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          {...this.props}
        />
      )
    }
}

export default MapContainer;