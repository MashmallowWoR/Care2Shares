import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManageSearch.css';

// Query
import manageSearchQuery from './manageSearchQuery.graphql';

// Component
import UserSearchManagement from '../../../components/siteadmin/UserSearchManagement/UserSearchManagement';
import Loader from '../../../components/Loader';

class ManageSearch extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    userManagement: PropTypes.shape({
      loading: PropTypes.bool,
      manageSearchManagement: PropTypes.array,
    })
  };

  static defaultProps = {
    userManagement: {
      loading: true
    }
  };
  render () {
    const { manageSearchManagement:{ loading }} = this.props;
    if(loading){
      return <Loader type={"text"} />;
    } else {
      return <UserSearchManagement />;
    }
  }

}

export default compose(
    withStyles(s),
    // graphql(manageSearchQuery),
    graphql(manageSearchQuery, {
      name: 'manageSearchManagement',
      options: {
          variables:{
            currentPage: 1,
            searchList: ''
          },
        fetchPolicy: 'network-only'
      }
    }),
)(ManageSearch);