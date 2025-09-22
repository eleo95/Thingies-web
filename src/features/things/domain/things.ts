import { BaseModelSchema } from "@/core/repository/BaseRepository";
import { z } from "zod";

export const ThingSchema = BaseModelSchema.extend({
    title: z.string().min(1, "Title is required")
})

export const ThingCreateSchema = ThingSchema.omit({
    createdAt:true,
    updatedAt:true,
    id:true,
    deleted:true
})

export const ThingUpdateSchema = ThingCreateSchema.partial()

export type Thing = z.infer<typeof ThingSchema>;
export type ThingCreateDTO = z.infer<typeof ThingCreateSchema>;
export type ThingUpdateDTO = z.infer<typeof ThingUpdateSchema>;