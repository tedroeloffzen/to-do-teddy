import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Project } from '../../entities/project.entity';
import { ProjectService } from '../../services/project.service';

@Resolver(of => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(returns => [Project], { name: 'projects' })
  public getProjects(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Query(returns => Project, { name: 'project' })
  public getProject(@Args({ name: 'projectId', type: () => Int }) projectId: number): Promise<Project> {
    return this.projectService.findById(projectId);
  }
}
