import LayersHelper from 'cartoview-sdk/helpers/LayersHelper'
import { resolveURL } from './utils'
class LegendService {
	getLegendURL(layer) {
		let serverProxy = layer.get('server_proxy')
		let wmsURL = this.getLayerURL(layer)
		let query = {
			'REQUEST': 'GetLegendGraphic',
			'VERSION': '1.0.0',
			'FORMAT': 'image/png',
			"LAYER": layer.getProperties().name
		}
		wmsURL = new URL('', wmsURL)
		const keys = Object.keys(query)
		for (let index = 0; index < keys.length; index++) {
			const key = keys[index]
			const value = query[key]
			wmsURL.searchParams.append(key, value)

		}
		wmsURL = wmsURL.href
		if (serverProxy) {
			wmsURL = `${serverProxy}${encodeURIComponent(wmsURL)}`
		}
		return wmsURL
	}
	getLayerURL(layer) {
		const source = layer.getSource()
		var wmsURL = null
		try {
			wmsURL = source.getUrls()[0]
		} catch (err) {
			wmsURL = source.getUrl()
		}
		wmsURL = resolveURL(wmsURL)
		return wmsURL
	}
	getLegends() {
		const wmsLayers = LayersHelper.getLayers(map.getLayers().getArray()).reverse()
		let legends = []
		for (let index = 0; index < wmsLayers.length; index++) {
			const lyr = wmsLayers[index]
			if (lyr.getVisible()) {
				let legend = {
					layer: lyr.get('name'),
					url: this.getLegendURL(lyr)
				}
				legends.push(legend)
			}
		}
		return legends
	}
}
export default new LegendService()