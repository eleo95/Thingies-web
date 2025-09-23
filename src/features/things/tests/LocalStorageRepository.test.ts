import { beforeEach, describe, expect, it } from "vitest";
import type { Thing } from "../domain/things";
import { LocalStorageRepository } from "../../../repositories/LocalStorageRepo";

describe("LocalStorageRepository", () => {
	let repo: LocalStorageRepository<Thing>;

	beforeEach(() => {
		localStorage.clear();
		repo = new LocalStorageRepository<Thing>("test-things");
	});

	it("should create a new item", () => {
		const thing = repo.create({
			title: "Super Game 1",
		});
		expect(thing.id).toBeDefined();
		expect(thing.deleted).toBe(false);
		expect(thing.title).toBe("Super Game 1");
	});

	it("should get all items", () => {
		repo.create({ title: "Item 1" });
		repo.create({ title: "Item 2" });

		const all = repo.getAll();
		expect(all).toHaveLength(2);
	});

	it("should get an item by its id", () => {
		const item = repo.create({ title: "New Item" });
		const fetchedItem = repo.getById(item.id);

		expect(fetchedItem?.id).toBeDefined();
		expect(fetchedItem?.id).toBe(item.id);
	});

	it("should update an item", () => {
		const item = repo.create({ title: "changeMe" });
		const updatedItem = repo.update(item.id, { title: "Updated title!" });

		expect(updatedItem?.title).toBe("Updated title!");
	});

	it("should (soft)delete an item", () => {
		const item = repo.create({ title: "tobeDeleted" });
		const result = repo.delete(item.id);

		expect(result).toBe(true);
		expect(repo.getAll()).toHaveLength(0);
		expect(repo.getAll(true)).toHaveLength(1);
	});

	it("should restore a deleted item", () => {
		const item = repo.create({ title: "tobeDeleted" });
		repo.delete(item.id);
		const restoredItem = repo.restore(item.id);

		expect(restoredItem).toBe(true);
		expect(repo.getAll()).toHaveLength(1);
	});
	it("should filter items", () => {
		repo.create({ title: "Game 1" });
		repo.create({ title: "Book 42" });
		const filtered = repo.filter((e) => e.title.includes("Boo"));

		expect(filtered).toHaveLength(1);
		expect(filtered[0].title).toBe("Book 42");
	});

    it("should clear all items", () => {
        repo.create({title:"To be deleted 1"})
        repo.create({title:"To be deleted 2"})
        repo.clear()

        expect(repo.getAll(true)).toHaveLength(0)
    })
});
