const paypal = require('paypal-rest-sdk');

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

paypal.configure({
  'mode': 'sandbox', // sandbox or live
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
      'return_url': `${req.protocol}://${req.get('host')}/success`,
      'cancel_url': `${req.protocol}://${req.get('host')}/failed`,
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

  console.log(`${req.protocol}://${req.get('host')}/success`);

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.status(500).json(error);
    } else {
      const approval = payment.links.find(link => link.rel === 'approval_url');

      console.log(approval);

      res.redirect(approval.href);
    }
  });
};
