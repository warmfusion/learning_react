import React from 'react';

class Tile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { client : props.client };
  }

  render () {
    return (
      <div className="item">
        <h2 className="name">Name: {this.state.client.name}</h2>
        <div>
          <div className="status">Status: {this.state.client.output}</div>
        </div>
      </div>
    );
  }
}

export default Tile;
