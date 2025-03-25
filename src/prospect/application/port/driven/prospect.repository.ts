import { Prospect } from "../../../domain/model/prospect";
export const ProspectRepositoryToken = Symbol('ProspectRepository');

export interface ProspectRepository {

    create(prospect: Prospect): Promise<Prospect>;

    findAll(statuses?: string[]): Promise<Prospect[]>

    updateField(
        id: string, 
        field: string, 
        value: any
    ): Promise<boolean>;
}