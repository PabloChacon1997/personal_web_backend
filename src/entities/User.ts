import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn } from "typeorm/browser";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  firstname!: string;
  
  @Column({ type: 'varchar', length: 100 })
  lastname!: string;
  
  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;
  
  @Column({ type: 'varchar' })
  password!: string;
  
  @Column({ type: 'varchar' })
  role!: string;
  
  @Column({ type: 'boolean' })
  active!: boolean;

  @Column({ type: 'varchar' })
  avatar!: string;

  @CreateDateColumn()
  createdAt!: Date;
}


