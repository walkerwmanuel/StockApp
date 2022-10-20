// Bring in our dependencies
const app = require('express')();
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const YAHOO_API_KEY = process.env.YAHOO_API_KEY 

//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(PORT, () => {
  console.log(`Stock Trader Live on port ${PORT}`);
});
