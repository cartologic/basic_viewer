import CartoviewLegends from './Legend'
import CollapsibleListItem from './CollapsibleItem'
import HomeIcon from '@material-ui/icons/Home'
import ImageIcon from '@material-ui/icons/Image'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import NavBar from './Navbar.jsx'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	root: {
		height: "100%",
	},
	drawerPaper: {
		padding: 0,
		height: "calc(100% - 64px)",
		overflowY: 'scroll',
	},
	button: {
		margin: theme.spacing.unit,
	}
})

class CartoviewDrawer extends React.Component {
	state = {
		about: false
	}
	handleAboutChange = () => {
		const { about } = this.state
		this.setState({ about: !about })
	}

	render() {
		const {
			classes, className
		} = this.props
		const { about } = this.state
		return (
			<Paper elevation={6} className={classnames(classes.root, className)}>
				<NavBar />
				<Paper className={classes.drawerPaper} elevation={0}>
					<List disablePadding={true}>
						<ListItem button>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItem>
						<CollapsibleListItem open={false} title="Legend" icon={<ImageIcon />}>
							<CartoviewLegends />
						</CollapsibleListItem>
					</List>
				</Paper>
			</Paper>
		)
	}
}

CartoviewDrawer.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string.isRequired,
}
export default withStyles(styles)(CartoviewDrawer)