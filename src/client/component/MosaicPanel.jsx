import React from 'react';
import Toggle from './Toggle.jsx';
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
      view: 'grid',
      order: 'asc',
      sortingMethod: 'status',
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleStatusSort = this.toggleStatusSort.bind(this);
    this.toggleNameSort = this.toggleNameSort.bind(this);
    this.sortRotate = this.sortRotate.bind(this);
  }


    componentDidMount () {
      this.startPollingAPI();
    }

    startPollingAPI(){
      console.log("Starting API Poll");
      var self = this;
      self.fetchFromSensu(); // do it once and then start it up ...
      self._timer = setInterval(self.fetchFromSensu.bind(self), 30000);
    }


    fetchFromSensu(){

      this.serverRequest = fetch(this.props.source, {
      	method: 'get'
      }).then(response => {
        return response.json();
      }).then(response => {
        var newClients = []
        response.map(function(e,i){
          newClients.push ( e );
        });
        var currentState = this.state;
        currentState.clients = newClients;
        currentState.updated = Date.now();
        this.setState(currentState);
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
    });
  }

  toggleGrid() {
    this.setState({
      view: 'grid',
    });
  }

  toggleStatusSort() {
    const sortStatus = (a, b) => b.status - a.status;
    const sortStatusDesc = (a, b) => a.status - b.status;


    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'status',
      clients: this.state.clients.sort(
        this.state.order === 'asc' ? sortStatus : sortStatusDesc
      )
    });
  }

  toggleNameSort() {
    const sortName = (a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
      };
    const sortNameDesc = (b, a) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
      };

    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'name',
      clients: this.state.clients.sort(
        this.state.order === 'asc' ? sortName : sortNameDesc
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
    if (this.state.error != undefined){
      return (
        <div>
          <h2 className='error'>There has been an error</h2>
          <p>{this.state.error.message}</p>
        </div>
      );
    }
    if (this.state.clients == undefined ){
      return (
        <div>
          <h2 className='loading'>Loading data...</h2>
          <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
          <span className="sr-only">Loading...</span>
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
              clickHandler={this.toggleStatusSort}
              text={this.state.order === 'asc' ? 'Status Low->High' : 'Status High->Low'}
              icon={this.state.order === 'asc' ? 'medkit' : 'medkit'}
              active={this.state.sortingMethod === 'status'}
            />
            <Toggle
              clickHandler={this.toggleNameSort}
              text={this.state.order === 'asc' ? 'Name Desc' : 'Name Asc'}
              icon={this.state.order === 'asc' ? 'sort-alpha-desc' : 'sort-alpha-asc'}
              active={this.state.sortingMethod === 'name'}
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
            <p>Last Update Time: {this.state.updated}</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
};



export default MosaicPanel;
