import { hashPassword, verifyPassword } from "./password";

export interface AuthUser {
id: string;
username: string;
passwordHash: string;
}

export async function registerUser(
username: string,
password: string
): Promise<AuthUser> {
const passwordHash =
await hashPassword(password);

const user: AuthUser = {
id: crypto.randomUUID(),
username,
passwordHash
};

return user;
}

export async function loginUser(
password: string,
passwordHash: string
): Promise<boolean> {
return verifyPassword(
password,
passwordHash
);
}

export function generateSessionToken(): string {
return crypto.randomUUID();
}

export function isAuthenticated(
token?: string
): boolean {
if (!token) {
return false;
}

return token.length > 0;
}
