import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Input, Row, Col } from 'react-bootstrap';
//Utility
import { validat } from '../../../utils/ValidationUtils';
//Actions
import * as AccessRoleActions from '../../../actions/access/role';
import * as AccessPermissionActions from '../../../actions/access/permission';
import * as InitializeActions from '../../../actions/initialize';

class CreateRoles extends Component {
  constructor(props, context) {
    super(props, context);
    const string = ['name', 'sort'].reduce((request, key) => {
      request[key] = {value: '', status: '', message: ''};
      return request;
    }, {});

    const array = [ 'assigneesPermissions' ].reduce((request, key) => {
      request[key] = {value: [], status: '', message: ''};
      return request;
    }, {});

    this.state = Object.assign(string, array);
  }

  componentWillMount() {
    const { clearValidationAlert, clearAddress } = this.props.actions;
    clearValidationAlert();
    clearAddress();
  }

  componentDidMount() {
    const { fetchPermissions } = this.props.actions;
    fetchPermissions();
  }

  validat(name, value, checked) {
    switch (name) {
    case 'assigneesPermissions':
      this.setState({[name]: {value:[value]}});
      break;

    default:
      this.setState({[name]: validat(name, value)});
    }
  }

  handleChange(e) {
    const { name, value, checked } = e.target;
    this.validat(name, value, checked);
  }

  renderPermissions() {
    const { permissions } = this.props;
    return permissions.map(permission =>
      <div className="col-xs-offset-2 col-xs-10" key={permission.id}>
        <div className="checkbox">
          <label className>
            <input type="checkbox" value={permission.id} name="assigneesPermissions" className/>
            <span><strong>{permission.displayName}</strong></span>
          </label>
        </div>
      </div>
    );
  }

  render() {
    const { name, sort } = this.state;

    return (
      <div className="box-body">
        <form className="form-horizontal" onChange={this.handleChange.bind(this)}>
          <Input type="text" label="Name" name="userId" placeholder="Role Name"
            bsStyle={name.status}
            labelClassName="col-xs-2"
            wrapperClassName="col-xs-10"
            help={name.message}/>
          <Input type="text" label="Name" name="sort" placeholder="Sort"
            bsStyle={sort.status}
            labelClassName="col-xs-2"
            wrapperClassName="col-xs-10"
            help={sort.message}/>
          {this.renderPermissions()}
        </form>
      </div>
    );
  }
}

CreateRoles.propTypes = {
  lang: PropTypes.string.isRequired,
  validationError: PropTypes.string.isRequired,
  permissions: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
    validationError: state.validationError,
    permissions: state.permissions.permissions,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(AccessRoleActions, AccessPermissionActions, InitializeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(CreateRoles);
