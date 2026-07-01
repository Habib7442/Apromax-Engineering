"use server";

import { createClient } from "@/lib/supabase/server";

export async function createApplicationAction(formData: FormData) {
  try {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const experienceStr = formData.get("experience") as string;
    const experience = parseInt(experienceStr, 10) || 0;
    const position = formData.get("position") as string;
    const message = formData.get("message") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !phone || !position || !message) {
      return { success: false, error: "All fields except resume are required." };
    }

    let resumeUrl: string | null = null;

    // Upload Resume to Supabase Storage if provided
    if (resumeFile && resumeFile.size > 0) {
      if (resumeFile.type !== "application/pdf") {
        return { success: false, error: "Only PDF resumes are accepted." };
      }

      // Read file content as Buffer
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Clean filename to prevent accent or path problems
      const sanitizedName = resumeFile.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const filePath = `${Date.now()}_${sanitizedName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, buffer, {
          contentType: "application/pdf",
          duplex: "half"
        } as any);

      if (uploadError) {
        console.error("Supabase Storage upload error:", uploadError);
        return { success: false, error: `Failed to upload resume: ${uploadError.message}` };
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);

      resumeUrl = publicUrlData?.publicUrl || null;
    }

    // Insert record in applications table
    const { error: insertError } = await supabase
      .from("applications")
      .insert([
        {
          name,
          email,
          phone,
          experience,
          position,
          message,
          resume_url: resumeUrl
        }
      ]);

    if (insertError) {
      console.error("Database insert error:", insertError);
      return { success: false, error: insertError.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Server Action careersException:", err);
    return { success: false, error: err?.message || "An unexpected error occurred." };
  }
}
