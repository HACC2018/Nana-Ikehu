import React from 'react';
import { Grid, Image } from 'semantic-ui-react';


/** A simple static component to render some text for the landing page. */
class Upload extends React.Component {


   readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      var element = document.getElementById('file-content');
      element.textContent = contents;
    };
    reader.readAsText(file);
  }



  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Row>
            <input type="file" id="file-input" onChange={this.readSingleFile}/>
            <h3>Contents of the file:</h3>
            <pre id="file-content"></pre>
          </Grid.Row>

        </Grid>
    );
  }
}

export default Upload;