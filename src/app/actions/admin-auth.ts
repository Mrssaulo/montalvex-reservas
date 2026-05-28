"use server";

import { redirect } from "next/navigation";
import {
  clearAdminAccessCookie,
  setAdminAccessCookie,
  validateAdminAccessCode,
} from "@/lib/admin-auth";

export async function loginAdmin(slug: string, formData: FormData) {
  const code = getText(formData, "access_code");
  const result = validateAdminAccessCode(code);

  if (!result.ok) {
    const message =
      result.reason === "missing_config"
        ? "ADMIN_ACCESS_TOKEN não configurado no servidor"
        : "Código incorreto";

    redirect(`/admin/${slug}/reservas?erro=${encodeURIComponent(message)}`);
  }

  await setAdminAccessCookie(result.token);
  redirect(`/admin/${slug}/reservas`);
}

export async function logoutAdmin() {
  await clearAdminAccessCookie();
  redirect("/");
}

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}
