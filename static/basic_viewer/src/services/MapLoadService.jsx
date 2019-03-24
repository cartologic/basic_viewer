import Attribution from 'ol/attribution'
import Base from 'ol/layer/base'
import BingMaps from 'ol/source/bingmaps'
import CartoDB from 'ol/source/cartodb'
import Cluster from 'ol/source/cluster'
import FeaturesHelper from 'cartoview-sdk/helpers/FeaturesHelper'
import GeoJSON from 'ol/format/geojson'
import Group from 'ol/layer/group'
import Heatmap from 'ol/layer/heatmap'
import Image from 'ol/layer/image'
import ImageArcGISRest from 'ol/source/imagearcgisrest'
import ImageCanvas from 'ol/source/imagecanvas'
import ImageMapGuide from 'ol/source/imagemapguide'
import ImageStatic from 'ol/source/imagestatic'
import ImageVector from 'ol/source/imagevector'
import ImageWMS from 'ol/source/imagewms'
import Layer from 'ol/layer/layer'
import OSM from 'ol/source/osm'
import Raster from 'ol/source/raster'
import Source from 'ol/source/source'
import { default as SourceImage } from 'ol/source/image'
import { default as SourceTile } from 'ol/source/tile'
import { default as SourceVector } from 'ol/source/vector'
import { default as SourceVectorTile } from 'ol/source/vectortile'
import Stamen from 'ol/source/stamen'
import StyleHelper from 'cartoview-sdk/helpers/StyleHelper'
import Tile from 'ol/layer/tile'
import TileArcGISRest from 'ol/source/tilearcgisrest'
import TileDebug from 'ol/source/tiledebug'
import TileImage from 'ol/source/tileimage'
import TileJSON from 'ol/source/tilejson'
import TileUTFGrid from 'ol/source/tileutfgrid'
import TileWMS from 'ol/source/tilewms'
import Vector from 'ol/layer/vector'
import VectorTile from 'ol/layer/vectortile'
import View from 'ol/view'
import WMTS from 'ol/source/wmts'
import XYZ from 'ol/source/xyz'
import Zoomify from 'ol/source/zoomify'
import axios from 'axios'
import { getCRSFToken } from '../api/utils'
import loadingstrategy from 'ol/loadingstrategy';
import { default as olProj } from 'ol/proj'
export let sourceMapping = {
	'BingMaps': BingMaps,
	'CartoDB': CartoDB,
	'Cluster': Cluster,
	'Image': SourceImage,
	'ImageArcGISRest': ImageArcGISRest,
	'ImageCanvas': ImageCanvas,
	'ImageMapGuide': ImageMapGuide,
	'ImageStatic': ImageStatic,
	'ImageVector': ImageVector,
	'ImageWMS': ImageWMS,
	'Stamen': Stamen,
	'Raster': Raster,
	'Source': Source,
	'Tile': SourceTile,
	'TileArcGISRest': TileArcGISRest,
	'TileDebug': TileDebug,
	'TileImage': TileImage,
	'TileJSON': TileJSON,
	'TileUTFGrid': TileUTFGrid,
	'TileWMS': TileWMS,
	'Zoomify': Zoomify,
	'SourceVectorTile': SourceVectorTile,
	'WMTS': WMTS,
	'OSM': OSM,
	'XYZ': XYZ,
	'Vector': SourceVector,

}
let layersMaping = {
	'Tile': Tile,
	'Group': Group,
	'Base': Base,
	'Heatmap': Heatmap,
	'Image': Image,
	'Layer': Layer,
	'Vector': Vector,
	'VectorTile': VectorTile

}
class MapConfigService {
	constructor(map, mapJson) {
		this.map = map
		this.config = mapJson
		this.styleHelper = new StyleHelper()
	}
	getLayerClass(layerType) {
		let t = 'Tile'
		switch (layerType) {
			case 'wms':
				t = 'Tile'
				break;
			case 'wfs':
				t = 'Vector'
				break;

			default:
				break;
		}
		return layersMaping[t]
	}
	getSourceClass(layerType) {
		let t = 'Tile'
		switch (layerType) {
			case 'wms':
				t = 'TileWMS'
				break;
			case 'wfs':
				t = 'Vector'
				break;

			default:
				break;
		}
		return sourceMapping[t]
	}
	getSource(layerJson) {
		let s = undefined
		const serverURL = layerJson.server_url
		const layerName = layerJson.name
		const serverProxy = layerJson.server_proxy
		const serverType = layerJson.server_type.toLowerCase()
		const layer_type = layerJson.layer_type
		const sourceClass = this.getSourceClass(layer_type)
		if (sourceClass === TileWMS) {
			let params = {
				params: { TILED: 'TRUE', serverType, 'LAYERS': [layerName,] },
				url: `${serverURL}`,
				tileLoadFunction: (tile, src) => {
					const url = `${serverProxy}${encodeURIComponent(src)}`
					tile.getImage().src = url
				}
			}
			s = new sourceClass(params)
		} else if (sourceClass === SourceVector) {
			let source = new sourceClass(
				{
					format: new GeoJSON(),
					loader: (extent, resolution, projection) => {
						var proj = projection.getCode()
						var uri = `${serverURL}?service=wfs&version=2.0.0&request=GetFeature&typeNames=${layerName}&srsName=${proj}&bbox=${extent.join(',')}&outputFormat=application/json`
						var url = `${serverProxy}${encodeURIComponent(uri)}`
						var onError = () => {
							source.removeLoadedExtent(extent)
						}
						axios.get(url, {
							headers: { "X-CSRFToken": getCRSFToken() },
						}).then(response => {
							source.addFeatures(
								source.getFormat().readFeatures(response.data))
						}).catch(error => {
							console.error(error)
							onError()
						})
					},
					strategy: loadingstrategy.bbox
				}
			)
			s = source
		}
		return s
	}
	generateLayerFromConfig(layerJson) {
		const layer_type = layerJson.layer_type
		const LayerClass = this.getLayerClass(layer_type)
		const serverURL = layerJson.server_url
		const serverProxy = layerJson.server_proxy
		const serverOperations = layerJson.server_operations
		let layerMetadata = {
			'name': layerJson.name,
			'title': layerJson.title,
			'server_url': serverURL,
			'server_proxy': serverProxy,
			"server_operations": serverOperations,
			'layer_type': layer_type,
			'bbox': layerJson.bounding_box,
			'projection': layerJson.projection,

		}
		let layer = new LayerClass({
			source: this.getSource(layerJson)
		})
		if (layer_type == 'wfs') {
			layer.setStyle(this.styleHelper.styleFunction)
		}
		layer.set('metadata', layerMetadata)

		return layer

	}
	load(callback = () => { }) {

		var viewConfig = this.config.view
		const viewProj = viewConfig.projection
		const projCode = viewProj.split(':').pop()
		FeaturesHelper.getCRS(projCode).then(newCRS => {
			var layerConfig = this.config.layers
			var remove = []
			let map = this.map
			map.getLayers().forEach((lyr) => {
				const metadata = lyr.get('metadata')
				if (metadata && metadata['title'] !== null) {
					remove.push(lyr)
				}
			})
			var i, ii
			for (i = 0, ii = remove.length; i < ii; ++i) {
				map.removeLayer(remove[i])
			}
			for (i = 0, ii = layerConfig.length; i < ii; ++i) {
				var layer = this.generateLayerFromConfig(layerConfig[i])
				if (layer) {
					map.addLayer(layer)
				}

			}

			var view = map.getView(),
				proj = olProj.get(viewConfig.projection);
			if (proj && !olProj.equivalent(view.getProjection(), proj)) {
				map.setView(new View(viewConfig))
			} else {
				view.setCenter(viewConfig.center)
				if (viewConfig.resolution !== undefined) {
					view.setResolution(viewConfig.resolution);
				} else if (viewConfig.zoom !== undefined) {
					view.setZoom(viewConfig.zoom);
				}
				if (viewConfig.rotation !== undefined) {
					view.setRotation(viewConfig.rotation)
				}
			}
			callback()
		})

	}
}
export default MapConfigService