import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (values.paymentMethodId == 1 && !values.paymentCurrency) {
    errors.paymentCurrency = messages.pleaseChooseCurreny;
  }

  if (values.refundAmount != null) {
    if (isNaN(values.refundAmount) || (!/^[0-9\.]+$/.test(values.refundAmount)) || values.refundAmount < 1) {
      errors.refundAmount = messages.guestRefund;
    }
  }

  return errors
}

export default validate;