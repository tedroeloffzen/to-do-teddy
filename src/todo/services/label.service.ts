import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from '../entities/label.entity';
import { AbstractCRUDService } from '../../shared/service/abstract-base.service';
import { LabelInput } from '../graphql/inputs/label.input';

@Injectable()
export class LabelService extends AbstractCRUDService<Label, LabelInput> {
  constructor(@InjectRepository(Label) private readonly labelRepository: Repository<Label>) {
    super();
  }

  public getRepository(): Repository<Label> {
    return this.labelRepository;
  }
}
