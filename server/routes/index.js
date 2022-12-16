const routes = require("express").Router();
const yf = require("yahoo-finance");
const { sub, format, add } = require("date-fns");
const { quote } = require("yahoo-finance");
const dateFormat = "yyyy-MM-dd";

routes.get(
  "/api/v1/:ticker/msma/:startingDate/:endingDate/:num",
  (req, res) => {
    const reqStartDate = req.params["startingDate"];

    const startingDate = format(new Date(reqStartDate), dateFormat);
    const reqEndDate = req.params["endingDate"];
    const endingDate = format(new Date(reqEndDate), dateFormat);

    let num = req.params["num"];
    if (num.length <= 0) {
      num = 20;
    } else {
      num = Number(num);
    }

    const ticker = req.params["ticker"];
    if (ticker.length <= 0) {
      return res.status(403).json({ message: "No ticker specified!" });
    }

    // Will need to convert date "xxxx-xx-xx" to a numeric value.
    // The "getTime()" method does this by converting to number of milliseconds from midnight of January 1, 1970 (EcmaScript epoch) to the specified date.

    // let emcastartingDate = getTime(startingDate) / 86400000;
    // let emcaendingDate = getTime(endingDate) / 86400000;
    //Dividing by this number converts miliseconds to days
    for (
      let d = startingDate;
      d !== endingDate;
      d = format(
        add(new Date(d), {
          days: 2,
        }),
        dateFormat
      )
    ) {
      console.log(d);
      findSmaOfDay(
        d,
        ticker,
        num,
        () => res.status(403).json({ message: "Failed to get sma" }),
        (result) => console.log("sma on day", d, result)
      );
    }
    res.status(200).json({
      message: "Success!",
      marketDays: num,
    });
  }
);

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Hello!" });
});

routes.get("/api/v1/:ticker", (req, res) => {
  const ticker = req.params["ticker"];
  if (ticker.length <= 0) {
    return res.status(403).json({ message: "No ticker specified!" });
  }

  yf.quote(
    {
      symbol: ticker,
      modules: [
        "price",
        "financialData",
        "summaryDetail",
        "recommendationTrend",
        "defaultKeyStatistics",
      ], // see the docs for the full list
    },
    function (err, quotes) {
      if (err) {
        return res.status(403).json({ message: "Failed to get data!" });
      }
      return res.status(200).json({
        message: "Success!",
        price: quotes.price,
        summary: quotes.summaryDetail,
        financials: quotes.financialData,
        recommendation: quotes.recommendationTrend,
        keyStats: quotes.defaultKeyStatistics,
      });
    }
  );
});

routes.get("/api/v1/:ticker/sma/:startingDate/:num", (req, res) => {
  const reqDate = req.params["startingDate"];
  const startingDate = format(new Date(reqDate), dateFormat);

  let num = req.params["num"];
  if (num.length <= 0) {
    num = 20;
  } else {
    num = Number(num);
  }

  const ticker = req.params["ticker"];
  if (ticker.length <= 0) {
    return res.status(403).json({ message: "No ticker specified!" });
  }

  findSmaOfDay(
    startingDate,
    ticker,
    num,
    () => res.status(403).json({ message: "Failed to get sma" }),
    (result) =>
      res.status(200).json({
        message: "Success!",
        sma: result,
        marketDays: num,
      })
  );
});

function findSmaOfDay(day, ticker, n, onErr, onSuccess) {
  const startingDate = format(new Date(day), dateFormat);
  const targetDate = format(
    sub(new Date(startingDate), { days: n * 3 }),
    dateFormat
  );

  yf.historical(
    {
      symbol: ticker,
      from: targetDate,
      to: startingDate,
      // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    },
    function (err, quotes) {
      //...
      if (err) {
        return onErr();
      }
      let smaVal = 0;
      for (let i = 0; i < n; i++) {
        smaVal += quotes[i].close;
      }
      smaVal /= n;
      return onSuccess(smaVal);
    }
  );
}

//

function findAllPastSma(findSmaOfDay) {
  findSmaOfDay(
    startingDate,
    ticker,
    num,
    () => res.status(403).json({ message: "Failed to get sma" }),
    (result) =>
      res.status(200).json({
        message: "Success!",
        sma: result,
        marketDays: num,
      })
  );
}

//I want to calculate the last time the sma20 broke above the sma50

//find average of last 20 days to find sma20 of that specific day

//And the opposite of that^^

// if day0 sma20<sma50 and day 1 sma20>50

module.exports = routes;
