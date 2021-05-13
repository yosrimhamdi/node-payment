const paypal = require('paypal-rest-sdk');

module.exports = (req, res) => {
  const execute_payment_json = {
    'payer_id': req.query.PayerID,
    'transactions': [
      {
        'amount': {
          'currency': 'USD',
          'total': '500',
        },
      },
    ],
  };

  paypal.payment.execute(
    req.query.paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        throw error;
      } else {
        console.log(payment);
        res.send('Success');
      }
    },
  );
};
