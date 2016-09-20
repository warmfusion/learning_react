import React from 'react';
import Toggle from './Toggle.jsx';
import FlipMove from 'react-flip-move';
import Tile from './Tile.jsx';

var Masonry = require('react-masonry-component');

var masonryOptions = {
    transitionDuration: 0,
    columnWidth: 64
};

class MosaicPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      removedclients: [],
      view: 'grid',
      order: 'state',
      sortingMethod: 'status',
      enterLeaveAnimation: 'accordianVertical'
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.sortRotate = this.sortRotate.bind(this);
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
      }).catch(err => {
        console.log(err)
        this.setState({
          error: err
        });
      });
    }

    componentWillUnmount () {
      this.serverRequest.abort();
    }

    renderClients(){
      return this.state.clients.map( (client,i) => <Tile
          key={client._id}
          view={this.state.view}
          index={i}
          client={client}
          /> );
    }

  toggleList() {
    this.setState({
      view: 'list',
      enterLeaveAnimation: 'accordianVertical'
    });
  }

  toggleGrid() {
    this.setState({
      view: 'grid',
      enterLeaveAnimation: 'accordianHorizontal'
    });
  }

  toggleSort() {
    const sortStatus = (a, b) => b.status - a.status;
    const sortName = (a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
      };

    this.setState({
      order: (this.state.order === 'state' ? 'name' : 'state'),
      sortingMethod: 'status',
      clients: this.state.clients.sort(
        this.state.order === 'state' ? sortStatus : sortName
      )
    });
  }


  moveArticle(source, dest, id) {
    const sourceclients = this.state[source].slice();
    let destclients = this.state[dest].slice();

    if ( !sourceclients.length ) return;

    // Find the index of the article clicked.
    // If no ID is provided, the index is 0
    const i = id ? sourceclients.findIndex(article => article.id === id) : 0;

    // If the article is already removed, do nothing.
    if ( i === -1 ) return;

    destclients = [].concat( sourceclients.splice(i, 1), destclients );

    this.setState({
      [source]: sourceclients,
      [dest]: destclients,
    });
  }

  sortRotate() {
    const clients = this.state.clients.slice();
    clients.unshift(clients.pop())

    this.setState({
      sortingMethod: 'rotate',
      clients
    });
  }

  render() {
    if (this.state.clients == undefined){
      return (
        <div>
          <h2 className='error'>Error: No client data</h2>
          <p className='message'>No client data has been set - This is unexpected. Please check your browsers console log for errors.</p>
          <p className='message'>You may need to raise a bug report at this projects homepage</p>
        </div>
      );
    }

    return (
      <div id="mosaic-panel" className={this.state.view}>
        <header>
          <div className="abs-left">
            <Toggle
              clickHandler={this.toggleList}
              text="List" icon="list"
              active={this.state.view === 'list'}
            />
            <Toggle
              clickHandler={this.toggleGrid}
              text="Grid" icon="th"
              active={this.state.view === 'grid'}
            />
          </div>
          <div className="abs-right">
            <Toggle
              clickHandler={this.toggleSort}
              text={this.state.order === 'state' ? 'Status' : 'Name'}
              icon={this.state.order === 'state' ? 'medkit' : 'sort-alpha-asc'}
              active={true}
            />
            <Toggle
              clickHandler={this.sortRotate}
              text="Rotate" icon="refresh"
              active={this.state.sortingMethod === 'rotate'}
            />
          </div>
        </header>
        <div>
        <Masonry
            elementType={'ul'} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
            { this.renderClients() }
          </Masonry>
          <footer key="foot">
            <div className="abs-right">
            <p>Last Update Time: </p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
};



export default MosaicPanel;
