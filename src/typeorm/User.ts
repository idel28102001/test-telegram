import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @ApiProperty()
  @Index()
  @Column()
  phone: string;

  @ApiProperty()
  @Column({ nullable: true })
  email: string;

  @Column({ default: false })
  isActive: boolean;

  @Column('json')
  telegramSession: string | void;

  @Column({ nullable: true })
  phoneCodeHash: string;

  @Column({ nullable: true, select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10, 'a');
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Column({ nullable: false, default: false })
  isEmailConfirmed: boolean;
}
