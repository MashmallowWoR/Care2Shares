// Redux Actions
import { payoutHost } from '../../../../actions/Reservation/payoutHost';
import { refundGuest } from '../../../../actions/Reservation/refundGuest';
import { closeReservationModal } from '../../../../actions/Reservation/payoutModal';

// Toaster
import { toastr } from 'react-redux-toastr';

//helper
import { convert } from '../../../../helpers/currencyConvertion';


async function submit(values, dispatch) {
	let paymentCurrency = values.paymentMethodId == 1 ? values.paymentCurrency : null;

	if (values.type === 'host') {
		paymentCurrency = values.paymentMethodId == 2 ? values.payoutCurrency : paymentCurrency;
		dispatch(
			payoutHost(
				values.reservationId,
				values.receiverEmail,
				values.payoutId,
				values.amount,
				values.currency,
				paymentCurrency,
				values.hostId,
				values.paymentMethodId,
				values.hostEmail
			)
		);
		dispatch(closeReservationModal());
	}
	if (values.type === 'guest') {
		let refundAmount = values.refundAmount, fromCurrency = values.toCurrency || values.base;
		if (fromCurrency != values.currency) refundAmount = convert(values.base, values.rates, values.refundAmount, fromCurrency, values.currency);
		refundAmount = parseFloat(refundAmount).toFixed(2);
		if (refundAmount > values.originalAmount) return toastr.error("Error", " Refund amount entered is greater than the guest payment amount!")
		dispatch(
			refundGuest(
				values.reservationId,
				values.receiverEmail,
				values.receiverId,
				values.payerEmail,
				values.payerId,
				refundAmount,
				values.currency,
				paymentCurrency,
				values.paymentMethodId,
				values.transactionId,
			)
		);
		dispatch(closeReservationModal());
	}
}

export default submit;
