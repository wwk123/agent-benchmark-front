/**
 * Tabs - Custom tabs component using React Context
 * Based on approved Stage 2 plan
 */

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TabsContextValue = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

export type TabsProps = {
  defaultValue: string;
  children: ReactNode;
  onChange?: (value: string) => void;
  className?: string;
};

export function Tabs({ defaultValue, children, onChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={cn("space-y-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = {
  children: ReactNode;
  className?: string;
};

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg bg-surface-muted p-1 text-text-secondary",
        className
      )}
      role="tablist"
    >
      {children}
    </div>
  );
}

export type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-surface text-brand-primary shadow-sm"
          : "hover:bg-surface/50 hover:text-text-primary",
        className
      )}
    >
      {children}
    </button>
  );
}

export type TabsContentProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

export function TabsContent({ value, children, className }: TabsContentProps) {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      className={cn("mt-4 focus-visible:outline-none", className)}
    >
      {children}
    </div>
  );
}
