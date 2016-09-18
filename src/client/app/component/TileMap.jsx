import React from 'react';

import Tile from './Tile.jsx';


class TileMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        clients : [ {name:'default', status:'unknown'} ]
      };
  }

  componentDidMount () {
    // url (required), options (optional)
    this.serverRequest = fetch(this.props.source, {
    	method: 'get'
    }).then(response => {
      return response.json();
    }).then(response => {
      var lastGist = response[0];
      this.setState({
        clients : [ { name: lastGist.owner.login, status: lastGist.html_url } ]
      });
    }).catch(function(err) {
      console.log(err)
    });
  }

  componentWillUnmount () {
    this.serverRequest.abort();
  }

  render () {
    var testClient = [
      { client: { name: "coreos-red", status: "ok"} },
      { client: { name: "coreos-blue", status: "critical"} },
      { client: { name: "coreos-green", status: "ok"} },
      { client: { name: "coreos-yellow", status: "warning"} },
    ]
    return (
      <div className="mosaic-grid">
        <h3>Tile Map</h3>
        {this.state.clients.map(function(client, i) {
          return (
              <Tile {...client} />
            );
          })}
      </div>
    );
  }
}

export default TileMap;
