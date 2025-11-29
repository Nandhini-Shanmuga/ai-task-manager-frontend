import { User } from "./user.interface";

/**
 * Auth response interface
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}