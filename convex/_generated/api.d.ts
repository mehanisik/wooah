/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as bodyweight from "../bodyweight.js";
import type * as cardio from "../cardio.js";
import type * as extraSets from "../extraSets.js";
import type * as history from "../history.js";
import type * as http from "../http.js";
import type * as notes from "../notes.js";
import type * as oneRm from "../oneRm.js";
import type * as personalRecords from "../personalRecords.js";
import type * as photos from "../photos.js";
import type * as preferences from "../preferences.js";
import type * as sessions from "../sessions.js";
import type * as sets from "../sets.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  bodyweight: typeof bodyweight;
  cardio: typeof cardio;
  extraSets: typeof extraSets;
  history: typeof history;
  http: typeof http;
  notes: typeof notes;
  oneRm: typeof oneRm;
  personalRecords: typeof personalRecords;
  photos: typeof photos;
  preferences: typeof preferences;
  sessions: typeof sessions;
  sets: typeof sets;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
