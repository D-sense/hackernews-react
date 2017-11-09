import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HelloWorld from './Hello';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <div>
    <HelloWorld name={<strong>D-sense</strong>}/>
    <App />
  </div> ,
  document.getElementById('root')
);

if(module.hot){
  module.hot.accept();
}