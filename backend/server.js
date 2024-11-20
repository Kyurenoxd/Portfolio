const express = require('express');
const cors = require('cors');
const app = express();

// Расширенная настройка CORS
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'Authorization'],
  optionsSuccessStatus: 200
}));

// Добавляем промежуточное ПО для парсинга JSON
app.use(express.json());

// Добавляем промежуточное ПО для всех маршрутов
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  
  // Обработка preflight запросов
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Базовый маршрут для проверки работы API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
}); 