import 'ol/ol.css'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Input, Spinner, Button, Container } from 'reactstrap';
import View from 'ol/view';
import Map from 'ol/map';
import Tile from 'ol/layer/tile'
import OSM from 'ol/source/osm';
import pica from 'pica/dist/pica'

import * as actions from '../../../actions/configWizard/index';


class Bookmarks extends Component {
    state = {
        map: null,
        enableBookmarking: false,
        bookmarkButtonText: 'Add Bookmark'
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
        this.setState({ map: initialMap });
    }

    addBookmark = () => {
        this.state.map.once('postcompose', (event) => {
            const picaResizer = pica();
            let resizedCanvas = document.createElement('canvas')
            resizedCanvas.width = 210
            resizedCanvas.height = 150
            picaResizer.resize(event.context.canvas, resizedCanvas)
                .then(result => picaResizer.toBlob(result, 'image/jpeg', 0.90))
                .then(blob => {
                    let newBookmark = {
                        name: '',
                        description: '',
                        extent: this.state.map.getView().calculateExtent(),
                        projection: this.state.map.getView().getProjection().getCode(),
                        thumbnail: URL.createObjectURL(blob),
                    }
                    this.props.addBookmark(newBookmark);
                });
        });
        this.state.map.renderSync();
    }

    removeBookmark = (index) => {
        this.props.removeBookmark(index);
    }

    onNameChangeHandler = index => event => {
        let editedOne = this.props.bookmarks[index];
        editedOne.name = event.target.value;
        this.props.updateBookmark(editedOne, index);
    }

    onDescriptionChangeHandler = index => event => {
        let editedOne = this.props.bookmarks[index];
        editedOne.description = event.target.value;
        this.props.updateBookmark(editedOne, index);
    }

    render() {
        setTimeout(() => { this.state.map.updateSize() }, 100);
        return (
            <Container>
                <Row>
                    <Col><h3>Bookmarks</h3></Col>
                </Row>
                <Row className="top-buffer">
                    <Col>
                        <div id="map" ref="mapContainer" className="bookmark-map" /><hr />
                        <Row >
                            <Col>
                                <Button color="primary" disabled={!this.state.enableBookmarking}
                                    onClick={this.addBookmark} className="m-1 float-right">
                                    {!this.state.enableBookmarking ? <Spinner color="light" /> : null}{this.state.bookmarkButtonText}</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                {this.props.bookmarks.map((bookmark, index) => {
                                    return <div key={index} >
                                        <div className='bookmark-item'>
                                            <img src={bookmark.thumbnail} className="bookmark-image" alt="Bookmark Thumbnail" />
                                            <div className="bookmar-form-group">
                                                <Input value={bookmark.name} type="text" onChange={this.onNameChangeHandler(index)} id={`name${index}`} placeholder="Name" className='mb-2' />
                                                <Input value={bookmark.description} type="textarea" onChange={this.onDescriptionChangeHandler(index)} id={`description${index}`} placeholder="Description" />
                                            </div>
                                            <Button color="danger" onClick={() => this.removeBookmark(index)}>Remove</Button>
                                        </div><hr />
                                    </div>
                                })}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        mapCenter: state.appInstance.map_center,
        mapZoom: state.appInstance.map_zoom,
        bookmarks: state.appInstance.bookmarks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBookmark: (bookmark) => dispatch(actions.addBookmark(bookmark)),
        updateBookmark: (bookmark, index) => dispatch(actions.updateBookmark(bookmark, index)),
        removeBookmark: (index) => dispatch(actions.removeBookmark(index)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);