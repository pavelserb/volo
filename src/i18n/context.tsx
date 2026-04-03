'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Locale } from './types';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from './types';
import { messages, type MessageTree } from './messages';

function getNested(obj: MessageTree | undefined, path: string): string | undefined {
  const parts = path.split('.');
  let cur: string | MessageTree | undefined = obj;
  for (const p of parts) {
    if (cur == null || typeof cur === 'string') return undefined;
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : undefined;
}

function interpolate(template: string, vars?: Record<string, string>): string {
  if (!vars) return template;
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{${k}}`, v);
  }
  return out;
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string>) => string;
  formatNumber: (n: number) => string;
  formatDecimal: (n: number, fractionDigits?: number) => string;
  formatCurrency: (n: number, currency?: string) => string;
  formatDate: (isoDate: string, options?: Intl.DateTimeFormatOptions) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (stored === 'pl' || stored === 'en') setLocaleState(stored);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === 'pl' ? 'pl' : 'en';
    document.title =
      getNested(messages[locale], 'meta.title') ??
      getNested(messages[DEFAULT_LOCALE], 'meta.title') ??
      'Volo';
  }, [locale, ready]);

  const value = useMemo<I18nContextValue>(() => {
    const tree = messages[locale];
    const fallback = messages.pl;

    const t = (key: string, vars?: Record<string, string>) => {
      const raw = getNested(tree, key) ?? getNested(fallback, key) ?? key;
      return interpolate(raw, vars);
    };

    const numberLocale = locale === 'pl' ? 'pl-PL' : 'en-GB';

    const formatNumber = (n: number) =>
      new Intl.NumberFormat(numberLocale).format(n);

    const formatDecimal = (n: number, fractionDigits = 1) =>
      new Intl.NumberFormat(numberLocale, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      }).format(n);

    const formatCurrency = (n: number, currency = 'PLN') =>
      new Intl.NumberFormat(numberLocale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(n);

    const formatDate = (isoDate: string, options?: Intl.DateTimeFormatOptions) => {
      const [y, m, d] = isoDate.split('-').map(Number);
      return new Intl.DateTimeFormat(numberLocale, options ?? {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(y, m - 1, d));
    };

    return { locale, setLocale, t, formatNumber, formatDecimal, formatCurrency, formatDate };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LocaleProvider');
  return ctx;
}
