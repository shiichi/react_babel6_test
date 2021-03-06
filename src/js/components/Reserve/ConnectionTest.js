import React, { Component } from 'react';
import { DOMAIN_NAME } from '../../../config/env';

class ConnectionTest extends Component {
  render() {
    const src = DOMAIN_NAME + '/mypage/test';
    return (
      <div>
        <iframe id="iframe" src={ src } sandbox="allow-same-origin allow-scripts" ></iframe>
        <div id="modal-overlay"></div>
      </div>
    );
  }
}

export default ConnectionTest;
