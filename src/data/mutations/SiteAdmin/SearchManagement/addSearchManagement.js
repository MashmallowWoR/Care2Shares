//GraphQL
import { GraphQLString as StringType, GraphQLFloat as FloatType } from 'graphql';

// Sequelize models
import { SearchHistory } from '../../../models';
import ManageSearchCommonType from '../../../types/siteadmin/ManageSearchCommonType';

const addSearchManagement = {
	type: ManageSearchCommonType,

	args: {
		lat: { type: FloatType },
		lng: { type: FloatType },
        location: { type: StringType}
	},

	async resolve({ request, responce }, { lat, lng, location}) {
		try {
			if (request.user && request.user.admin) {
                return {
                    status: 500,
                    errorMessage: "try again"
                }
			}
			const insertSearchData = await SearchHistory.create({
				userId: request.user && request.user.id,
				lat: lat,
				lng: lng,
                location: location
			});
			if (insertSearchData) {
				return {
					status: 200
				};
			}
		} catch (err) {
			return {
                status: 400,
				errorMessage: 'Oops something went wrong',err
			};
		}
	}
};
export default addSearchManagement;
