const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: ['https://kyureno.dev', 'http://kyureno.dev', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server is running on port ${PORT}`);
}); 