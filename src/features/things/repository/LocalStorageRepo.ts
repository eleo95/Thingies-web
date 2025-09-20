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
		return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
	}

	private write(items: T[]): void {
		localStorage.setItem(this.storageKey, JSON.stringify(items));
	}

	getAll(includeDeleted = false): T[] {
		return this.read().filter((item) => includeDeleted || !item.deleted);
	}
	getById(id: string, includeDeleted = false): T | undefined {
		const item = this.read().find((i) => i.id === id);
		if (!item) return undefined;
		if (!includeDeleted && item.deleted) return undefined;
		return item;
	}
	create(item: Omit<T, "id" | "deleted" | "createdAt" | "updatedAt">): T {
		const newItem = { ...item, id: crypto.randomUUID(), deleted: false } as T;
		const items = this.read();
		items.push(newItem);
		this.write(items);
		return newItem;
	}
	update(
		id: string,
		updates: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>,
	): T | undefined {
		const items = this.read();
		const index = items.findIndex((item) => item.id === id);
		if (index === -1) return undefined;
		items[index] = { ...items[index], ...updates, updatedAt: new Date() };
		this.write(items);
		return items[index];
	}
	delete(id: string): boolean {
		const items = this.read();
		const index = items.findIndex((item) => item.id === id);
		if (index === -1) return false;
		items[index].deleted = true;
		this.write(items);
		return true;
	}
	restore(id: string): boolean {
		const items = this.read();
		const index = items.findIndex((item) => item.id === id);
		if (index === -1 || !items[index].deleted) return false;
		items[index].deleted = false;
		this.write(items);
		return true;
	}
	clear(): void {
		this.write([]);
	}
	filter(predicate: (item: T) => boolean, includeDeleted = false): T[] {
		return this.getAll(includeDeleted).filter(predicate)
	}
}
