import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ayxkfbekinofzxmkxqbs.supabase.co';
const supabaseKey = 'sb_publishable_BKKC_j1HmtEV4lApAuzRjw_NfFPDuTN';

export const supabase = createClient(supabaseUrl, supabaseKey);