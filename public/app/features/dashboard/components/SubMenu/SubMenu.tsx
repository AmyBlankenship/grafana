import React, { PureComponent } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { StoreState } from '../../../../types';
import { VariableState } from '../../../templating/state/types';
import { getVariableStates } from '../../../templating/state/selectors';
import { VariableHide } from '../../../templating/variable';
import { DashboardModel } from '../../state';
import { AngularDashboardLinks } from './AngularDashboardLinks';
import { Annotations } from './Annotations';
import { SubMenuItems } from './SubMenuItems';

interface OwnProps {
  dashboard: DashboardModel;
}

interface ConnectedProps {
  variableStates: VariableState[];
}

interface DispatchProps {}

type Props = OwnProps & ConnectedProps & DispatchProps;

class SubMenuUnConnected extends PureComponent<Props> {
  onAnnotationStateChanged = (updatedAnnotation: any) => {
    // we're mutating dashboard state directly here until annotations are in Redux.
    for (let index = 0; index < this.props.dashboard.annotations.list.length; index++) {
      const annotation = this.props.dashboard.annotations.list[index];
      if (annotation.name === updatedAnnotation.name) {
        annotation.enable = !annotation.enable;
        break;
      }
    }
    this.props.dashboard.startRefresh();
    this.forceUpdate();
  };

  isSubMenuVisible = () => {
    if (this.props.dashboard.links.length > 0) {
      return true;
    }

    const visibleVariableStates = this.props.variableStates.filter(
      state => state.variable.hide !== VariableHide.hideVariable
    );
    if (visibleVariableStates.length > 0) {
      return true;
    }

    const visibleAnnotations = this.props.dashboard.annotations.list.filter(annotation => annotation.hide !== true);
    return visibleAnnotations.length > 0;
  };

  render() {
    if (!this.isSubMenuVisible()) {
      return null;
    }

    return (
      <div className="submenu-controls">
        <SubMenuItems variableStates={this.props.variableStates} />
        <Annotations
          annotations={this.props.dashboard.annotations.list}
          onAnnotationChanged={this.onAnnotationStateChanged}
        />
        <div className="gf-form gf-form--grow" />
        <AngularDashboardLinks dashboard={this.props.dashboard} />
        <div className="clearfix" />
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps, StoreState> = state => ({
  variableStates: getVariableStates(state),
});

export const SubMenu = connect(mapStateToProps)(SubMenuUnConnected);
SubMenu.displayName = 'SubMenu';
