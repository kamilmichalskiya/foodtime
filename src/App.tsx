import { ThemeProvider } from "@mui/material";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Account from "./Account";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { supabase } from "./supabaseClient";
import { themeOptions } from "./ThemeOptions";

function App() {
  const [session, setSession] = useState<Session | null>(null);

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
      <ResponsiveAppBar session={session}></ResponsiveAppBar>
      {!session ? null : <Account session={session} />}
    </ThemeProvider>
  );
}

export default App;
