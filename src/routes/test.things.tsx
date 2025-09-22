import type { ThingCreateDTO } from "@/features/things/domain/things";
import { useThings } from "@/features/things/hooks/useThings";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/test/things")({
	component: RouteComponent,
	ssr: false,
});
const initialState = { title: "" }
function RouteComponent() {
	const [showDeleted, setShowDeleted] = useState(false);
	const [newThing, setNewThing] = useState<ThingCreateDTO>(initialState);
	const [search, setSearch] = useState<string>("");
	
	const { things, errors, add, update, remove, restore, filter, clear } =
		useThings(showDeleted);
		
	function filterThingsByTitle(key: string) {
		setSearch(key);
		filter((e) => e.title.includes(key));
	}

	function addNewThing() {
		add(newThing);
		setNewThing(initialState);
	}

	return (
		<div>
			<div>
				<div>
					<h1>Things</h1>
					<button style={{ color: "darkred" }} type="button" onClick={clear}>
						clear all
					</button>
				</div>
				<input
					id="deletedCheck"
					type="checkbox"
					checked={showDeleted}
					onChange={() => setShowDeleted(!showDeleted)}
				/>
				<label htmlFor="deletedCheck">Show deleted</label>
			</div>
			<input
				type="text"
				value={newThing?.title ?? ""}
				onChange={(e) => setNewThing({ ...newThing, title: e.target.value })}
			/>

			<button type="button" onClick={addNewThing}>
				Add Thing
			</button>

			<ul style={{ color: "red" }}>
				{errors?.map((err) => (
					<li key={err}>{err}</li>
				))}
			</ul>

			<input
				type="text"
				value={search}
				onChange={(e) => filterThingsByTitle(e.target.value)}
			/>

			<ul>
				{things.map((thing) => (
					<li
						key={thing.id}
						style={{ textDecoration: thing.deleted ? "line-through" : "unset" }}
					>
						<div style={{ color: "gray", display: "inline-block" }}>
							<p style={{ color: "unset" }}>{thing.title}</p>
							<p>createdAt: {JSON.stringify(thing.createdAt)}</p>
							<p>updatedAt: {JSON.stringify(thing.updatedAt)}</p>
						</div>
						<br />

						{thing.deleted ? (
							<button type="button" onClick={() => restore(thing.id)}>
								Restore
							</button>
						) : (
							<button type="button" onClick={() => remove(thing.id)}>
								Remove
							</button>
						)}
						<button
							type="button"
							onClick={() =>
								update(thing.id, {
									title: `${(Math.random() + 1).toString(36).substring(7)}`,
								})
							}
						>
							Update
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
