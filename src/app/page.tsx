"use client";

import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/settings";

export default function IndexRedirect() {
  redirect(`/${defaultLocale}`);
}
