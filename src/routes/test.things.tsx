// import { Input } from "@/components/ui/input";
// import type { ThingCreateDTO } from "@/features/things/domain/things";
// import { useThings } from "@/features/things/hooks/useThings";
import { Input } from "@/components/ui/input";
import type { ThingCreateDTO } from "@/features/things/domain/things";
import { useThings } from "@/features/things/hooks/useThings";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/test/things")({
	component: RouteComponent,
	ssr: false,
});
const initialState = { title: "" };
// interface Thing {
// 	title: string;
// 	prop1?: string;
// 	prop2?: string;
// 	prop3?: boolean;
// 	prop4?: number;
// 	prop5?: string;
// 	[key: string]: string | number | boolean | undefined;
// }
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

	// return (
	// 	<div>
			// <div>
			// 	<div>
			// 		<h1>Things</h1>
			// 		<button style={{ color: "darkred" }} type="button" onClick={clear}>
			// 			clear all
			// 		</button>
			// 	</div>
			// 	<input
			// 		id="deletedCheck"
			// 		type="checkbox"
			// 		checked={showDeleted}
			// 		onChange={() => setShowDeleted(!showDeleted)}
			// 	/>
			// 	<label htmlFor="deletedCheck">Show deleted</label>
			// </div>
			// <Input
			// 	type="text"
			// 	value={newThing?.title ?? ""}
			// 	onChange={(e) => setNewThing({ ...newThing, title: e.target.value })}
			// />

			// <button type="button" onClick={addNewThing}>
			// 	Add Thing
			// </button>

			// <ul style={{ color: "red" }}>
			// 	{errors?.map((err) => (
			// 		<li key={err}>{err}</li>
			// 	))}
			// </ul>

			// <input
			// 	type="text"
			// 	value={search}
			// 	onChange={(e) => filterThingsByTitle(e.target.value)}
			// />

			// <ul>
			// 	{things.map((thing) => (
			// 		<li
			// 			key={thing.id}
			// 			style={{ textDecoration: thing.deleted ? "line-through" : "unset" }}
			// 		>
			// 			<div style={{ color: "gray", display: "inline-block" }}>
			// 				<p style={{ color: "unset" }}>{thing.title}</p>
			// 				<p>createdAt: {JSON.stringify(thing.createdAt)}</p>
			// 				<p>updatedAt: {JSON.stringify(thing.updatedAt)}</p>
			// 			</div>
			// 			<br />

			// 			{thing.deleted ? (
			// 				<button type="button" onClick={() => restore(thing.id)}>
			// 					Restore
			// 				</button>
			// 			) : (
			// 				<button type="button" onClick={() => remove(thing.id)}>
			// 					Remove
			// 				</button>
			// 			)}
			// 			<button
			// 				type="button"
			// 				onClick={() =>
			// 					update(thing.id, {
			// 						title: `${(Math.random() + 1).toString(36).substring(7)}`,
			// 					})
			// 				}
			// 			>
			// 				Update
			// 			</button>
			// 		</li>
			// 	))}
			// </ul>
	// 	</div>
	// );

	// const [thing, setThing] = useState<Thing>({ title: "My Thing" });
	// const [keyInput, setKeyInput] = useState("");
	// const [valueInput, setValueInput] = useState("");

	// function handleAdd() {
	// 	if (!keyInput) return;
	// 	setThing((prev) => ({
	// 		...prev,
	// 		[keyInput]: parseValue(valueInput),
	// 	}));
	// 	setKeyInput("");
	// 	setValueInput("");
	// };

	// const parseValue = (val: string): string | number | boolean => {
	// 	if (val === "true") return true;
	// 	if (val === "false") return false;
	// 	if (!Number.isNaN(Number(val))) return Number(val);
	// 	return val;
	// };

	return (
		<div className="min-h-screen bg-[#fffcf5]">
			<div className="container mx-auto px-4 py-6 max-w-7xl">
				<div className="space-y-6 bg-background">
					{/* Header */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-4xl font-bold text-balance">
								Collection Tracker
							</h1>
							<p className="text-muted-foreground text-pretty">
								Organize and track your collections with powerful tagging
							</p>
						</div>
						{/* <Navigation currentView={getNavigationView()} onNavigate={handleNavigate} /> */}
					</div>

					{/* Main Content */}
					<div className="w-full">
						{/* <div className="p-2 border-2 border-black rounded-2xl transition-all not-hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)]">
							<h2>{thing.title}</h2>

							<div>
								<input
									placeholder="Property name"
									value={keyInput}
									onChange={(e) => setKeyInput(e.target.value)}
								/>
								<input
									placeholder="Value"
									value={valueInput}
									onChange={(e) => setValueInput(e.target.value)}
								/>
								<button type="button" onClick={handleAdd}>Add</button>
							</div>

							<h3>Properties:</h3>
							<ul>
								{Object.entries(thing).map(([k, v]) => (
									<li key={k}>
										<b>{k}</b>: {String(v)}
									</li>
								))}
							</ul>
						</div> */}

						<div className="p-2 border-2 border-black rounded-2xl transition-all not-hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)]">

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
			<Input
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

					</div>
				</div>
			</div>
		</div>
	);
}
