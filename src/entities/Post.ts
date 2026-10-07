import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  title!: string
  
  @Column({ type: 'varchar', nullable: true })
  miniature!: string | null

  @Column({ type: 'text'})
  content!: string

  @Column({ type: 'varchar', length: 100})
  author!: string

  @Column({ type: 'varchar', length: 150, unique: true })
  path!: string

  @CreateDateColumn()
  createdAt!: Date

}