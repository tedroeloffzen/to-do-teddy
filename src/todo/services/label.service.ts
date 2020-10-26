import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from '../entities/label.entity';
import { AbstractBaseService } from '../../shared/service/abstract-base.service';

@Injectable()
export class LabelService extends AbstractBaseService<Label>{
  constructor(@InjectRepository(Label) private readonly labelRepository: Repository<Label>) {
    super();
  }

  public getRepository(): Repository<Label> {
    return this.labelRepository;
  }
}
