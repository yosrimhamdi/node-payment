const paypal = require('paypal-rest-sdk');

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': PAYPAL_CLIENT_ID,
  'client_secret': PAYPAL_CLIENT_SECRET,
});

module.exports = async (req, res) => {
  var create_payment_json = {
    'intent': 'sale',
    'payer': {
      'payment_method': 'paypal',
    },
    'redirect_urls': {
      'return_url': 'http://localhost:3000/success',
      'cancel_url': 'http://localhost:3000/failed',
    },
    'transactions': [
      {
        'item_list': {
          'items': [
            {
              'name': 'disque dur externe', // can come from the form(bodt) or database
              'sku': 'disque dur externe',
              'price': '500',
              'currency': 'USD',
              'quantity': 1,
            },
          ],
        },
        'amount': {
          'currency': 'USD',
          'total': '500',
        },
        'description': 'This is the payment description.',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.send('error');
      throw error;
    } else {
      console.log(payment);

      res.redirect(payment.links[1].href);
    }
  });
};
