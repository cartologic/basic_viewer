import { addError } from '../actions/errors'
import axios from 'axios'
import { getCRSFToken } from './utils'
import { setAppSettingsAction } from '../actions/app'
import { setWebMapAction } from '../actions/map'
const apiInstance = axios.create({
    baseURL: `${window.location.origin}/api/`,
    timeout: 1000,
    headers: { "X-CSRFToken": getCRSFToken() }
})
export function mapJsonSerializer(mapJson) {
    const map = {
        name: mapJson.title,
        layers: mapJson.layers,
        view: {
            center: mapJson.center,
            constrainRotation: mapJson.constrain_rotation,
            rotation: mapJson.rotation | 0,
            enableRotation: mapJson.enable_rotation,
            extent: mapJson.bounding_box.length > 0 ? mapJson.bounding_box : undefined,
            maxZoom: mapJson.max_zoom,
            minZoom: mapJson.min_zoom,
            projection: mapJson.projection,
            zoomFactor: mapJson.zoom_factor,
            zoom: mapJson.zoom
        },
        renderOptions: mapJson.render_options,
        loadTilesWhileAnimating: false,
        loadTilesWhileInteracting: false,
        moveTolerance: 1,
    }
    return map
}
export function fetchAppSettings(id) {
    return (dispatch) => {
        return apiInstance.get(`appinstance/${id}`).then(response => {
            const data = response.data
            dispatch(setAppSettingsAction({
                ...data.config,
                title: data.title,
                description: data.description
            }))
            axios.get(data.map_url, {
                headers: { "X-CSRFToken": getCRSFToken() }
            }).then(response => {
                dispatch(setWebMapAction(
                    mapJsonSerializer(response.data)
                ))
            })
        }).catch(error => {
            dispatch(addError(error.message))
        })
    }
}

export function getMaps(offset, limit) {
    return apiInstance.get(`maps/?offset=${offset}&limit=${limit}`);
}
