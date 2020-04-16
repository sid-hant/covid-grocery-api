import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Link style={{color: 'black'}} to="/" className="nav-link"><h1 style={{ fontSize: '600%', paddingTop: '5%', paddingBottom: '5%'}}>grocerline</h1></Link>
      <div className="container">
        <form>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="search for a store, city, province or country i.e 'brampton' or 'food basics'" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">search</button>
              </div>
            </div>
        </form>
      </div>
    </div>

    <div className="container" style={{paddingTop:'5%'}}>
      <h2 style={{ fontSize: '250%'}}>faq</h2>

      <h4 style={{ fontSize: '150%'}}>how does this whole thing work?</h4>
      <p>
        People have added their local grocery stores into the database. 
        Using that data, you can search for grocery stores by their names and location. 
        For example, searching "Brampton" will give you all of the grocery stores in Brampton. 
        Through this application, you can find data such as the current line length 
        at the grocery store, if they have dedicated senior hours and much more.
      </p><br/>

      <h4 style={{ fontSize: '150%'}}>the grocery store i am looking for isn't here or is incorrect</h4>
      <p>
        We are trying our best to add as many grocery stores with accurate information on this platform. 
        Sadly it is nearly impossible for us to do that so we are seeking your help. 
        If you see any grocery stores missing, feel free to add it to the application using the links above. 
        Also, if you see any incorrect or outdated information, like senior hours, feel free to change it on the store's page.
      </p><br/>

      <h4 style={{ fontSize: '150%'}}>how do you get the line length information?</h4>
      <p>
        We are trying our best to add as many grocery stores with accurate information on this platform. 
        Sadly it is nearly impossible for us to do that so we are seeking your help. 
        If you see any grocery stores missing, feel free to add it to the application using the links above. 
        Also, if you see any incorrect or outdated information, like senior hours, feel free to change it on the store's page.
      </p><br/>


    </div>


    </Router>
  );
}

export default App;
