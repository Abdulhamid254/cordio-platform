import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';

export enum HabitatType {
  CoralReef = 'coral_reef',
  Seagrass = 'seagrass',
  Mangrove = 'mangrove',
  Estuary = 'estuary',
  RockyShore = 'rocky_shore',
  OpenWater = 'open_water',
  Other = 'other',
}

export enum DataVisibility {
  Public = 'public',
  Partner = 'partner',
  Internal = 'internal',
}

export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

@Entity('sites')
export class Site {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'project_id' }) projectId: string;

  @ManyToOne(() => Project, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column() name: string;
  @Column() country: string;

  @Column({ type: 'enum', enum: HabitatType, enumName: 'habitat_type', default: HabitatType.CoralReef })
  habitat: HabitatType;

  @Column({ type: 'enum', enum: DataVisibility, enumName: 'data_visibility', default: DataVisibility.Internal })
  visibility: DataVisibility;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326 })
  location: GeoPoint;

  @Column({ name: 'protection_status', type: 'text', nullable: true }) protectionStatus: string | null;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' }) deletedAt: Date | null;
}
