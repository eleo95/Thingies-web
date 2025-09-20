import { BaseRepository } from "@/core/repository/BaseRepository";
import type { Thing } from "../domain/things";

export class LocalStorageRepository<T extends Thing> extends BaseRepository<T> {
	constructor(private storageKey: string) {
		super();
		if (!localStorage.getItem(this.storageKey)) {
			localStorage.setItem(this.storageKey, JSON.stringify([]));
		}
	}

    private read(): T[] {
        return JSON.parse(localStorage.getItem(this.storageKey) || "[]")
    }

    private write(items: T[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(items))
    }

	getAll(includeDeleted = false): T[] {
		throw new Error("Method not implemented.");
	}
	getById(id: string, includeDeleted = false): T | undefined {
		throw new Error("Method not implemented.");
	}
	create(item: Omit<T, "id" | "deleted">): T {
		throw new Error("Method not implemented.");
	}
	update(id: string, updates: Partial<Omit<T, "id">>): T | undefined {
		throw new Error("Method not implemented.");
	}
	delete(id: string): boolean {
		throw new Error("Method not implemented.");
	}
	restore(id: string): boolean {
		throw new Error("Method not implemented.");
	}
	clear(): void {
		throw new Error("Method not implemented.");
	}
	filter(predicate: (item: T) => boolean, includeDeleted = false): T[] {
		throw new Error("Method not implemented.");
	}
}
