import React from 'react';

class Tile extends React.Component {

  render() {
    const listClass = `list-item card ${this.props.view} status-${this.props.client.status}`;
    const style = { zIndex: 1000 - this.props.index };

    return (
      <li className={listClass} style={style}>
      <p className="name">{this.props.client.name}</p>
      <div className="checks">
        <div className="output">{this.props.client.output}</div>
        </div>
      </li>
    );
  }
};

export default Tile;
