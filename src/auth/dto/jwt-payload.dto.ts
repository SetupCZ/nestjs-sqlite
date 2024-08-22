import { TUuid } from '../../uuid';

export class JwtPayloadDto {
  sub: TUuid;

  username: string;
}
