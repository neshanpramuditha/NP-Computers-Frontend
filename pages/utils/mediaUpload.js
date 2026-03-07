import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://gwnzmnlpvpmpyfijsdvv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bnptbmxwdnBtcHlmaWpzZHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4ODQ0NDYsImV4cCI6MjA4ODQ2MDQ0Nn0.3zMhdGC-DIG4MHIVzEIBc912dtr8DmU05sAYzB461u0"

const supabase = createClient(supabaseURL, supabaseKey);

export default function uploadFile(file) {
    return new Promise(
        (resolve, reject) => {
            if (file == null) {
                reject("No file provided!")
                return;
            }
            const timeStamp = new Date().getTime();
            const fileName = timeStamp + "-" + file.name;
            
            supabase.storage.from("images").upload(fileName, file ,{
                upsert : false,
                cacheControl : 3600
            }).then(
                (result)=>{
                    console.log("Upload result:", result);
                    const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    console.log("Public URL:", url);
                    resolve(url);
                }
            ).catch(
                (error)=>{
                    console.error("Upload error:", error);
                    reject("Failed to upload file!")
                }
            )
             


    })
}