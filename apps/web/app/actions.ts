"use server";
import { cookies } from "next/headers";
export const handleToggleReadability = async (value: string) => {
  await cookies().set("showReadability", value);
};
