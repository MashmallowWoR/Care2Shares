import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Google Places Suggest Component
import ReactGoogleMapLoader from "react-google-maps-loader";
import Geosuggest from 'react-geosuggest';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';

// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';

// Constants
import { googleMapAPI } from '../../../config';



class PlaceGeoSuggest extends Component {

    static propTypes = {
        label: PropTypes.string,
        className: PropTypes.string,
        containerClassName: PropTypes.string,
        setPersonalizedValues: PropTypes.any,
        googleMaps: PropTypes.object,
        personalized: PropTypes.shape({
            location: PropTypes.string,
            lat: PropTypes.number,
            lng: PropTypes.number,
            geography: PropTypes.string
        })
    };

    static defaultProps = {
        personalized: {
            location: null
        }
    }

    constructor(props) {
        super(props);
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.searchHistory = this.searchHistory.bind(this);
    }

    async searchHistory(variables) {
		try {
			const query = `mutation ($lat:Float,$lng:Float,$location:String)
        {
          addSearchManagement(lat:$lat,lng:$lng,location:$location)
          {
            status
          }
        }`;
			const resp = await fetch('/graphql', {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: query,
					variables
				}),
				credentials: 'include'
			});
		} catch (error) {
			console.log(error);
		}
	}

    onSuggestSelect(data) {
        const { setPersonalizedValues ,layout} = this.props;
        let locationData = {};
        if (data && data.gmaps) {
            data.gmaps.address_components.map((item, key) => {
                if (item.types[0] == "administrative_area_level_1") {
                    locationData["administrative_area_level_1_short"] = item.short_name;
                    locationData["administrative_area_level_1_long"] = item.long_name;
                } else if (item.types[0] == "country") {
                    locationData[item.types[0]] = item.short_name;
                } else {
                    locationData[item.types[0]] = item.long_name;
                }
            });
            setPersonalizedValues({ name: 'geography', value: JSON.stringify(locationData) });
            setPersonalizedValues({ name: 'location', value: data.label });
            setPersonalizedValues({ name: 'lat', value: data.location.lat });
            setPersonalizedValues({ name: 'lng', value: data.location.lng });
            setPersonalizedValues({ name: 'chosen', value: 1 });
        }
        if (data.location.lat && data.location.lng && data.label && layout != '3') {
			const variables = {
				lat: data.location.lat,
				lng: data.location.lng,
				location: data.label
			};
			this.searchHistory(variables);
		}
    }

    onChange(value) {
        const { setPersonalizedValues } = this.props;
        setPersonalizedValues({ name: 'location', value });
        setPersonalizedValues({ name: 'chosen', value: null });
        setPersonalizedValues({ name: 'geography', value: null });
        
    }

    render() {
        const { label, className, containerClassName, personalized } = this.props;
        
        return (
            <div>
                <ReactGoogleMapLoader
                    params={{
                        key: googleMapAPI, // Define your api key here
                        libraries: "places", // To request multiple libraries, separate them with a comma
                    }}
                    render={googleMaps =>
                        googleMaps && (
                            <Geosuggest
                                ref={el => this._geoSuggest = el}
                                placeholder={label}
                                inputClassName={className}
                                className={containerClassName}
                                initialValue={personalized.location}
                                onChange={this.onChange}
                                onSuggestSelect={this.onSuggestSelect}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') e.preventDefault();
                                  }
                                }
                                autoComplete={'off'}
                            />
                        )}
                />
            </div>
        )
    }
}

const mapState = (state) => ({
    personalized: state.personalized
});

const mapDispatch = {
    setPersonalizedValues
};

export default withStyles(s)(connect(mapState, mapDispatch)(PlaceGeoSuggest));