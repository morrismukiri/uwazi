/* TEST!!! Entire component */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions/actions';
import * as uiActions from '../actions/uiActions';

import Doc from 'app/Library/components/Doc';

import DropdownList from 'app/Forms/components/DropdownList';


export class RelationshipsGraphEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relationshipTypes: [{_id: null, name: 'Simple relationship'}].concat(props.relationTypes.toJS())
    };

    this.updateLeftRelationshipType = this.updateLeftRelationshipType.bind(this);
    this.updateRightRelationshipType = this.updateRightRelationshipType.bind(this);
    this.removeLeftRelationship = this.removeLeftRelationship.bind(this);
    this.removeRightRelationshipGroup = this.removeRightRelationshipGroup.bind(this);
    this.addEntities = this.addEntities.bind(this);
  }

  componentWillMount() {
    if (!this.props.hubs.size) {
      this.props.addHub();
    }
  }

  updateLeftRelationshipType(hub, index) {
    return (value) => {
      this.props.updateLeftRelationshipType(hub, index, value._id);
    };
  }

  updateRightRelationshipType(hubIndex, rightRelationshipIndex) {
    return (value) => {
      this.props.updateRightRelationshipType(hubIndex, rightRelationshipIndex, value._id);
    };
  }

  removeLeftRelationship(hub, index) {
    return () => {
      this.props.removeLeftRelationship(hub, index);
    };
  }

  removeRightRelationshipGroup(hub, index, rightRelationshipIndex) {
    return () => {
      this.props.removeRightRelationshipGroup(hub, index, rightRelationshipIndex);
    };
  }

  addEntities(hubIndex, rightRelationshipIndex) {
    return () => {
      this.props.edit(hubIndex, rightRelationshipIndex);
      this.props.openAddEntitiesPanel();
    };
  }

  removeEntity(hub, index, rightRelationshipIndex, relationshipIndex) {
    return () => {
      this.props.removeEntity(hub, index, rightRelationshipIndex, relationshipIndex);
    };
  }

  printStoreData() {
    console.log({hubs: this.props.hubs.toJS(), apiCalls: this.props.apiCalls.toJS()});
  }

  render() {
    const {parentEntity, hubs, search, addHub} = this.props;

    return (
      <div className="relationships-graph">

        <div className="relationshipsParent">
          <Doc doc={parentEntity} searchParams={search} />
        </div>

        <div>
          {hubs.map((hub, index) =>
            <div className="relationshipsHub" key={index}>
              <div className="removeHub">
                <i onClick={this.removeLeftRelationship(hub, index)}
                   className="relationships-removeIcon fa fa-times"></i>
              </div>
              <div className="leftRelationshipType">
                <DropdownList valueField="_id"
                              textField="name"
                              data={this.state.relationshipTypes}
                              value={hub.getIn(['leftRelationship', 'template'])}
                              filter="contains"
                              onChange={this.updateLeftRelationshipType(hub, index)} />
              </div>
              <div className="hubRelationship">
                <figure></figure>
              </div>
              <div className="rightRelationships">
                {hub.get('rightRelationships').map((rightRelationship, rightRelationshipIndex) =>
                  <div className="rightRelationshipsTypeGroup" key={rightRelationshipIndex}>
                    <div className="rightRelationshipType">
                      <DropdownList valueField="_id"
                                    textField="name"
                                    data={this.state.relationshipTypes}
                                    value={rightRelationship.get('template')}
                                    placeholder="New connection type"
                                    filter="contains"
                                    onChange={this.updateRightRelationshipType(index, rightRelationshipIndex)}/>
                    </div>
                    <div className="removeRightRelationshipGroup">
                      {(() => {
                        if (rightRelationship.has('template')) {
                          return <i onClick={this.removeRightRelationshipGroup(hub, index, rightRelationshipIndex)}
                                    className="relationships-removeIcon fa fa-times"></i>;
                        }

                        return <span>&nbsp;</span>;
                      })()}
                    </div>
                    {rightRelationship.get('relationships').map((relationship, relationshipIndex) =>
                      <div className="rightRelationship" key={relationshipIndex}>
                        <div className="rightRelationshipType">
                          <Doc doc={relationship.get('entity')} searchParams={search} />
                        </div>
                        <div className="removeEntity">
                          <i onClick={this.removeEntity(hub, index, rightRelationshipIndex, relationshipIndex)}
                             className="relationships-removeIcon fa fa-times"></i>
                        </div>
                      </div>
                    )}
                    {(() => {
                      if (rightRelationship.has('template')) {
                        return <div className="rightRelationshipAdd">
                                <button className="relationships-new"
                                         onClick={this.addEntities(index, rightRelationshipIndex)}>
                                  <span>Add entities / documents</span>
                                  <i className="fa fa-plus"></i>
                                </button>
                               </div>;
                      }

                      return null;
                    })()}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="relationshipsHub">
            <div className="leftRelationshipType">
              <button className="relationships-new" onClick={addHub}>
                <span>New relationships group</span>
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>

          <div>
            <div className="leftRelationshipType">
              <button className="relationships-new btn btn-success" onClick={() => {this.printStoreData();}}>
                Print store data
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

RelationshipsGraphEdit.propTypes = {
  parentEntity: PropTypes.object,
  hubs: PropTypes.object,
  apiCalls: PropTypes.object,
  search: PropTypes.object,
  relationTypes: PropTypes.object,
  addHub: PropTypes.func,
  updateLeftRelationshipType: PropTypes.func,
  updateRightRelationshipType: PropTypes.func,
  removeLeftRelationship: PropTypes.func,
  removeRightRelationshipGroup: PropTypes.func,
  edit: PropTypes.func,
  removeEntity: PropTypes.func,
  openAddEntitiesPanel: PropTypes.func
};

export function mapStateToProps({entityView, connectionsList, relationships, relationTypes}) {
  return {
    parentEntity: entityView.entity,
    search: connectionsList.sort,
    hubs: relationships.hubs,
    apiCalls: relationships.apiCalls,
    relationTypes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addHub: actions.addHub,
    updateLeftRelationshipType: actions.updateLeftRelationshipType,
    updateRightRelationshipType: actions.updateRightRelationshipType,
    removeLeftRelationship: actions.removeLeftRelationship,
    removeRightRelationshipGroup: actions.removeRightRelationshipGroup,
    edit: actions.edit,
    removeEntity: actions.removeEntity,
    openAddEntitiesPanel: uiActions.openPanel
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RelationshipsGraphEdit);
