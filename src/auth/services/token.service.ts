import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { IJWTPayload } from './types';

@Injectable()
export class TokenService {
  validatedToken(token: string): string | IJWTPayload {
    const secret = process.env.SECRET;

    try {
      const payload = <IJWTPayload>verify(token, secret);
      return payload;
    } catch {
      return null;
    }
  }

  generateToken(
    secret: string,
    expiresIn: string,
    payload: { id: number },
  ): { token: string } {
    const token = sign(payload, secret, { expiresIn });
    const response = { token };

    return response;
  }
}
