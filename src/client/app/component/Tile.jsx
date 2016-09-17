import React from 'react';

class Tile extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        likesCount : props.likesCount,
        client : props.client || {name:'unset', status:'unknown'}
      };
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

  render () {
    return (
      <div className="item">
        <h2 className="name">{this.state.client.name}</h2>
        <div>
          <div className="status" >{this.state.client.status}</div>
        </div>
      </div>
    );
  }
}

export default Tile;
