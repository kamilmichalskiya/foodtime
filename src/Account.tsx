import { Container } from "@mui/material";
import { Session } from "@supabase/supabase-js";

export default function Account({ session }: { session: Session }) {
  return (
    <Container>
      <h1>Konto {session.user.email || ""}</h1>
    </Container>
  );
}
