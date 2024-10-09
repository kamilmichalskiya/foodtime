import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

export default function Header({ session }: { session: Session | null }) {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) alert("Error during login: " + error.message);
  };

  return (
    <div className="App-header">
      {!session ? (
        <div>
          <span>Logowanie </span>
          <button onClick={handleLogin}>Google</button>
        </div>
      ) : (
        <div>
          <span>Zalogowano </span>
          <button onClick={() => supabase.auth.signOut()}>Wyloguj</button>
        </div>
      )}
    </div>
  );
}
