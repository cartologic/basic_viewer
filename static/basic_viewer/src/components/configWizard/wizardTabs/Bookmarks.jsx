import 'ol/ol.css'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Input, Spinner, Button } from 'reactstrap';
import View from 'ol/view';
import Map from 'ol/map';
import Tile from 'ol/layer/tile'
import OSM from 'ol/source/osm';

import * as actions from '../../../actions/configWizard/index';


class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            bookmarks: [],
            enableBookmarking: false,
            bookmarkButtonText: 'Add Bookmark'
        }
    }

    getInitialMap = () => {
        let source = new OSM();
        let tilesLoading = 0, tilesLoaded = 0;
        source.on('tileloadstart', () => {
            this.setState({ enableBookmarking: false, bookmarkButtonText: '' });
            tilesLoading++;
        });

        source.on('tileloadend', () => {
            tilesLoaded++;
            if (tilesLoading === tilesLoaded) {
                tilesLoading = 0;
                tilesLoaded = 0;
                this.setState({ enableBookmarking: true, bookmarkButtonText: 'Add Bookmark' });
            }
        });

        return new Map({
            target: this.refs.mapContainer,
            layers: [
                new Tile({
                    title: 'OpenStreetMap',
                    source: source
                })
            ],
            view: new View({
                center: this.props.mapCenter,
                zoom: this.props.mapZoom
            })
        })
    }

    componentDidMount() {
        let initialMap = this.getInitialMap();
        this.setState({ map: initialMap, bookmarks: this.props.bookmarks });
    }

    addBookmark = () => {
        let newBookmarks = [... this.state.bookmarks];
        this.state.map.once('postcompose', (event) => {
            let newBookmark = {
                name: '',
                thumbnailDataURL: event.context.canvas.toDataURL(),
                extent: this.state.map.getView().calculateExtent().join('/')
            }
            this.props.addBookmark(newBookmark);

            newBookmarks.push(newBookmark);
            this.setState({
                bookmarks: newBookmarks
            });
        });
        this.state.map.renderSync();
    }

    removeBookmark = (index) => {
        let newBookmarks = [...this.state.bookmarks]
        newBookmarks.splice(index, 1)
        this.setState({ bookmarks: newBookmarks })
    }

    render() {
        setTimeout(() => { this.state.map.updateSize() }, 100);
        return (
            <Col>
                <div id="map" ref="mapContainer" className="bookmark-map" /><hr />
                <Row >
                    <Col>
                        <Button color="primary" disabled={!this.state.enableBookmarking} onClick={this.addBookmark} className="m-1 float-right">
                            {!this.state.enableBookmarking ? <Spinner color="light" /> : null}{this.state.bookmarkButtonText}</Button>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        {this.state.bookmarks.reverse().map((bookmark, index) => {
                            return <div key={index} >
                                <div className='bookmark-item'>
                                    <img src={bookmark.thumbnailDataURL} className="bookmark-image" alt="Bookmark Thumbnail" />
                                    <div className="bookmar-form-group">
                                        <Input type="text" value={bookmark.name} id={`name${index}`} placeholder="Name" className='mb-2' />
                                        <Input type="textarea" value={bookmark.description} id={`description${index}`} placeholder="Description" />
                                    </div>
                                    <Button color="danger" onClick={() => this.removeBookmark(index)}>Remove</Button>
                                </div><hr />
                            </div>
                        })}
                    </Col>
                </Row>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        mapCenter: state.appInstance.map_center,
        mapZoom: state.appInstance.map_zoom,
        bookmarks: state.appInstance.config.bookmarks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBookmark: (bookmark) => dispatch(actions.addBookmark(bookmark)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);