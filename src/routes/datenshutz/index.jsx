import React, { Component } from "react";

class Datenschutz extends Component {

  constructor(props) {
    super();
    this.state = {

    }
  }

  componentWillMount() {
    (function (w,d) {
      let loader = function () {
        let s = d.createElement("script"),tag = d.getElementsByTagName("script")[0];
        s.src="https://cdn.iubenda.com/iubenda.js";
        tag.parentNode.insertBefore(s,tag);
      };
      if(w.addEventListener){
        w.addEventListener("load", loader, false);
      }
      else if(w.attachEvent){
        w.attachEvent("onload", loader);
      }
      else{w.onload = loader;
      }
    }
  )(window, document)
  }


  render() {
    return (
      <div>
        <a href="https://www.iubenda.com/privacy-policy/46431006"
          className="iubenda-white iubenda-embed iub-legal-only iub-no-markup iub-body-embed"
          title="Privacy Policy">Privacy Policy
        </a>
      </div>
    );
  }
}

export default Datenschutz;
