import { UserEntity } from 'src/user/entities/user.entity';

export interface RegisterResponse {
  readonly status: number;
  readonly user?: UserEntity;
}
