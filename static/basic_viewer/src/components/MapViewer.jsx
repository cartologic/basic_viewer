import { BasicViewerContext } from '../context'
import MapConfigService from '../services/MapLoadService'
import PropTypes from 'prop-types'
import React from 'react'
import TileLayer from 'ol/layer/tile'
import TileWMS from 'ol/source/tilewms'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
const styles = theme => ({

})
class MapViewer extends React.PureComponent {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		const { map } = this.context
		map.setTarget(this.mapDiv)
	}
	componentDidUpdate(prevProps, prevState) {
		const { width, reduxMap } = this.props
		const { map } = this.context
		if (prevProps.width !== width) {
			map.updateSize()
		}
		if (prevProps.reduxMap != reduxMap) {
			let service = new MapConfigService(map, reduxMap)
			service.load()
		}
	}
	render() {
		return <div id="map" ref={(mapDiv) => this.mapDiv = mapDiv} className="map-panel"></div>
	}
}
MapViewer.contextType = BasicViewerContext
MapViewer.propTypes = {
	classes: PropTypes.object.isRequired,
	width: PropTypes.any.isRequired,
	reduxMap: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
	return {
		reduxMap: state.map,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {}
}

const App = connect(mapStateToProps, mapDispatchToProps)(MapViewer)
export default compose(withStyles(styles), withWidth())(App)