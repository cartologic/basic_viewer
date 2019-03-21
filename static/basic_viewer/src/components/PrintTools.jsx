import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import { BasicViewerContext } from '../context';
import { exportMap } from '../actions/map';


class PrintTools extends PureComponent {

    render() {

        const { map } = this.context

        return (
            <List>
                {/* <CollapsibleListItem open={false} title="Print PDF" icon={<PictureAsPdfIcon />}>
								</CollapsibleListItem> */}
                <ListItem onClick={() => this.props.onExportMap(map)} button>
                    <ListItemIcon> <CameraIcon /> </ListItemIcon>
                    <ListItemText primary="Export Map (PNG/JPG)" />
                </ListItem>
            </List>
        )
    }
}

PrintTools.contextType = BasicViewerContext;


const mapDispatchToProps = dispatch => {
    return {
        onExportMap: (map) => dispatch(exportMap(map))
    };
};

export default connect(null, mapDispatchToProps)(PrintTools);