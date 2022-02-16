import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tr, Td, Thead, Th } from 'reactable';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

//graphql
import { graphql, compose } from 'react-apollo';
import manageSearchQuery from './manageSearchQuery.graphql';

// Style
import cx from 'classnames';
import s from './UserSearchManagement.css';
import bt from '../../../components/commonStyle.css';
import CustomPagination from '../../CustomPagination';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';

class UserSearchManagement extends React.Component {
	static propTypes = {
		userSearchManagement: PropTypes.array,
		title: PropTypes.string.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			currentPage: 1
		};
		this.paginationData = this.paginationData.bind(this);
	}
	paginationData(currentPage) {
		const { manageSearchManagement: { refetch } } = this.props;
		let variables = { currentPage };
		this.setState({ currentPage });
		refetch(variables);
	}
	render() {
		const { manageSearchManagement: { getSearchHistory: { results, count } } } = this.props;
		const { currentPage } = this.state;
		const { formatMessage } = this.props.intl;
		return (
			<div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
				<div>
					<h1 className={s.headerTitle}>
						<FormattedMessage {...messages.userSearchManagement} />
					</h1>
					<div className={cx('table-responsive', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
						<Table
							className="table"
							noDataText={formatMessage(messages.noRecordFound)}
							sortable={true}
							defaultSort={{ column: 'Created Date', direction: 'desc' }}
						>
							<Thead>
								<Th scope="col">{formatMessage(messages.searchUserId)}</Th>
								<Th scope="col">{formatMessage(messages.searchUserEmail)}</Th>
								<Th scope="col">{formatMessage(messages.searchUserPhoneNumber)}</Th>
								<Th scope="col">{formatMessage(messages.searchUserLocation)}</Th>
								<Th scope="col">{formatMessage(messages.seachUserStatus)}</Th>
								<Th scope="col">{formatMessage(messages.searchCreatedAt)}</Th>
							</Thead>
							{results &&
								results.length > 0 &&
								results.map((value, key) => {
									return (
										<Tr key={key}>
											<Td
												data-label={formatMessage(messages.searchUserId)}
												column={formatMessage(messages.searchUserId)}
												data={value.id ? value.id : '-'}
												className={s.userVerticalAlign}
											/>
											<Td
												data-label={formatMessage(messages.searchUserEmail)}
												column={formatMessage(messages.searchUserEmail)}
												data={value.email ? value.email : '-'}
												className={s.userVerticalAlign}
											/>
											<Td
												data-label={formatMessage(messages.searchUserPhoneNumber)}
												column={formatMessage(messages.searchUserPhoneNumber)}
												data={value.phoneNumber ? value.phoneNumber : '-'}
												className={s.userVerticalAlign}
											/>
											<Td
												data-label={formatMessage(messages.searchUserLocation)}
												column={formatMessage(messages.searchUserLocation)}
												data={value.location ? value.location : '-'}
												className={s.userVerticalAlign}
											/>
											<Td
												data-label={formatMessage(messages.seachUserStatus)}
												column={formatMessage(messages.seachUserStatus)}
												data={value.firstName ? value.firstName : 'Visitor'}
												className={s.userVerticalAlign}
											/>
											<Td
												data-label={formatMessage(messages.searchCreatedAt)}
												column={formatMessage(messages.searchCreatedAt)}
												data={moment(value.createdAt).format('DD-MM-YYYY HH:mm:ss')}
												className={s.userVerticalAlign}
											/>
										</Tr>
									);
								})}
						</Table>
					</div>
					{results &&
						results.length > 0 && (
							<div>
								<CustomPagination
									total={count}
									currentPage={currentPage}
									defaultCurrent={1}
									defaultPageSize={10}
									change={this.paginationData}
									paginationLabel={formatMessage(messages.usersLabel)}
								/>
							</div>
						)}
				</div>
			</div>
		);
	}
}
export default compose(
	injectIntl,
	withStyles(s, bt),
	graphql(manageSearchQuery, {
		name: 'manageSearchManagement',
		options: {
			variables: {
				currentPage: 1,
				searchList: ''
			},
			fetchPolicy: 'network-only'
		}
	})
)(UserSearchManagement);
