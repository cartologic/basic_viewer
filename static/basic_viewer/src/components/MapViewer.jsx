import { BasicViewerContext } from '../context'
import LegendService from '../services/Legend'
import MapConfigService from '../services/MapLoadService'
import PropTypes from 'prop-types'
import React from 'react'
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
		if (prevProps.reduxMap !== reduxMap) {
			let service = new MapConfigService(map, reduxMap)
			service.load(() => {
				const { setStateKey } = this.context
				setStateKey('mapLoading', false, () => {
					const legends = LegendService.getLegends(map)
					setStateKey('legends', legends)
					let layers = map.getLayers().getArray()
					layers = [...layers].reverse().filter(layer => {
						const metadata = layer.get('metadata')
						if (metadata && metadata['name'] !== undefined) {
							return true
						}
						return false
					})
					setStateKey('mapLayers', layers)
				})
			})
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