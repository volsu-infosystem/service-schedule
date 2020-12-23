import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_token')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  userId: number;

  @Column('boolean')
  isRevoked: boolean;

  @Column('date')
  expires: Date;
}
