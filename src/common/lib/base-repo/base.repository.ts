import { FilterQuery, Model, PipelineStage, UpdateQuery } from "mongoose";
import { IBaseRepository } from "./i-base-repo";

export class BaseRepository<T> implements IBaseRepository<T>{
    protected readonly model:Model<T>;
    constructor(model:Model<T>){
        this.model=model;
    }
   create(payload: Partial<T>): Promise<T> {
    return this.model.create(payload);
  }

  findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  update(id: string, updateData: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  updateMany(
    filter: FilterQuery<T>,
    updateData: UpdateQuery<T>
  ): Promise<any> {
    return this.model.updateMany(filter, updateData);
  }

  deleteMany(filter: FilterQuery<T>): Promise<any> {
    return this.model.deleteMany(filter);
  }

  bulkWrite(operations: any[]): Promise<any> {
    return this.model.bulkWrite(operations);
  }

  aggregate(pipeline: PipelineStage[]): Promise<any[]> {
    return this.model.aggregate(pipeline);
  }

  count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }   
}