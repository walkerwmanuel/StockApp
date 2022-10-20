const routes = require('express').Router();
const yf = require('yahoo-finance')

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello!' });
});

routes.get('/api/v1/:ticker', (req, res) => {
  const ticker = req.params['ticker']
  if (ticker.length <= 0) {
    return res.status(403).json({ message: 'No ticker specified!' });
  }
  yf.quote({
      symbol: ticker,
      modules: [ 'price' ] // see the docs for the full list
  }, function (err, quotes) {
      if (err) {
        return res.status(403).json({ message: 'Failed to get data!' });
      }
      return res.status(200).json({message: 'Success!', data: quotes.price})
  });
})

module.exports = routes;
