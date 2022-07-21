const envVars = {
  PORT: process.env.PORT!,
  MONGODB_URI: process.env.MONGODB_URI!,
  API_KEY: process.env.API_KEY!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION!,
};

Object.entries(envVars).forEach(([key, value]) => {
  if (!value) throw new Error(`Environment variable ${key} is not set`);
});

export const { PORT, MONGODB_URI, API_KEY, JWT_SECRET, JWT_EXPIRATION } = envVars;
