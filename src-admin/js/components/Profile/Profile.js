import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserinfoActions from '../../actions/userinfo';
// components
import Header from './Header';
import MainSection from './MainSection';

class Profile extends Component {
  render() {
    const { user, actions } = this.props;

    return (
      <div>
        <Header/>
        <MainSection user={user} actions={actions}/>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserinfoActions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(Profile);
