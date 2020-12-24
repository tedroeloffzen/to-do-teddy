import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Project } from '../../entities/project.entity';
import { ProjectService } from '../../services/project.service';
import { AbstractCRUDResolver } from '../../../shared/resolver/abstract-base.resolver';
import { ProjectInput } from '../inputs/project.input';

@Resolver(of => Project)
export class ProjectResolver extends AbstractCRUDResolver(Project, ProjectInput) {
  constructor(private readonly projectService: ProjectService) {
    super();
  }

  public getService(): ProjectService {
    return this.projectService;
  }
}
