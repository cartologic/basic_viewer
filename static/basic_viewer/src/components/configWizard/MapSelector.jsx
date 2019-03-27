import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import ReactPaginate from 'react-paginate';

import { getMaps } from '../../api';
import MapCard from './MapCard';

const MAPS_LIMIT = 4;

class MapSelector extends Component {

    state = {
        loading: false,
        mapsOffset: 0,
        totalMapsCount: 0,
        maps: []
    };

    componentWillMount() {
        this.getMapsFromApi();
    }

    getMapsFromApi() {
        this.setState({ loading: true });
        getMaps(this.state.mapsOffset, MAPS_LIMIT).then(response => {
            console.log(response);
            this.setState({
                loading: false,
                maps: response.data.results,
                totalMapsCount: response.data.count
            });
        });
    }

    handlePageClick = data => {
        let offset = Math.ceil(data.selected * MAPS_LIMIT);
        this.setState({ mapsOffset: offset }, () => {
            this.getMapsFromApi();
        });
    }

    render() {
        return (
            <React.Fragment>
                <Col>
                    {this.state.loading ? <div>Loading...</div> :
                        this.state.maps.map((map) =>
                            <MapCard key={map.id} map={map} />)}

                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.totalMapsCount / MAPS_LIMIT}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </Col>
            </React.Fragment >
        );
    }
}

export default MapSelector;