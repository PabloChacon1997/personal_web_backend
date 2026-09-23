import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project";


@Entity('technologies')
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string

  @Column({ type: 'varchar', nullable: true })
  icon!: string | null

  @ManyToMany(() => Project, (project) => project.technologies)
  projects!: Project[]
}