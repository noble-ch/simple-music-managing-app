import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.string().description("Port for the server.").default("8000"),
  NODE_ENV: Joi.string().description("Node Environment.").required(),
  DB_URI: Joi.string()
    .description("The URI for the mongo database connection.")
    .required(),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  mongoose: {
    uri: envVars.DB_URI,
    options: {},
  },
  port: Number(envVars.PORT),
  nodeEnv: String(envVars.NODE_ENV),
};

export default config;
