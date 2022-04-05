export interface CreateUser {
  phone: string;
  isActive: boolean;
  telegramSession: string | void;
  phoneCodeHash: string;
  password: string;
}
