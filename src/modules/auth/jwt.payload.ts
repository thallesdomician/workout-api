export interface JwtPayload {
  sub: string; // userId
  email: string;
  plan?: string; // opcional: free, pro, etc.
  iat?: number;
  exp?: number;
}
