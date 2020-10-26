import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { AbstractBaseService } from '../../shared/service/abstract-base.service';

@Injectable()
export class ProjectService extends AbstractBaseService<Project> {
  constructor(@InjectRepository(Project) private readonly projectRepository: Repository<Project>) {
    super();
  }

  getRepository(): Repository<Project> {
    return this.projectRepository;
  }
}
