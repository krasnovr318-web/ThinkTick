import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**

* Создание хеша пароля
  */
  export async function hashPassword(
  password: string
  ): Promise<string> {
  return bcrypt.hash(
  password,
  SALT_ROUNDS
  );
  }

/**

* Проверка пароля
  */
  export async function verifyPassword(
  password: string,
  hashedPassword: string
  ): Promise<boolean> {
  return bcrypt.compare(
  password,
  hashedPassword
  );
  }

/**

* Базовая валидация пароля
  */
  export function validatePassword(
  password: string
  ): {
  valid: boolean;
  message: string;
  } {
  if (password.length < 8) {
  return {
  valid: false,
  message:
  "Password must contain at least 8 characters"
  };
  }

if (password.length > 128) {
return {
valid: false,
message:
"Password is too long"
};
}

const hasUpperCase =
/[A-Z]/.test(password);

const hasLowerCase =
/[a-z]/.test(password);

const hasNumber =
/[0-9]/.test(password);

if (
!hasUpperCase ||
!hasLowerCase ||
!hasNumber
) {
return {
valid: false,
message:
"Password must contain uppercase, lowercase and number"
};
}

return {
valid: true,
message: "Valid password"
};
}
