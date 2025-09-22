// import type { createThingDTO, updateThingDTO } from "@/features/things/infra/ThingsDTO";
import type { ThingCreateDTO, ThingUpdateDTO } from "@/features/things/domain/things";
import { z } from "zod";

export const BaseModelSchema = z.object({
  id: z.string().uuid(),
  deleted: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type BaseModel = z.infer<typeof BaseModelSchema>;


export abstract class BaseRepository<T extends BaseModel> {
	abstract getAll(includeDeleted?: boolean): T[];
	abstract getById(id: string, includeDeleted?: boolean): T | undefined;
	abstract create(item: ThingCreateDTO): T;
	abstract update(id: string, updates: ThingUpdateDTO): T | undefined;
	abstract delete(id: string): boolean;
	abstract restore(id: string): boolean;
	abstract clear(): void;
	abstract filter( predicate: (item: T) => boolean, includeDeleted?: boolean): T[];
}
