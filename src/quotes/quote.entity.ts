import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('quote')
export class QuoteEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @Column('text') name: string;

  @Column('number') open: number;

  @Column('number') high: number;

  @Column('number') low: number;

  @Column('number') close: number;
}
