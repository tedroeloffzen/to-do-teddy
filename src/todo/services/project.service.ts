import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { AbstractCRUDService } from '../../shared/service/abstract-base.service';
import { ProjectInput } from '../graphql/inputs/project.input';

@Injectable()
export class ProjectService extends AbstractCRUDService<Project, ProjectInput> {
  constructor(@InjectRepository(Project) private readonly projectRepository: Repository<Project>) {
    super();
  }

  getRepository(): Repository<Project> {
    return this.projectRepository;
  }

  public async create(inputDto: ProjectInput): Promise<Project> {
    const newEntity = this.getRepository().create(inputDto);
    if (inputDto.parentProjectId) {
      const parentProject = await this.findById(inputDto.parentProjectId);
      newEntity.parentProject = parentProject;
    }
    return this.getRepository().save(newEntity);
  }

  public async delete(id: number): Promise<boolean> {
    return this.deleteByCriteria({
      'id': id,
      'deletable': true
    });
  }
}
