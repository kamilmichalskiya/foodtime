import { CssBaseline, ThemeProvider } from "@mui/material";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import AppNavigationBar from "./AppNavigationBar";
import Hello from "./Hello";
import { getTabContent } from "./navigation";
import { supabase } from "./supabaseClient";
import { themeOptions } from "./ThemeOptions";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState(3);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      {session && (
        <AppNavigationBar session={session} tab={tab} onTabChange={setTab} />
      )}
      {!session ? <Hello /> : getTabContent(tab, session)}
    </ThemeProvider>
  );
}

export default App;
