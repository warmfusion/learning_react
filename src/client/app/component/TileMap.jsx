import React from 'react';

import Tile from './Tile.jsx';


class TileMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        clients : [ ]
      };
  }

  componentDidMount () {
    this.serverRequest = fetch(this.props.source, {
    	method: 'get'
    }).then(response => {
      return response.json();
    }).then(response => {
      var newClients = []
      response.map(function(e,i){
        newClients.push ( e );
      });
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
          return ( <Tile key={c._id} client={c} /> );
          })
        }
      </div>
    );
  }
}

export default TileMap;
