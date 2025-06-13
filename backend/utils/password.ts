import { hash, compare } from "bcryptjs";

// Password validation rules
const PASSWORD_VALIDATIONS = [
  {
    test: (pwd: string) => pwd.length >= 8,
    error: "Password must be at least 8 characters long.",
  },
  {
    test: (pwd: string) => /[A-Z]/.test(pwd),
    error: "Password must contain at least one uppercase letter.",
  },
  {
    test: (pwd: string) => /[a-z]/.test(pwd),
    error: "Password must contain at least one lowercase letter.",
  },
  {
    test: (pwd: string) => /[0-9]/.test(pwd),
    error: "Password must contain at least one number.",
  },
  {
    test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    error: "Password must contain at least one special character.",
  },
  {
    test: (pwd: string) => !/\s/.test(pwd),
    error: "Password must not contain spaces.",
  },
];

/**
 * Validates password against security requirements
 */
export const validatePassword = (
  password: string
): { valid: boolean; error?: string } => {
  for (const validation of PASSWORD_VALIDATIONS) {
    if (!validation.test(password)) {
      return { valid: false, error: validation.error };
    }
  }
  return { valid: true };
};

/**
 * Hashes a password after validation
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

  const validation = validatePassword(password);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  return hash(password, saltRounds);
};

/**
 * Compares a plain text password with a hashed password
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return compare(password, hashedPassword);
};
