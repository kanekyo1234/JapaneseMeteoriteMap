import React from "react";
import ReactDOM from "react-dom";
import {ChoroplethMapPage} from "./ChoroplethMap";

const App = () => {
  return (
    <div>
      <Hero />
      <p>とりあえず作っといた！！</p>
      <p>ghjk</p>
      <g></g>
      <ChoroplethMapPage />
      
      <Footer />
    </div>
  );
};
const Hero=()=>{
  return(
    <div>
<section class="hero is-primary">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Primary title
      </h1>
      <h2 class="subtitle">
        Primary subtitle
      </h2>
    </div>
  </div>
</section>
</div>
  );
}


const Aa=()=>{
  return(
    <div>
      <section class="section">
    <div class="container">
      <h1 class="title">Section</h1>
      <h2 class="subtitle">
        A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
      </h2>
    </div>
  </section>
    </div>

  );
};
const Footer=()=>{
  return(
  <footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>
  </div>
</footer>
);
};



export default App;