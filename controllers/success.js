const paypal = require('paypal-rest-sdk');

module.exports = (req, res) => {
  const { PayerID, paymentId } = req.query;

  const config = {
    'payer_id': PayerID,
    'transactions': [
      {
        'amount': {
          'currency': 'USD',
          'total': '100',
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, config, (e, payment) => {
    if (e) {
      res.status(500).json(e);
    } else {
      res.json(payment);
    }
  });
};
