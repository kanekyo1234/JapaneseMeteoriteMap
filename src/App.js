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
            <h1 className="title">JapaneseMeteorite Map</h1>
          </div>

          <div className="hero-foot">
            <nav className="tabs is- is-fullwidth">
              <div className="container">
                <ul>
                  <TabLink to="/" exact>
                    TOP
                  </TabLink>
                  <TabLink to="/ChoroplethMap">MAP</TabLink>
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
      <br></br>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>&copy; team-2020-a</p>
        </div>
      </footer>
    </Router>
  );
};

// const Aa = () => {
//   return (
//     <div>
//       <section class="section">
//         <div class="container">
//           <h1 class="title">Section</h1>
//           <h2 class="subtitle">
//             A simple container to divide your page into{" "}
//             <strong>sections</strong>, like the one you're currently reading
//           </h2>
//         </div>
//       </section>
//     </div>
//   );
// };
// const Footer = () => {
//   return (
//     <footer class="footer">
//       <div class="content has-text-centered">
//         <p>
//           <strong>Bulma</strong> by{" "}
//           <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is
//           licensed
//           <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
//           website content is licensed{" "}
//           <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
//             CC BY NC SA 4.0
//           </a>
//           .
//         </p>
//       </div>
//     </footer>
//   );
// };

export default App;
