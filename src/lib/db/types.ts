import { InferSelectModel } from "drizzle-orm";
import { things } from "./schema";

export type Thing = InferSelectModel<typeof things>;
