"use server";

import { createClient } from "@/lib/supabase/server";

export async function createLeadAction(formData: {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  message: string;
}) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("leads")
      .insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          service: formData.service,
          message: formData.message || null,
          status: "pending_booking"
        }
      ]);

    if (error) {
      console.error("Error creating lead in database:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Server Action Exception:", err);
    return { success: false, error: err?.message || "An unexpected error occurred." };
  }
}

export async function updateLeadStatusAction(email: string, status: string) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from("leads")
      .update({ status: status })
      .eq("email", email)
      .eq("status", "pending_booking");

    if (error) {
      console.error("Error updating lead status in database:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Server Action updateLeadStatusAction Exception:", err);
    return { success: false, error: err?.message || "An unexpected error occurred." };
  }
}
