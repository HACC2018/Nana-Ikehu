// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'
import { Container} from 'semantic-ui-react'
import defaultBuilding from '../../api/building_db/buildingCoor'
import { Link } from 'react-router-dom';
import BuildingForMap from './BuildingForMap'




export default class Map1 extends Component {
  constructor(props) {
    super(props)
    this.state = { data: '', marker: this.props.marker,  dateStart: '',   dateEnd: '', meter:''};
    this.state.dateStart = this.props.dateStart;
    this.state.dateEnd = this.props.dateEnd;
  }


  render()
{
    const position = [21.299677843574493, -157.81743038445714]
    return (

          <Map center={position} zoom={17} minZoom={'17'} style={{height: '600px'}}>
            <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            {
              defaultBuilding.map( item =>{
            let x = {lat: item.coor[0], lon: item.coor[1]}
             return <Marker position={x}>
                <Popup minWidth={350}>
                  <Container>
              <BuildingForMap build={item.code} dateStart={this.state.dateStart} dateEnd={this.state.dateEnd}/>
                  <p/>
              <Link to={"/building/" + item.code}>Building {item.code}</Link>
                  </Container>
                </Popup>
              </Marker>}

            )}
          </Map>
    )
  }
}
