"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "MAD" | "EUR" | "USD" | "AED" | "CAD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInMAD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATES: Record<Currency, number> = {
  MAD: 1,
  EUR: 0.1,    // 10 MAD = 1 EUR
  USD: 0.11,   // Approx 9 MAD = 1 USD (based on 100 MAD -> 11 USD in en.json)
  AED: 0.35,   // Approx 2.85 MAD = 1 AED (based on 100 MAD -> 35 AED in en.json)
  CAD: 0.15,   // Approx 6.66 MAD = 1 CAD (based on 100 MAD -> 15 CAD in en.json)
};

const SYMBOLS: Record<Currency, string> = {
  MAD: "DH",
  EUR: "€",
  USD: "$",
  AED: "AED",
  CAD: "CAD",
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>("MAD");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("app_currency") as Currency;
    if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
      setCurrency(savedCurrency);
    }
  }, []);

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem("app_currency", newCurrency);
  };

  const formatPrice = (priceInMAD: number) => {
    const rate = EXCHANGE_RATES[currency] || 1;
    const symbol = SYMBOLS[currency] || "DH";
    const converted = priceInMAD * rate;
    
    // Formatting logic
    if (currency === "MAD") {
        return `${priceInMAD} DH`;
    }
    
    // For others, show symbol and 2 decimals if needed, or round
    const rounded = Math.round(converted * 100) / 100;
    
    if (currency === "EUR" || currency === "USD") {
        return `${rounded} ${symbol}`;
    }
    
    return `${rounded} ${symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
