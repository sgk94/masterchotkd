import { z } from "zod";

const serverEnvSchema = z.object({
  CLERK_SECRET_KEY: z.string().min(1),
  DATABASE_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
});

let _serverEnv: z.infer<typeof serverEnvSchema> | null = null;

export function getServerEnv(): z.infer<typeof serverEnvSchema> {
  if (!_serverEnv) {
    _serverEnv = serverEnvSchema.parse(process.env);
  }
  return _serverEnv;
}
