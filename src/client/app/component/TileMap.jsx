import React from 'react';

import Tile from './Tile.jsx';


class TileMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        clients : [
          {name:'tilemap_default_name', status:'unknown'},
          {name:'second_tilemap', status:'OK'}
         ]
      };
  }

  componentDidMount () {
    this.serverRequest = fetch(this.props.source, {
    	method: 'get'
    }).then(response => {
      return response.json();
    }).then(response => {
      var lastGist = response[0];
      var newClients = [ { name: lastGist.owner.login, status: "FAILURE" } ]
      this.setState({
        clients : newClients
      });
    }).catch(function(err) {
      console.log(err)
    });
  }

  componentWillUnmount () {
    this.serverRequest.abort();
  }

  render () {
    console.log(this.state.clients);
    return (
      <div className="mosaic-grid">
        <h3>Tile Map</h3>
        {this.state.clients.map(function(c, i) {
          return ( <Tile key={i} client={c} /> );
          })
        }
      </div>
    );
  }
}

export default TileMap;
