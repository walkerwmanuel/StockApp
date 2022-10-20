const routes = require('express').Router();
const yf = require('yahoo-finance')
const { sub, format } = require('date-fns');
const { quote } = require('yahoo-finance');
const dateFormat = 'yyyy-MM-dd'

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
      modules: [ 'price', 'financialData', 'summaryDetail' , 'recommendationTrend', 'defaultKeyStatistics' ] // see the docs for the full list
  }, function (err, quotes) {
      if (err) {
        return res.status(403).json({ message: 'Failed to get data!' });
      }
      return res.status(200).json({
          message: 'Success!', 
          price: quotes.price, 
          summary: quotes.summaryDetail,
          financials: quotes.financialData,
          recommendation: quotes.recommendationTrend,
          keyStats: quotes.defaultKeyStatistics,
        })
  });
});

routes.get('/api/v1/:ticker/history', (req, res) => {
  const ticker = req.params['ticker']
  if (ticker.length <= 0) {
    return res.status(403).json({ message: 'No ticker specified!' });
  }

  const today = format(new Date(), dateFormat)
  console.log(today)
  const targetDate = format(sub(new Date(), {days: 20}), dateFormat)
  console.log(targetDate)
  
    yf.historical({
      symbol: ticker,
      from: targetDate,
      to: today,
      // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    }, function (err, quotes) {
      //...
      if (err) {
        return res.status(403).json({ message: 'Failed to get data!' });
      }
      let sma20 = 0
      for (let i = 0; i < quotes.length; i++) {
        sma20 += quotes[i].close
      }
      sma20 /= quotes.length
      return res.status(200).json({
        message: 'Success!', 
        data: quotes,
        sma: sma20,
        marketDays: quotes.length
      })
    });
})

module.exports = routes;
