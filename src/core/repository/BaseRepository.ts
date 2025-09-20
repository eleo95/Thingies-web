export interface BaseModel {
	id: string;
	deleted?: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export abstract class BaseRepository<T extends BaseModel> {
	abstract getAll(includeDeleted?: boolean): T[];
	abstract getById(id: string, includeDeleted?: boolean): T | undefined;
	abstract create(item: Omit<T, "id" | "deleted" | "createdAt" | "updatedAt">): T;
	abstract update(id: string, updates: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>): T | undefined;
	abstract delete(id: string): boolean;
	abstract restore(id: string): boolean;
	abstract clear(): void;
	abstract filter( predicate: (item: T) => boolean, includeDeleted?: boolean): T[];
}
