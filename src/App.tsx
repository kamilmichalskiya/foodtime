import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import AboutMe from "./AboutMe";
import Account from "./Account";
import "./App.css";
import Header from "./Header";
import { supabase } from "./supabaseClient";

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
    <div className="App">
      <Header session={session} />
      {!session ? <AboutMe /> : <Account session={session} />}
    </div>
  );
}

export default App;
