import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('quote')
export class QuoteEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' }) created: Date;

  @Column('text') name: string;

  @Column('float') open: number;

  @Column('float') high: number;

  @Column('float') low: number;

  @Column('float') close: number;
}
