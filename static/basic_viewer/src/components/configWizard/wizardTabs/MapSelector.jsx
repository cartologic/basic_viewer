import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, InputGroup, Spinner, Input, FormGroup, CustomInput, Label } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import SearchIcon from '@material-ui/icons/Search';

import { getMaps, getMapsByTitle } from '../../../api';
import MapCard from './MapCard';
import * as actions from '../../../actions/configWizard/index';


const MAPS_LIMIT = 2;

class MapSelector extends Component {

    state = {
        mapsOffset: 0,
        totalMapsCount: 0,
        loading: false,
        searchingMode: false,
        serchingText: null,
        maps: [],
        showOnlyUserMaps: true
    };

    componentWillMount() {
        this.getMapsFromApi();
    }

    getMapsFromApi() {
        this.setState({ loading: true });
        if (this.props.isAnyMapSelected)
            this.props.resetSelectedMap();
        getMaps(this.state.mapsOffset, MAPS_LIMIT).then(response => {
            this.setState({
                loading: false,
                maps: response.data.results,
                totalMapsCount: response.data.count
            });
        });
    }

    getMapsByTitleFromApi(title) {
        this.setState({ loading: true });
        if (this.props.isAnyMapSelected)
            this.props.resetSelectedMap();
        getMapsByTitle(this.state.mapsOffset, MAPS_LIMIT, title).then(response => {
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
            if (this.state.searchingMode)
                this.getMapsByTitleFromApi(this.state.searchingText);
            else
                this.getMapsFromApi();
        });
    }

    searchByTitle = (event) => {
        const titleText = event.target.value;
        if (titleText !== "") {
            this.setState({
                searchingMode: true,
                searchingText: titleText
            }, () => {
                this.getMapsByTitleFromApi(titleText)
            });
        } else {
            this.setState({ searchingMode: false }, () => {
                this.getMapsFromApi()
            });
        }
    }

    mapsOwnerRadioChange = () => {
        // this.setState((prevState) => ({ showOnlyUserMaps: !prevState.showOnlyUserMaps }), this.getMapsFromApi());
    }

    render() {
        return (
            <React.Fragment>
                <Col>
                    <InputGroup className="mb-4">
                        <span className="input-group-addon-icon"><SearchIcon /></span>
                        <Input onChange={this.searchByTitle} placeholder="search by title" />
                    </InputGroup>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CustomInput label="My Maps" checked={this.state.showOnlyUserMaps}
                            onChange={this.mapsOwnerRadioChange} name="radio" type="radio" id="myMapsRadio" className="mr-3" />
                        <CustomInput label="All Maps" checked={!this.state.showOnlyUserMaps}
                            onChange={this.mapsOwnerRadioChange} name="radio" type="radio" id="allMapsRadio" />
                    </div>

                    {this.state.loading ? <center><Spinner /></center> :
                        this.state.maps.length > 0 ?
                            this.state.maps.map((map) =>
                                <MapCard key={map.id} map={map} />) :
                            <strong><h3 style={{ textAlign: "center" }}>No Maps Found</h3></strong>}

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
const mapStateToProps = state => {
    return {
        isAnyMapSelected: state.appInstance.app_map != null,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetSelectedMap: () => dispatch(actions.resetSelectedMap()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MapSelector);