// import React from "react";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";

// import * as d3 from "d3";
// import * as topojson from "topojson";
import TopPage from "/TopPage";
import { ChoroplethMapPage } from "./ChoroplethMap";

const TabLink = ({ to, children, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => {
      return (
        <li className={match ? "is-active" : ""}>
          <Link to={to} style={{ color: match ? "rgb(32,88,90)" : "white" }}>
            {children}
          </Link>
        </li>
      );
    }}
  />
);

const App = () => {
  return (
    <Router>
      <body>
        <section className="hero is-primary">
          <div className="hero-body">
            <h1 className="title">Self-introduction</h1>
          </div>
        </section>

        <div className="hero-foot">
          <nav className="tabs is- is-fullwidth">
            <div className="container">
              <ul>
                <TabLink to="/" exact>
                  Top
                </TabLink>
                <TabLink to="/Profile">Profile</TabLink>
              </ul>
            </div>
          </nav>
        </div>

        <div>
          <Route exact path="/" component={TopPage} />
          <Route path="./Profile" component={ChoroplethMapPage} />
        </div>
      </Router>

      {/* <div className="container">
        <p>hdbcjsbvsbdbfsjfb</p>
        <ChoroplethMapPage />
      </div> */}
    </body>
  );
};

export default App;
