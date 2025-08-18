import { CssBaseline, ThemeProvider } from "@mui/material";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Account from "./Account";
import Calculator from "./Calculator";
import Recipes from "./Recipes";
import Shopping from "./Shopping";
import Hello from "./Hello";
import { supabase } from "./supabaseClient";
import { themeOptions } from "./ThemeOptions";
import AppNavigationBar from "./AppNavigationBar";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState(0); // 0: Kalkulator, 1: Przepisy, 2: Zakupy, 3: Konto

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  let content;
  if (!session) {
    content = <Hello />;
  } else {
    if (tab === 0) {
      content = <Calculator />;
    } else if (tab === 1) {
      content = <Recipes />;
    } else if (tab === 2) {
      content = <Shopping />;
    } else if (tab === 3) {
      content = <Account session={session} />;
    }
  }

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      {session && (
        <AppNavigationBar session={session} tab={tab} onTabChange={setTab} />
      )}
      {content}
    </ThemeProvider>
  );
}

export default App;
