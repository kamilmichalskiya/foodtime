import { Session } from "@supabase/supabase-js";
import React from "react";
import Account from "./Account";
import Calculator from "./Calculator";
import Recipes from "./Recipes";
import Shopping from "./Shopping";

export function getTabContent(tab: number, session: Session): React.ReactNode {
  if (tab === 0) {
    return <Calculator />;
  } else if (tab === 1) {
    return <Recipes />;
  } else if (tab === 2) {
    return <Shopping />;
  } else if (tab === 3) {
    return <Account session={session} />;
  }
  return null;
}

export interface NavTab {
  label: string;
  index: number;
}

export const NAV_TABS: NavTab[] = [
  { label: "Kalkulator", index: 0 },
  { label: "Przepisy", index: 1 },
  { label: "Zakupy", index: 2 },
];
