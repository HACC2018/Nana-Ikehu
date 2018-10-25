import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Row>
            <Grid.Column width={8}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <Image size='small' circular src="/images/meteor-logo.png"/>
          </Grid.Column>
          </Grid.Row>

        </Grid>
    );
  }
}

export default Landing;
