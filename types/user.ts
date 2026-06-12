export interface User {
id: string;

username: string;

createdAt: string;

theme: "light" | "dark";

primaryColor: string;
}

export interface RegisterRequest {
username: string;

password: string;
}

export interface LoginRequest {
username: string;

password: string;
}

export interface AuthResponse {
success: boolean;

message: string;

token?: string;

user?: User;
}

export interface UpdateProfileRequest {
username?: string;

theme?: "light" | "dark";

primaryColor?: string;
}

export interface ChangePasswordRequest {
currentPassword: string;

newPassword: string;
}
