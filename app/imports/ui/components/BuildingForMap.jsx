import React from 'react';
import { Dropdown, Loader, Card, Grid, Container } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { Meteor } from "meteor/meteor";
import MeterTextSum from './MeterTextSum'

export default class Building extends React.Component {

  constructor(props) {
    super(props)
    this.state = { data: '',  dateStart: '',   dateEnd: '', meter:''};
    this.DropdownList = this.DropdownList.bind(this);
    this.onBuilding = this.onBuilding.bind(this)
    this.DropdownMeterList = this.DropdownMeterList.bind(this)
    this.meterSelected = this.meterSelected.bind(this)

    if(this.props.build){
      this.state.build = this.props.build;

    }
      this.state.dateStart = this.props.dateStart;
      this.state.dateEnd = this.props.dateEnd;

  }


  componentWillMount() {
    const self = this;
    Meteor.call("getBuildings", (error, response) => {
      if (error) {
        console.log('Building' + error)
      } else {
        console.log("res+ build ")
        console.log(response)

        self.setState({ data: response});


      }
    });
  }

  DropdownList() {
    let builds = this.state.data;
    let selection = [];
    _.forEach(builds, build => {
      let x = {
        key: build.code,
        value: build.code,
        text: build.name
      }
      selection.push(x)
    })

    return selection;
  }

  DropdownMeterList() {
    if (this.state.build) {
      console.log(this.state.data)
      let selected = _.findWhere(this.state.data, { code: this.state.build });

      let selection = [];
      _.forEach(selected.meters, build => {
        let x = {
          key: build.id,
          value: build.id + " " + build.unit + " " + build.name,
          text: build.unit + " " + build.name,
        }
        selection.push(x)
      })
      if(this.state.meter === ''){
        this.setState( {meter : selection[0].key, unit: 'kW'})
      }
    }
    console.log(this.state.dateStart)
  }


  meterSelected(e, name) {
    let x = name.value.split(" ")
    this.setState({ meter: parseInt(x[0]), unit: x[1]});
  }



  render() {

    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  onBuilding(e, name) {
    this.setState({ build: name.value });
    console.log("build ID: " + name.value)
  }

  renderGraph() {
    let pad = {marginTop : '4em'}
    return (
        <div style={pad}>
            { (this.state.build) ? this.DropdownMeterList() : '' }
          <Container height={'80%'}>
            <Card.Group itemsPerRow={1} >
              { (this.state.meter) && <MeterTextSum meterId={this.state.meter} dateStart={this.state.dateStart.toString()} dateEnd={this.state.dateEnd.toString()} unit={this.state.unit}/> }
            </Card.Group>
          </Container>

        </div>
    );
  }

}

