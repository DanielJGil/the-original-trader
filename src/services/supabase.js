import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tocnvuzfmuymgykvcodp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvY252dXpmbXV5bWd5a3Zjb2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0MDk2MjMsImV4cCI6MjAxMzk4NTYyM30.FR2O4WPZg4j6A7lg-4qYexi8W6UgMQhS9UU7p9SOEAI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
