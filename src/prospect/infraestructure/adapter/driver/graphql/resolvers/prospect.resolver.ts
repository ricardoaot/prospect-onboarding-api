import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import {
  CreateProspectUseCase,
  GetProspectUseCase,
  GetProspectListUseCase,
  QualifyProspectUseCase
} from '../../../../../application/use-cases';
import { Prospect } from '../../../../../domain/model/prospect';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { CreateProspectDto } from 'src/prospect/application/dto/create-prospect.dto';

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


  @Mutation(() => Prospect)
  async createProspect(   
    @Args('data') data: CreateProspectDto,
    @Args(
      'profilePhoto', 
      { type: () => GraphQLUpload }
    ) profilePhoto: Upload,
  ): Promise<Prospect> {
    return this.createProspectUseCase.execute(
      data
      ,profilePhoto
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
