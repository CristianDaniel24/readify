import { z } from "zod";

export type LoginFormType = z.infer<typeof loginFormDefinition.loginFormSchema>;

class LoginFormDefinition {
  readonly loginFormSchema = z.object({
    email: z.string().trim(),
    password: z.string().trim(),
  });
}

export const loginFormDefinition = new LoginFormDefinition();
