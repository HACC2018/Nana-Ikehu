import React from 'react';
import { Dropdown, Loader, Card, Grid, Container } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { Meteor } from "meteor/meteor";
import DatePicker from 'react-date-picker';
import { Graph_LineBrush } from '../components/Graph_LineBrush';
import MeterTextSum from '../components/MeterTextSum'

export default class Building extends React.Component {

  constructor(props) {
    super(props)
    let today = new Date()
    let priorDate = new Date().setDate(today.getDate()-30)
    this.state = { data: '',  dateStart: new Date(priorDate),   dateEnd: today, meter:''};
    this.DropdownList = this.DropdownList.bind(this);
    this.onBuilding = this.onBuilding.bind(this)
    this.DropdownMeterList = this.DropdownMeterList.bind(this)
    this.meterSelected = this.meterSelected.bind(this)
    this.endChange = this.endChange.bind(this)
    this.startChange = this.startChange.bind(this)

    if(this.props.match.params.code){
      this.state.build = this.props.match.params.code;
    }

  }

  endChange = date => {this.setState({ dateEnd: date }); console.log(this.state)}
  startChange = date => this.setState({ dateStart: date })

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
      return (
          <Dropdown placeholder='Select Meter' fluid search selection options={selection} onChange={this.meterSelected} defaultValue={selection[0].value}/>

      );
    }
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
    let barpad = {marginBottom : '8px'}
    const pickerColor = { color: '#fff' }
    const style = { textAlign: 'center' }
    return (
        <div style={pad}>
          <Grid columns={2} centered>

            <Grid.Row>
              <Grid.Column style={style}>
                <DatePicker className='datePicker' style={{border: 'none'}}
                    name="dateStart"
                    placeholder="Start"
                    value={this.state.dateStart}
                    onChange={this.startChange} />
              </Grid.Column>
              <Grid.Column style={style}>
                <DatePicker className='datePicker' style={pickerColor}
                    name="dateEnd"
                    placeholder="End"
                    value={this.state.dateEnd}
                    onChange={this.endChange} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Column style={barpad}>
              <Grid.Row>
          <Dropdown placeholder='Select Building' fluid search selection options={this.DropdownList()}
                    onChange={this.onBuilding} value={this.state.build}/></Grid.Row>
              <Grid.Row >
          { (this.state.build) ? this.DropdownMeterList() : '' }
              </Grid.Row>
            </Grid.Column>

          </Grid>
          <Container height={'80%'}>
          <Card.Group itemsPerRow={1} >
            { (this.state.meter) && <MeterTextSum meterId={this.state.meter} dateStart={this.state.dateStart.toString()} dateEnd={this.state.dateEnd.toString()} unit={this.state.unit}/> }
            { (this.state.meter) && <Graph_LineBrush meterId={this.state.meter} x={'time'} y={'mean'} dateStart={this.state.dateStart.toString()} dateEnd={this.state.dateEnd.toString()}/> }
          </Card.Group>
          </Container>

        </div>
    );
  }

}

