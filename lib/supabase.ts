import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dxjjkumajrkjtsbwtjiu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4amprdW1hanJranRzYnd0aml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzYzMzIsImV4cCI6MjA1NjgxMjMzMn0.Wy5tt-BUgfIEYOyVmE-nH-6JBBE6apE0ygxoXF2ulSA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
