import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { IBuketProvider } from "../IBucketProvider";
import { env } from "../../env";

const project_id = env.SUPABASE_PROJECT_ID;
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
const bucket = env.SUPABASE_BUCKET;

//TO-DO: TRATAMENDO DE ERRO FEITO CORRETAMETNE
export class BucketSupabaseProvider implements IBuketProvider {
  async upload(fileKey: string, file: Express.Multer.File): Promise<any> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileKey, file.buffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.mimetype,
      });

    if (error) throw new Error("Error in upload file");
    return {
      url: `https://${project_id}.supabase.co/storage/v1/object/public/${data.fullPath}`,
    };
  }
  async delete(fileKey: string): Promise<any> {
    const { error } = await supabase.storage.from(bucket).remove([fileKey]);
    if (error) throw new Error("Error in delete file");
  }
}
