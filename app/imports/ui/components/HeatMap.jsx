// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'
import { Container, Grid, Button, Confirm, Header } from 'semantic-ui-react'
import defaultBuilding from '../../api/building_db/buildingCoor'
import { Link } from 'react-router-dom';
import BuildingForMap from './BuildingForMap'
import { _ } from 'meteor/underscore';




export default class Map2 extends Component {
  constructor(props) {
    super(props)
    this.state = { data: '', marker: this.props.marker,  dateStart: '',   dateEnd: '', meter:''};
    this.state.dateStart = this.props.dateStart;
    this.state.dateEnd = this.props.dateEnd;
  }



  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //
  //   if (this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd ) {
  //     let self = this;
  //     this.setState({data : ''})
  //     Meteor.call("sumByDate", new Date(this.props.dateStart) , new Date(this.props.dateEnd),(error, response) => {
  //       if(error) {
  //         console.log('SimpleLine' + error)
  //       } else {
  //         console.log("res + for ID " + this.state.meterId)
  //
  //         console.log('data from map' + response)
  //
  //         self.setState({ data : response });
  //       }
  //     });
  //   }
  // }
  //
  // componentWillMount() {
  //   const self = this;
  //   Meteor.call("sumByDate", new Date(this.props.dateStart) , new Date(this.props.dateEnd),(error, response) => {
  //     if(error) {
  //       console.log('SimpleLine' + error)
  //     } else {
  //
  //       self.setState({ data : response })
  //     }
  //   });
  //
  // }

  // combineDada(){
  //   const data = [_.pluck(defaultBuilding, 'code'), _.pluck(defaultBuilding, 'coor')]
  //   defaultBuilding.map( item =>{
  //     let x = {lat: item.coor[0], lon: item.coor[1]}
  //     item.code;
  //     return
  //
  //   }
  //
  //   )
  // }

  render()
{
    const position = [21.299677843574493, -157.81743038445714]

    return (

          <Map center={position} zoom={17} minZoom={'17'} style={{height: '600px'}}>
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />

          </Map>
    )
  }
}
