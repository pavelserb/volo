import type { Locale } from '../types';
import { pl } from './pl';
import { en } from './en';

/** Nested string map — same structure for pl/en; values are translated strings. */
export interface MessageTree {
  readonly [key: string]: string | MessageTree;
}

/** Polish bundle (reference for available keys in development). */
export type PlMessages = typeof pl;

export const messages: Record<Locale, MessageTree> = {
  pl: pl as MessageTree,
  en: en as MessageTree,
};
