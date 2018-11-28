import React from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer, VictoryAxis, VictoryBrushContainer } from 'victory';
import PropTypes from 'prop-types';




export class Graph_LineBrush extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      meterId: this.props.meterId,
      zoomDomain: { x: [new Date(this.props.dateStart), new Date(this.props.dateEnd)] },
    };
    this.componentDidUpdate = this.componentDidUpdate.bind(this);

  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (this.props.meterId !== prevProps.meterId || this.props.dateStart !== prevProps.dateStart || this.props.dateEnd !== prevProps.dateEnd ) {
      let self = this;
      this.setState({meterId : this.props.meterId})
      this.setState({data : ''})
      Meteor.call("getMeterbyDate", this.props.meterId , new Date(this.props.dateStart) , new Date(this.props.dateEnd),(error, response) => {
        if(error) {
          console.log('SimpleLine' + error)
        } else {
          console.log("res + for ID " + this.state.meterId)
          if(!response.length){
            response = [];
          }
          self.setState({ data : response ,zoomDomain: { x: [new Date(this.props.dateStart), new Date(this.props.dateEnd)]}});
        }
      });
    }
  }





  componentWillMount() {
    const self = this;
    Meteor.call("getMeterbyDate", this.props.meterId , new Date(this.props.dateStart) , new Date(this.props.dateEnd),(error, response) => {
      if(error) {
      console.log('SimpleLine' + error)
      } else {
        console.log("res + for ID " + this.state.meterId)
        console.log(response)
        if(!response.length){
          response = [];
        }
        self.setState({ data : response, zoomDomain: { x: [new Date(this.props.dateStart), new Date(this.props.dateEnd)] },
        });
      }
    });
  }

  reduceBrush()  {

  const { zoomDomain, data } = this.state;
let maxPoints = 100;
const filtered = data.filter(
    (d) => (d[this.props.x] >= zoomDomain.x[0] && d[this.props.x] <= zoomDomain.x[1]));

// new code here...
if (filtered.length > maxPoints ) {
  const k = Math.ceil(filtered.length / maxPoints);
  return filtered.filter(
      (d, i) => ((i % k) === 0)
  );
}
console.log(filtered)
return filtered;

}

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    return (this.state.data) ? this.renderGraph() : <Loader active>Getting data</Loader>;
  }

  renderGraph() {
    const divStyle = { backgroundColor: '#383b4a', display: 'inline-block'};
    return (
        <Card style={divStyle} fluid>
          <Card.Content>
            <div>
              <VictoryChart height={250} scale={{ x: 'time' }}
                            containerComponent={
                              <VictoryZoomContainer
                                  zoomDimension="x"
                                  zoomDomain={this.state.zoomDomain}
                                  onZoomDomainChange={this.handleZoom.bind(this)}
                              />
                            }
              >
                <VictoryAxis
                    fixLabelOverlap={true}
                    style={{
                      ticks: { fill: '#fff' },
                      tickLabels: { fill: '#fff' },
                    }}
                />
                <VictoryAxis dependentAxis
                             fixLabelOverlap={true}
                             style={{
                               ticks: { fill: '#fff' },
                               tickLabels: { fill: '#fff' },
                             }}
                />
                <VictoryLine
                    style={{
                      data: { stroke: '#ccff00', strokeWidth: 0.5 },
                      parent: { border: '1px solid #5E7480' },
                      // labels: {
                      //   fontSize: 50,
                      // },
                    }}
                    animate={{
                      duration: 2000,
                      onLoad: { duration: 1000 },
                    }}
                    data={this.state.data}
                    x={this.props.x}
                    y={this.props.y}
                />

              </VictoryChart>
              <VictoryChart
                  padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
                  height={100} scale={{ x: 'time' }}
                  containerComponent={
                    <VictoryBrushContainer
                        brushDimension="x"
                        brushDomain={this.state.zoomDomain}
                        onBrushDomainChange={this.handleZoom.bind(this)}
                    />
                  }
              >
                <VictoryAxis
                    fixLabelOverlap={true}
                    tickFormat={(month) => { new Date(month).getMonth(); } }
                />
                <VictoryLine
                    style={{
                      data: { stroke: '#c43a31', strokeWidth: 0.2 },
                      parent: { border: '1px solid #5E7480' },
                      labels: {
                        fontSize: 50,
                      },
                    }}
                    data={this.reduceBrush() }
                    x={this.props.x}
                    y={this.props.y}
                />
              </VictoryChart>
            </div>
          </Card.Content>
        </Card>
    );
  }
}
Graph_LineBrush.propTypes = {
  meterId: PropTypes.number.isRequired,
  x: PropTypes.string,
  y: PropTypes.string,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string
};
Graph_LineBrush.defaultProps = {
  x: 'x',
  y: 'y',
  dateStart: new Date('1/1/1970'),
  dateEnd: new Date()
};
