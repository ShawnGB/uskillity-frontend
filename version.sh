echo "
import React, { Component } from 'react';

class Version extends Component {
  render() {
    return (
      <div>
        <h4>Revision: $(git rev-parse HEAD)</h4>
        <h4>Version count: $(git rev-list HEAD --count)</h4>
        <h4>Built on: $(date '+%Y-%m-%d (%H:%M:%S)'), @ $(uname -n)</h4>
        <h4>Running against: ${REACT_APP_SERVER}</h4>
      </div>
    );
  }
}

export default Version;
" > ./src/routes/version/index.jsx
