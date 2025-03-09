import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { 
  CreateProspectUseCase, 
  GetProspectUseCase 
} from '../../../../application/use-cases/';
import { Prospect } from '../../../../domain/model/prospect';

@Resolver(() => Prospect)
export class ProspectResolver {
  constructor(
    private readonly createProspectUseCase: CreateProspectUseCase,
    private readonly getProspectUseCase: GetProspectUseCase
  ) {}

  @Query(() => String)
  async getProspect(): Promise<string> {
    return this.getProspectUseCase.execute();
  }
  

  @Mutation(() => Prospect)
  async createProspect(
    @Args('name') name: string,
    @Args('lastname') lastname: string,
    @Args('birthday') birthday: Date,
    @Args('email') email: string,
    @Args('phone') phone: string,
  ): Promise<Prospect> {

    return this.createProspectUseCase.execute(
      new Prospect('', name, lastname, birthday, email, phone)
    );

  }
}
