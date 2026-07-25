"use server";

import { leadSchema } from "@/lib/schema";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function createLead(data: unknown) {
  // Server-side Zod validation check
  const result = leadSchema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from("leads").insert([result.data]);

  if (error) {
    return { success: false, message: "Database insertion failed." };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function updateLeadStatus(id: string, status: "New" | "Contacted" | "Closed") {
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin");
  return { success: true };
}