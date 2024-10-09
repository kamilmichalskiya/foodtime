import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

export default function Account({ session }: { session: Session }) {
  return (
    <>
      <div>
        <h1>Witaj {session.user.email || ""}</h1>
      </div>
      <div>
        <button
          className="button block"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Wyloguj
        </button>
      </div>
    </>
  );
}
