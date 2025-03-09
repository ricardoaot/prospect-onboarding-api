import { Prospect } from "../model/prospect";
export const ProspectRepositoryToken = Symbol('ProspectRepository');

export interface ProspectRepository {
    create(prospect: Prospect): Promise<Prospect>;
}