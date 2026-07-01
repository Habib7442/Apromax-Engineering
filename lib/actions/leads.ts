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
    
    const { data, error } = await supabase
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
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating lead in database:", error);
      return { success: false, error: error.message };
    }

    return { success: true, lead: data };
  } catch (err: any) {
    console.error("Server Action Exception:", err);
    return { success: false, error: err?.message || "An unexpected error occurred." };
  }
}
