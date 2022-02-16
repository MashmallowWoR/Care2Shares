import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

// Models
import { CancellationDetails, Reservation, Transaction} from '../models';

// Types
import CancellationDetailsType from './CancellationDetailsType';
import ReservationTypeForThread from './ReservationTypeForThread';
import TransactionType from './TransactionType';

const ThreadItemsType = new ObjectType({
    name: 'ThreadItems',
    fields: {
        id: {
            type: IntType
        },
        threadId: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        sentBy: {
            type: StringType
        },
        content: {
            type: StringType
        },
        type: {
            type: StringType
        },
        startDate: {
            type: StringType
        },
        endDate: {
            type: StringType
        },
        personCapacity: {
            type: IntType
        },
        isRead: {
            type: BooleanType
        },
        createdAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        userBanStatus: {
            type: IntType
        },
        cancelData: {
            type: CancellationDetailsType,
            resolve(threadItems) {
                return CancellationDetails.findOne({ where: { reservationId: threadItems.reservationId } });
            }
        },
        reservation: {
            type: ReservationTypeForThread,
            resolve(threadItems) {
                return Reservation.findOne({ where: { id: threadItems.reservationId } });
            }
        },
        refundStatus: {
            type: TransactionType,
            resolve(threadItems) {
                return Transaction.findOne({
                    where: { reservationId: threadItems.reservationId, paymentType: 'cancellation' },
                    // raw: true
                })
            }
        },
    }
});
export default ThreadItemsType;