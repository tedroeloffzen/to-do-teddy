import { Type } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractBaseService, AbstractCRUDService } from '../service/abstract-base.service';

export function AbstractBaseResolver<T extends Type<unknown>>(entityClassRef: T): any {
  @Resolver({ isAbstract: true })
  abstract class AbstractBaseResolverClass {
    @Query(() => [entityClassRef], { name: `${entityClassRef.name.toLocaleLowerCase()}s`})
    public async findAll(): Promise<T[]> {
      return this.getService().findAll();
    }

    @Query(() => entityClassRef, { name: `${entityClassRef.name.toLocaleLowerCase()}`})
    public async findOne(@Args({ type: () => Int, name: `${entityClassRef.name.toLocaleLowerCase()}Id` }) id: number): Promise<T> {
      return this.getService().findById(id);
    }

    public abstract getService(): AbstractBaseService<T>;
  }
  return AbstractBaseResolverClass;
}

export function AbstractCRUDResolver<T extends Type<unknown>, D extends Type<unknown>>(entityClassRef: T, inputDTOClassRef: D): any {
  @Resolver({ isAbstract: true })
  abstract class AbstractCRUDResolverClass extends AbstractBaseResolver(entityClassRef) {
    @Mutation(returns => entityClassRef, { name: `${entityClassRef.name.toLocaleLowerCase()}Create` })
    create(@Args({ name: `${entityClassRef.name.toLocaleLowerCase()}Input`, type: () => inputDTOClassRef }) input: D): Promise<T> {
      return this.getService().create(input);
    }

    @Mutation(returns => entityClassRef, { name: `${entityClassRef.name.toLocaleLowerCase()}Update` })
    update(@Args({ name: `${entityClassRef.name.toLocaleLowerCase()}Id`, type: () => Int}) id: number,
               @Args({ name: `${entityClassRef.name.toLocaleLowerCase()}Input`, type: () => inputDTOClassRef }) input: D): Promise<T> {
      return this.getService().update(id, input);
    }

    @Mutation(returns => Boolean, { name: `${entityClassRef.name.toLocaleLowerCase()}Delete` })
    delete(@Args({ name: `${entityClassRef.name.toLocaleLowerCase()}Id`, type: () => Int}) id: number): Promise<boolean> {
      return this.getService().delete(id);
    }

    public abstract getService(): AbstractCRUDService<T, D>;
  }
  return AbstractCRUDResolverClass;
}
