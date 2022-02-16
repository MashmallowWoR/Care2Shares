import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Redux
import { Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';

// Component
import CurrencyConverter from '../../CurrencyConverter';

// Locale
import messages from '../../../locale/messages';

class CancelDetails extends Component {
	static propTypes = {
		userType: PropTypes.string.isRequired,
		formatMessage: PropTypes.any,
		cancelData: PropTypes.shape({
			guestServiceFee: PropTypes.number,
			hostServiceFee: PropTypes.number,
			refundToGuest: PropTypes.number,
			payoutToHost: PropTypes.number,
			total: PropTypes.number,
			currency: PropTypes.string,
		})
	};

	render() {
		const { userType, refundStatus } = this.props;
		const { cancelData: { cancellationPolicy, guestServiceFee, refundToGuest, payoutToHost, currency } } = this.props;
		const { reservationData: { total, hostServiceFee } } = this.props;

		let earnedAmount = 0, missedEarnings = 0, refund = 0, paidRefund, paidCurrency;
		earnedAmount = payoutToHost;
		refund = refundToGuest;
		missedEarnings = (total - hostServiceFee) - earnedAmount

		if (refundStatus && refundStatus.length > 0) {
			paidRefund = refundStatus[0] && refundStatus[0].refundStatus && refundStatus[0].refundStatus.total;
			paidCurrency = refundStatus[0] && refundStatus[0].refundStatus && refundStatus[0].refundStatus.currency;
		}

		return (
			<div className={s.spaceTop8}>
				<h4 className={s.space4}>
					<span><FormattedMessage {...messages.payment} /></span>
				</h4>

				{
					userType === 'host' && earnedAmount > 0 && <Row className={s.textBold}>
						<Col xs={7} sm={7} className={s.textLeft}>
							<span><FormattedMessage {...messages.earnedAmount} /></span>
						</Col>
						<Col xs={5} sm={5} className={s.textRight}>
							<span>
								<CurrencyConverter
									amount={earnedAmount}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					userType === 'host' && missedEarnings > 0 && <Row className={cx(s.textBold, s.spaceTop2)}>
						<Col xs={7} sm={7} className={s.textLeft}>
							<span><FormattedMessage {...messages.missedEarnings} /></span>
						</Col>
						<Col xs={5} sm={5} className={s.textRight}>
							<span>
								<CurrencyConverter
									amount={missedEarnings}
									from={currency}
								/>
							</span>
						</Col>
					</Row>
				}

				{
					userType === 'guest' && refund > 0 && <Row className={cx(s.textBold, s.spaceTop2)}>
						<Col xs={7} sm={7} className={s.textLeft}>
							<span><FormattedMessage {...messages.refundAmount} /></span>
						</Col>
						<Col xs={5} sm={5} className={s.textRight}>
							<span>
								<CurrencyConverter
									amount={refund}
									from={currency}
								/>
							</span><br />
							{paidRefund && paidCurrency && <span>
								<CurrencyConverter
									amount={paidRefund}
									from={paidCurrency}
								/>
							</span>}
						</Col>
					</Row>
				}
			</div>
		);
	}
}

export default withStyles(s)(CancelDetails);