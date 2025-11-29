import { logout } from "../lib/auth.server";

export async function action({ request }: { request: Request }) {
  return await logout(request);
}