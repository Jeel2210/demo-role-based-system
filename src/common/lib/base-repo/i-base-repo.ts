import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";

export interface IBaseRepository<T>{
    create(data:Partial<T>):Promise<T>;
    findById(id:string):Promise<T|null>;
    findOne(filter:FilterQuery<T>):Promise<T|null>;
    update(id: string, updateData: UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    updateMany(
        filter: FilterQuery<T>,
        updateData: UpdateQuery<T>
    ): Promise<any>;
    deleteMany(filter: FilterQuery<T>): Promise<any>;
    bulkWrite(operations: any[]): Promise<any>;
    aggregate(pipeline: PipelineStage[]): Promise<any[]>;
    count(filter?: FilterQuery<T>): Promise<number>;
}