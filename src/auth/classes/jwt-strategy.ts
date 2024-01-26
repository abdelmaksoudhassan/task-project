import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Payload } from "../interfaces/payload.inteface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: "this is secret key"
        });
    }

    async validate(jwtpayload:Payload): Promise<any> {
      const person = await this.authService.validatePerson(jwtpayload);
      if (!person) {
        throw new UnauthorizedException();
      }
      return person;
    }
}