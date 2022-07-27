const { env } = process;

const envVars = {
  PORT: env.PORT!,
  MONGODB_URI: env.MONGODB_URI!,
  API_KEY: env.API_KEY!,
  JWT_SECRET: env.JWT_SECRET!,
  JWT_EXPIRATION: env.JWT_EXPIRATION!,
};

Object.entries(envVars).forEach(([key, value]) => {
  if (!value) throw new Error(`Environment variable ${key} is not set`);
});

export const { PORT, MONGODB_URI, API_KEY, JWT_SECRET, JWT_EXPIRATION } = envVars;
