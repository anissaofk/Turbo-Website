"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getDictionary,
  isLocale,
  LOCALE_COOKIE,
  type Dictionary,
  type Locale,
} from "./dictionaries";

const STORAGE_KEY = LOCALE_COOKIE;

function writeCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLocale = "fr",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const start = isLocale(initialLocale) ? initialLocale : "fr";
  const [locale, setLocaleState] = useState<Locale>(start);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    writeCookie(next);
    document.documentElement.lang = next;
  }, []);

  // Migre localStorage → cookie après hydratation (évite le mismatch SSR)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored) && stored !== start) {
        setLocale(stored);
        return;
      }
      if (!isLocale(stored) && start === "fr") {
        const browser = navigator.language.slice(0, 2).toLowerCase();
        if (isLocale(browser) && browser !== "fr") {
          setLocale(browser);
          return;
        }
      }
    } catch {
      /* ignore */
    }
    document.documentElement.lang = start;
    writeCookie(start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: getDictionary(locale),
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

export function useT() {
  return useLanguage().t;
}
