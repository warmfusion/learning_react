import React from 'react';
const Tile = ({ client }) => (
  <div className="item">
  <h2 className="name">Name: {client.name}</h2>
  <div>
    <div className="status">Status: {client.output}</div>
    </div>
  </div>
);

export default Tile;
