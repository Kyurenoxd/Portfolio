app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
}); 