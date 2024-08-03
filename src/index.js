const express = require('express');
const rateLimit = require('express-rate-limit')
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const limiter= rateLimit({
    windowMs: 2 * 60 * 10000,
    max: 30,
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // to parse JSON bodies

app.use(limiter);


app.use('/flightService', createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite: {'^/flightService':'/flight'}
    
}));

app.use('/bookingService', createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
    pathRewrite: {'^/bookingService':'/booking'}
}));


app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT,async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
