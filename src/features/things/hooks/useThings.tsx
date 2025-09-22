import { validate } from "@/core/utils/validate";
import { type Thing, ThingCreateSchema, ThingUpdateSchema } from "@/features/things/domain/things";
import { LocalStorageThingRepository } from "@/features/things/repository/LocalStorageRepo";
import { useEffect, useState } from "react";
import z from "zod";

const repo = new LocalStorageThingRepository<Thing>("thingies_things");

export function useThings(includeDeleted = false) {
  const [things, setThings] = useState<Thing[]>([]);
  const [errors, setErrors] = useState<string[] | null>(null); // to track errors

  useEffect(() => {
    setThings(repo.getAll(includeDeleted));
  }, [includeDeleted]);

  // Generic action handler to wrap repetitive try-catch logic
const handleAction = async (
  action: () => void, // the action to execute
  successCallback: () => void // the callback to refresh the things list or any other success action
): Promise<void> => { // explicitly return a Promise<void>
  try {
    await action(); // execute the action (e.g., add, update, delete)
    successCallback(); // refresh the list after success
    setErrors(null); // reset any previous errors
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.issues)
      setErrors(err.issues.map(e=>e.message))
    } else if (err instanceof Error){
      setErrors([err.message]); // set error message for UI or logging
    } 
    else {
      console.error(err); // handle unexpected errors
    }
  }
};


  const add = async (data: unknown) => {
    await handleAction(
      async () => {
        // Validate before adding
        const validatedData = await validate(ThingCreateSchema, data);
        repo.create(validatedData);
      },
      () => setThings(repo.getAll(includeDeleted)) // refresh the list after successful add
    );
  };

  const remove = (id: string) => {
    handleAction(
      async () => {
        repo.delete(id);
      },
      () => setThings(repo.getAll(includeDeleted)) // refresh the list after successful remove
    );
  };

  const restore = (id: string) => {
    handleAction(
      async () => {
        repo.restore(id);
      },
      () => setThings(repo.getAll(includeDeleted)) // refresh the list after successful restore
    );
  };

  const update = async (
    id: string,
    thingUpdates: unknown
  ) => {
    await handleAction(
      async () => {
        // Validate before updating
        const validatedData = await validate(ThingUpdateSchema, thingUpdates);
        repo.update(id, validatedData);
      },
      () => setThings(repo.getAll(includeDeleted)) // refresh the list after successful update
    );
  };

  const clear = () => {
    handleAction(
      async () => {
        repo.clear();
      },
      () => {
        setThings([]); // clear the list after successful clear
      }
    );
  };

  const filter = (filterQuery: (thing: Thing)=>boolean) => {
    handleAction(
      async () => {
        const filteredThings = repo.filter(filterQuery)
        setThings(filteredThings);
      },
      () => {
        // setThings([]); // clear the list after successful clear
      }
    );
  };

  return {
    things,
    errors, // expose error for the UI
    add,
    remove,
    restore,
    update,
    filter,
    clear,
  };
}
