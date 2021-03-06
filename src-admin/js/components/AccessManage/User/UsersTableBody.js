import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from 'react-fa';
//Utility
import { hasPermission } from '../../../utils/PermissionUtils';

class UsersTableBody extends Component {
  handleClick(e) {
    const { id, action } = e
    const { activePage, perpage, asyncStatus, actions: {
      deactivateUser, activateUser, deleteUser, restoreUser, permanentlyDeleteUser
    }} = this.props;

    if (!asyncStatus[id]) {
      switch (action){
        case 'deactivate':
          deactivateUser(id, activePage, perpage);
          break;
        case 'activate':
          activateUser(id, activePage, perpage);
          break;
        case 'delete':
          deleteUser(id, activePage, perpage);
          break;
        case 'restore':
          restoreUser(id, activePage, perpage);
          break;
        case 'permanentlyDelete':
          permanentlyDeleteUser(id, activePage, perpage);
          break;
      }
    };
  }

  renderUser(){
    const { myId, myRoles, myPermissions, users, asyncStatus } = this.props;
    console.log(asyncStatus)
    return users.map(u =>
      <tr key={u.id} className="tr-disabled-aaa">
        <td>{u.id}</td>
        <td>{u.userId}</td>
        <td><a href="mailto:admin@admin.com">{u.email}</a></td>
        <td>
          {u.confirmed == 1 ?
            <label className="label label-success">Yes</label> :
            <label className="label label-danger">No</label>
          }
        </td>
        <td>{u.assigneesRoles.length ? u.assigneesRoles.toString() : 'None'}</td>
        <td className="visible-lg">{u.createdAt}</td>
        <td className="visible-lg">{u.updatedAt}</td>
        <td>
          {hasPermission(myRoles, myPermissions, 'edit-users') && !u.deletedAt &&
          <LinkContainer to={{ pathname: '/access/user/edit/' + u.id}}>
            <OverlayTrigger placement="top" overlay={(<Tooltip>Edit</Tooltip>)}>
              <Button bsStyle="primary" bsSize="xsmall"><Icon name="pencil"/></Button>
            </OverlayTrigger>
          </LinkContainer>}
          {hasPermission(myRoles, myPermissions, 'change-user-password') && !u.deletedAt &&
          <LinkContainer to={{ pathname: '/access/user/change/password/' + u.id}}>
            <OverlayTrigger placement="top" overlay={(<Tooltip>Change Password</Tooltip>)}>
              <Button bsStyle="info" bsSize="xsmall" onClick={this.handleClick.bind(this, {id: u.id, action: 'changePassword'})}>
                <Icon name="refresh"/>
              </Button>
            </OverlayTrigger>
          </LinkContainer>}
          {hasPermission(myRoles, myPermissions, 'deactivate-users') && !u.deletedAt && u.status == 1 && u.id != myId &&
          <OverlayTrigger placement="top" overlay={(<Tooltip>Deactivate</Tooltip>)}>
            <Button bsStyle="warning" bsSize="xsmall" onClick={this.handleClick.bind(this, {id: u.id, action: 'deactivate'})}>
              {asyncStatus[u.id] === 'deactivate' ? <Icon spin name="pause"/> : <Icon name="pause"/>}
            </Button>
          </OverlayTrigger>}
          {hasPermission(myRoles, myPermissions, 'reactivate-users') && !u.deletedAt && u.status == 0 &&
          <OverlayTrigger placement="top" overlay={(<Tooltip>Activate</Tooltip>)}>
            <Button bsStyle="success" bsSize="xsmall" onClick={this.handleClick.bind(this, {id: u.id, action: 'activate'})}>
              {asyncStatus[u.id] === 'activate' ? <Icon spin name="play"/> : <Icon name="play"/>}
            </Button>
          </OverlayTrigger>}
          {hasPermission(myRoles, myPermissions, 'resend-user-confirmation-email') && !u.deletedAt && u.confirmed == 0 &&
          <OverlayTrigger placement="top" overlay={(<Tooltip>Resend</Tooltip>)}>
            <Button bsStyle="success" bsSize="xsmall" onClick={this.handleClick.bind(this, {id: u.id, action: 'resend'})}>
              {asyncStatus[u.id] === 'resend' ? <Icon spin name="refresh"/> : <Icon name="refresh"/>}
            </Button>
          </OverlayTrigger>}
          {hasPermission(myRoles, myPermissions, 'delete-users') && !u.deletedAt && u.id != myId &&
          <OverlayTrigger placement="top" overlay={(<Tooltip>Delete</Tooltip>)}>
            <Button bsStyle="danger" bsSize="xsmall" onClick={this.handleClick.bind(this, {id: u.id, action: 'delete'})}>
              {asyncStatus[u.id] === 'delete' ? <Icon spin name="trash"/> : <Icon name="trash"/>}
            </Button>
          </OverlayTrigger>}
          {hasPermission(myRoles, myPermissions, 'undelete-users') && u.deletedAt &&
          <OverlayTrigger placement="top" overlay={(<Tooltip>Restore</Tooltip>)}>
            <Button bsStyle="success" bsSize="xsmall" onClick={this.handleClick.bind(this, {id: u.id, action: 'restore'})}>
              {asyncStatus[u.id] === 'restore' ? <Icon spin name="refresh"/> : <Icon name="refresh"/>}
            </Button>
          </OverlayTrigger>}
          {hasPermission(myRoles, myPermissions, 'permanently-delete-users') && u.deletedAt &&
          <OverlayTrigger placement="top" overlay={(<Tooltip>Delete Permanently</Tooltip>)}>
            <Button bsStyle="danger" bsSize="xsmall" onClick={this.handleClick.bind(this, {id: u.id, action: 'permanentlyDelete'})}>
              <Icon name="times"/>
            </Button>
          </OverlayTrigger>}
        </td>
      </tr>
    );
  }

  render() {
    return (
      <tbody>
        {this.renderUser()}
      </tbody>
    );
  }
}

UsersTableBody.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  asyncStatus: PropTypes.object,
  activePage: PropTypes.number.isRequired,
  perpage: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

export default UsersTableBody;
