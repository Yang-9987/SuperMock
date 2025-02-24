
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'default-supabase-url'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'default-supabase-key'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
