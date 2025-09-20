import type { BaseModel } from "@/core/repository/BaseRepository";

export interface Thing extends BaseModel {
    title: string;
}