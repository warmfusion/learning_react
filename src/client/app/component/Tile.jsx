import React from 'react';

class Tile extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        client : props.client || {name:'unset', status:'unknown'}
      };
  }

  render () {
    return (
      <div className="item">
        <h2 className="name">{this.state.client.name}</h2>
        <div>
          <div className="status">{this.state.client.status}</div>
        </div>
      </div>
    );
  }
}

export default Tile;
