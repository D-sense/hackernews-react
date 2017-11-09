import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = '';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_TAG = 'tags=front_page';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_TAG}`;

function isSearched(searchTerm){
  return function(item){
     return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

const Search = ({value, onChange, children}) => {
    return (
      <form>
        {children} <input type="text" value={value} onChange={onChange} />
      </form>
    );
}


const largeColumn = { 
  width: '60%',
};
const midColumn = { 
  width: '20%',
};
const smallColumn = { 
  width: '10%',
};

const Table = ({ list, pattern, onDismiss }) =>
    <div className="table">
        { list.filter(isSearched(pattern)).map(item => 
            <div key={item.objectID} className="table-row">
                  <span style={ largeColumn }>
                     <a href={item.url}>{ item.title } </a>
                  </span>
                  <span style={midColumn}>
                   Author: { item.author } 
                  </span>
                  <span style={smallColumn}>
                    Comments: { item.num_comments } 
                  </span>
                  <span style={smallColumn }>
                     Points: { item.points } 
                  </span>
                  <span style={smallColumn}>
                  <Button onClick={ () => onDismiss(item.objectID)} className="button-inline">
                                        
                     Dismiss
                  </Button>
                  </span>
            </div> 
        )}
    </div>



const Button = ({onClick, className='', children}) =>{
    return (
      <button onClick={ onClick} type="button" className={className}> {children} </button>
    );
}


class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        result: null,
        searchTerm : DEFAULT_QUERY,
      };
 
                
      this.setSearchTopStories = this.setSearchTopStories.bind(this);
      this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
      this.onSearchChange = this.onSearchChange.bind(this);      
      this.onDismiss = this.onDismiss.bind(this);
    }
    
    

    setSearchTopStories(result){
      this.setState({result});
    }

    fetchSearchTopStories(searchTerm){
      fetch(url)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result))
        .catch(e => e);
    }
    
    

    componentDidMount (){
       const {searchTerm} = this.state;
       this.fetchSearchTopStories(searchTerm);
    }

    onSearchChange(event){
       this.setState({
         searchTerm : event.target.value,
       });
    }

    onDismiss (id){
      const isNotId = item => item.objectID !== id;
      const updatedHits = this.state.result.hits.filter((item) => item.objectID !== id);
      this.setState({
        result: {...this.state.result, hits: updatedHits},
      }); 

    }

    render() {
      const {searchTerm, result} = this.state;
        return (
          <div className="page">
            <div className="interactions">
  
            <Search
              value={searchTerm} 
              onChange={this.onSearchChange }
            > 
              Search   
            </Search>
            </div>
            {result &&
                <Table
                list={result.hits}
                pattern={searchTerm}
                onDismiss={this.onDismiss}
                > 
                </Table>  
            }          
          </div>
        ); 
    }
        
}

export default App; 
