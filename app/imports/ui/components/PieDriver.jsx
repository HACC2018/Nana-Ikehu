import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import Graph2 from './Graph2';

export default class PieDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: ''}
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd ) {
      let self = this;
      this.setState({data : ''})
      Meteor.call("sumByDate", new Date(this.props.dateStart) , new Date(this.props.dateEnd),(error, response) => {
        if(error) {
          console.log('SimpleLine' + error)
        } else {
          console.log("res + for ID " + this.state.meterId)

          console.log(response)

          self.setState({ data : response });
        }
      });
    }
  }


  componentWillMount() {
    const self = this;
    Meteor.call("sumByDate", new Date(this.props.dateStart) , new Date(this.props.dateEnd),(error, response) => {
      if(error) {
        console.log('SimpleLine' + error)
      } else {

        console.log(response)
        self.setState({ data : response });
      }
    });
  }
  render() {
    return (!_.isEmpty(this.state.data)) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }


  renderGraph() {
    console.log(this.state.data)
    return(
        <Card fluid>
          <Card.Content>
            <Graph2 data={this.state.data.buildings} x={'name'} y={'sum'}/>
          </Card.Content>
        </Card>

    )
  }

}


PieDriver.defaultProps = {
  dateStart: new Date('5/1/2018'),
  dateEnd: new Date()
};
