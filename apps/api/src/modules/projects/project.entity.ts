import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

export enum ProjectStatus {
  Planned = 'planned',
  Active = 'active',
  Completed = 'completed',
  Archived = 'archived',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() name: string;
  @Column({ unique: true }) code: string;
  @Column({ type: 'text', nullable: true }) description: string | null;
  @Column({ type: 'text', nullable: true }) country: string | null;
  @Column({ type: 'text', nullable: true }) funder: string | null;

  @Column({ type: 'enum', enum: ProjectStatus, enumName: 'project_status', default: ProjectStatus.Active })
  status: ProjectStatus;

  @Column({ name: 'start_date', type: 'date', nullable: true }) startDate: string | null;
  @Column({ name: 'end_date', type: 'date', nullable: true }) endDate: string | null;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' }) deletedAt: Date | null;
}
