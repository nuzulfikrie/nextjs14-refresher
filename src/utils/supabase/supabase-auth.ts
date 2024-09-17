// File: src/utils/supabase-auth.ts

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'

const supabase = createClientComponentClient()

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

export async function signOut() {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export async function getSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error fetching session:', error)
    return null
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ?? null)
  })

  return () => subscription.unsubscribe()
}