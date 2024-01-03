const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Credentials',
    'Access-Control-Allow-Origin'
  ]
};

export default corsOptions;
