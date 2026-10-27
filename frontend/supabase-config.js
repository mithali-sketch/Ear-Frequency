/**
 * AudioMetrics - Supabase Cloud Configuration
 * 
 * You can paste your Supabase Project URL and Public Anon Key below,
 * or enter them in the app's "Cloud Sync Settings" dialog.
 */

// Enter your Supabase credentials here (or set them via the app UI):
const DEFAULT_SUPABASE_URL = "https://cqnmmksgmmozhzugyosr.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbm1ta3NnbW1vemh6dWd5b3NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwOTE1MDMsImV4cCI6MjEwNTY2NzUwM30.T9mbIz-TaHB5ZHSVWfXn1dWUfMyV46rQKBI5Z5WGQXg";

window.AudioMetricsCloud = {
  getUrl: function () {
    const saved = localStorage.getItem('audiometrics_supabase_url');
    return (saved && saved.trim()) ? saved.trim() : DEFAULT_SUPABASE_URL;
  },
  getKey: function () {
    const saved = localStorage.getItem('audiometrics_supabase_anon_key');
    return (saved && saved.trim()) ? saved.trim() : DEFAULT_SUPABASE_ANON_KEY;
  },
  setCredentials: function (url, key) {
    if (url) localStorage.setItem('audiometrics_supabase_url', url.trim());
    if (key) localStorage.setItem('audiometrics_supabase_anon_key', key.trim());
    return this.initClient();
  },
  resetToDefaults: function () {
    localStorage.removeItem('audiometrics_supabase_url');
    localStorage.removeItem('audiometrics_supabase_anon_key');
    return this.initClient();
  },
  isConfigured: function () {
    const url = this.getUrl();
    const key = this.getKey();
    return Boolean(url && key && url.includes('supabase.co') && key.length > 20);
  },
  client: null,
  initClient: function () {
    const url = this.getUrl();
    const key = this.getKey();
    if (this.isConfigured() && window.supabase && window.supabase.createClient) {
      try {
        this.client = window.supabase.createClient(url, key, {
          auth: {
            persistSession: true,
            autoRefreshToken: true
          }
        });
        console.log("☁️ Supabase Cloud Client Initialized successfully for:", url);
        return this.client;
      } catch (err) {
        console.error("Failed to initialize Supabase client:", err);
      }
    }
    this.client = null;
    return null;
  }
};

// Initialize on script load if libraries are ready
if (window.supabase) {
  window.AudioMetricsCloud.initClient();
}
