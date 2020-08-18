import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { HashRouter as Router, Route, Link } from "react-router-dom";

// import * as d3 from "d3";
// import * as topojson from "topojson";
import TopPage from "./TopPage";
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

          <div className="hero-foot">
            <nav className="tabs is- is-fullwidth">
              <div className="container">
                <ul>
                  <TabLink to="/" exact>
                    Top
                  </TabLink>
                  <TabLink to="/ChoroplethMap">inseki</TabLink>
                </ul>
              </div>
            </nav>
          </div>
        </section>

        <div>
          <Route exact path="/" component={TopPage} />
          <Route path="/ChoroplethMap" component={ChoroplethMapPage} />
        </div>
      </body>
    </Router>
  );
};

export default App;
