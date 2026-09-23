import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Technology } from "./Technology";


@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 150 })
  title!: string

  @Column({ type: 'varchar', length: 150, unique: true })
  slug!: string

  @Column({ type: 'text' })
  description!: string

  @Column({ type: 'varchar', nullable: true })
  coverImage!: string | null

  @Column({ type: 'varchar', nullable: true })
  githubUrl!: string | null

  @Column({ type: 'varchar', nullable: true })
  liveUrl!: string | null

  @Column({ type: 'boolean', default: false })
  featured!: boolean

  @Column({ type: 'boolean', default: true })
  active!: boolean

  @Column({ type: 'int', default: 0 })
  position!: number

  @ManyToMany(() => Technology, (technology) => technology.projects)
  @JoinTable({ name: 'project_technologies' })
  technologies!: Technology[]

  @CreateDateColumn()
  createdAt!: Date
}