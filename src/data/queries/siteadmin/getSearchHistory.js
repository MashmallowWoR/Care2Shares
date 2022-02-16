import { GraphQLInt as IntType, GraphQLString as StringType } from 'graphql';
// Sequelize models
import { SearchHistory } from '../../models';
import ManageSearchCommonType from '../../types/siteadmin/ManageSearchCommonType';

const getSearchHistory = {
	type: ManageSearchCommonType,
	args: {
		currentPage: { type: IntType },
		searchList: { type: StringType }
	},
	async resolve({ request }, { currentPage }) {
		try {
			if (!request.user || !request.user.admin) {
				return {
					status: 500,
					errorMessage: 'Oops! Please login with your account and continue.'
				};
			}

			let limit = 10,offset = 0;

			if (currentPage) offset = (currentPage - 1) * limit;
			const results = await SearchHistory.findAll({
				limit,
				offset,
				order: [['id', 'DESC']]
			});
			const count = await SearchHistory.count({});

			return {
				status: results ? 200 : 400,
				results,
				count,
				errorMessage: results ? null : 'Oops something went wrong'
			};
		} catch (error) {
			return {
				status: 400,
				errorMessage: 'Oops something went wrong' + error
			};
		}
	}
};

export default getSearchHistory;
