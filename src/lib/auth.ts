import { supabase } from './supabase'

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  return { data, error }
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function sendPasswordReset(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/login',
  })

  return { data, error }
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  return { data, error }
}