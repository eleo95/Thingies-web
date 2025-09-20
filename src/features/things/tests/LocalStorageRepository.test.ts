import { beforeEach, describe, expect, it } from "vitest";
import type { Thing } from "../domain/things";
import { LocalStorageRepository } from "../repository/LocalStorageRepo";

describe("LocalStorageRepository", () => {
	let repo: LocalStorageRepository<Thing>;

	beforeEach(() => {
		localStorage.clear();
		repo = new LocalStorageRepository<Thing>("test-things");
	});

	it("should create a new thing", () => {
		const thing = repo.create({
			title: "Super Game 1",
		});
		expect(thing.id).toBeDefined();
		expect(thing.deleted).toBe(false);
		expect(thing.title).toBe("Super Game 1");
	});
});
