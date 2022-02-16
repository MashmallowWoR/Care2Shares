import {
	GraphQLObjectType as ObjectType,
	GraphQLID as ID,
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLFloat as FloatType
} from 'graphql';
import { UserProfile, User } from '../../models';

const ManageSearchType = new ObjectType({
	name: 'ManageSearch',
	fields: {
		id: { type: IntType },
		userId: { type: StringType },
		lat: { type: FloatType },
		lng: { type: FloatType },
		location: { type: StringType },
		phoneNumber: {
			type: StringType,
			async resolve({ userId }) {
				const userPhoneNumber = await UserProfile.findOne({
					where: {
						userId: userId
					},
					attributes: ['phoneNumber'],
					raw: true
				});
				return userPhoneNumber && userPhoneNumber.phoneNumber;
			}
		},
		email: {
			type: StringType,
			async resolve({ userId }) {
				const userEmailId = await User.findOne({
					where: {
						id: userId
					},
					attributes: ['email'],
					raw: true
				});
				return userEmailId && userEmailId.email;
			}
		},
		firstName: {
			type: StringType,
			async resolve({ userId }) {
				const userProfile = await UserProfile.findOne({
					where: {
						userId
					},
					attributes: ['firstName'],
					raw: true
				});
				return userProfile && userProfile.firstName;
			}
		},
		createdAt: { type: StringType }
	}
});
export default ManageSearchType;
