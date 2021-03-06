import React, { PropTypes, Component } from 'react';
import { ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class BoxHeader extends Component {
  render() {
    return (
      <div className="box-header with-border">
        <h3 className="box-title">Active Users</h3>
        <div className="box-tools pull-right">
          <div className="pull-right" style={{marginBottom: 10}}>
            <ButtonGroup>
              <DropdownButton bsStyle="primary" bsSize="small" title="Users">
                <LinkContainer to={{ pathname: '/access/users'}}>
                  <MenuItem eventKey="1">All User</MenuItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/access/users/active'}}>
                  <MenuItem eventKey="2">Active User</MenuItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/access/users/deactivated'}}>
                  <MenuItem eventKey="3">Deactivated User</MenuItem>
                </LinkContainer>
                <MenuItem divider />
                <LinkContainer to={{ pathname: '/access/user/create'}}>
                  <MenuItem eventKey="4">Create User</MenuItem>
                </LinkContainer>
                <MenuItem divider />
                <LinkContainer to={{ pathname: '/access/users/deleted'}}>
                  <MenuItem eventKey="5">Deleted Users</MenuItem>
                </LinkContainer>
              </DropdownButton>
              <DropdownButton bsStyle="primary" bsSize="small" title="Roles">
                <LinkContainer to={{ pathname: '/access/roles'}}>
                  <MenuItem eventKey="1">All Roles</MenuItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/access/role/create'}}>
                  <MenuItem eventKey="2">Create Role</MenuItem>
                </LinkContainer>
              </DropdownButton>
              <DropdownButton bsStyle="primary" bsSize="small" title="Permissions">
                <LinkContainer to={{ pathname: '/access/permissions'}}>
                  <MenuItem eventKey="1">All Groups</MenuItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/access/permissions'}}>
                  <MenuItem eventKey="2">All Permissions</MenuItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/access/permissions'}}>
                  <MenuItem eventKey="3">Create Group</MenuItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/access/permissions'}}>
                  <MenuItem eventKey="4">Create Permission</MenuItem>
                </LinkContainer>
              </DropdownButton>
            </ButtonGroup>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

export default BoxHeader;
