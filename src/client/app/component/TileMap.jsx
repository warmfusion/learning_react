import React from 'react';

import Tile from './Tile.jsx';


class TileMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

  render () {
    var testClient = [
      { client: { name: "coreos-red", status: "ok"} },
      { client: { name: "coreos-blue", status: "critical"} },
      { client: { name: "coreos-green", status: "ok"} },
      { client: { name: "coreos-yellow", status: "warning"} },
    ]
    return (
      <div className="item">
        <h3>Tile Map</h3>
        {testClient.map(function(client, i) {
          return (
              <Tile {...client} />
            );
          })}
      </div>
    );
  }
}

export default TileMap;
