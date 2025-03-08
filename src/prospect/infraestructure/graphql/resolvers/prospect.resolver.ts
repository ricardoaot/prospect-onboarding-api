import { Resolver, Query } from '@nestjs/graphql';
import { GetProspect } from '../../../application/use-cases/get-prospect';

@Resolver()
export class ProspectResolver {
  constructor(private readonly getProspect: GetProspect) {}

  @Query(() => String)
  sayHello(): string {
    return this.getProspect.execute();
  }
}
