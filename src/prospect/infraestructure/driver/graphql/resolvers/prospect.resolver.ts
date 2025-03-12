import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import {
  CreateProspectUseCase,
  GetProspectUseCase,
  GetProspectListUseCase,
  QualifyProspectUseCase
} from '../../../../application/use-cases/';
import { Prospect } from '../../../../domain/model/prospect';
import { DateResolver } from 'graphql-scalars';

@Resolver(() => Prospect)
export class ProspectResolver {
  constructor(
    private readonly createProspectUseCase: CreateProspectUseCase,
    private readonly getProspectUseCase: GetProspectUseCase,
    private readonly getProspectListUseCase: GetProspectListUseCase,
    private readonly qualifyProspectUseCase: QualifyProspectUseCase,
  ) { }


  @Query(() => String)
  async getProspect(): Promise<string> {
    return this.getProspectUseCase.execute();
  }



  @Query(() => [Prospect])
  async getProspects(
    @Args('statuses', { type: () => [String], nullable: true }) statuses?: string[],
  ): Promise<Prospect[]> {
    return this.getProspectListUseCase.execute(statuses || []);
  }
  /*
    @Query(() => [Prospect])
    async getProspects(): Promise<Prospect[]> {
      return this.getProspectListUseCase.execute();
    }
  */


  @Mutation(() => Prospect)
  async createProspect(
    @Args('name') name: string,
    @Args('lastname') lastname: string,
    @Args('birthday', { type: () => DateResolver }) birthday: Date,
    @Args('email') email: string,
    @Args('phone') phone: string,
  ): Promise<Prospect> {

    return this.createProspectUseCase.execute(
      new Prospect('', name, lastname, birthday, email, phone)
    );

  }

  @Mutation(() => Boolean)
  async qualifyProspect(
    @Args('id') id: string,
    @Args('status') status: string,
  ) {
    const field = 'status'
    return this.qualifyProspectUseCase.execute(id, field, status);
  }
}
