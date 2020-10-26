import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractBaseService<T> {
  public abstract getRepository(): Repository<T>;

  public findAll(): Promise<T[]> {
    return this.getRepository().find();
  }

  public async findById(id: number): Promise<T> {
    const entity = await this.getRepository().findOne(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ${id} was not found`);
    }
    return entity;
  }
}

export abstract class AbstractCRUDService<T, D> extends AbstractBaseService<T>{
  public async create(inputDto: D): Promise<T> {
    const newEntity = this.getRepository().create(inputDto);
    return this.getRepository().save(newEntity);
  }

  public async update(id: number, inputDto: D): Promise<T> {
    const updatedEntity = await this.getRepository().preload({
      id: +id,
      ...inputDto
    });
    if (!updatedEntity) {
      throw new NotFoundException(`Entity with id: "${id}" was not found`);
    }
    return this.getRepository().save(updatedEntity);
  }

  public async delete(id: number): Promise<boolean> {
    return this.getRepository().delete(id)
      .then(_ => {
        return true;
      })
      .catch(error => {
        console.error(error);
        return false;
      });
  }
}
