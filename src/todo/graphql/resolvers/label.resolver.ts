import { AbstractCRUDResolver } from '../../../shared/resolver/abstract-base.resolver';
import { Label } from '../../entities/label.entity';
import { LabelInput } from '../inputs/label.input';
import { LabelService } from '../../services/label.service';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => Label)
export class LabelResolver extends AbstractCRUDResolver(Label, LabelInput) {
  constructor(private readonly labelService: LabelService) {
    super();
  }

  public getService(): LabelService {
    return this.labelService;
  }
}
