import React from 'react';

class Tile extends React.Component {

  renderTags(){
    if (this.props.client.tags == undefined){
      return;
    }

    // Ugly - but only show tags for Critical alerts
    if (this.props.client.status != 2){
      return;
    }



    var tags = this.props.client.tags;
    return Object.keys(tags).map(function(key) {
        return <li key={key} ><em>{key}</em>: {tags[key]}</li>;
    })
  }

  render() {
    const listClass = `list-item card status-${this.props.client.status}`;
    const style = { zIndex: 1000 - this.props.index };

    return (
      <li className={listClass} style={style}>
        <p className="name">{this.props.client.name}</p>
        <div className="checks">
          <div className="output">{this.props.client.output}</div>
        </div>
        <ul className="tags">
          { this.renderTags() }
        </ul>
      </li>
    );
  }
};

export default Tile;
