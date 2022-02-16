import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List,
} from 'graphql';

import ManageSearchType from './ManageSearchType'

const ManageSearchCommonType = new ObjectType({
    name: 'manageSearchCommonType',
    fields:{
        status: { type: IntType},
        errorMessage: { type: StringType },
        count: { type: IntType },
        result: { type: ManageSearchType },
        results: { type:new List(ManageSearchType)}
    }
});

export default ManageSearchCommonType