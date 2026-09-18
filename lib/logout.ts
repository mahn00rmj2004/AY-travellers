"use client";

export function logout(redirectTo: string = "/") {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Clear the token cookie set by the login page
  document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
  // Hard navigation so any cached state is dropped
  window.location.href = redirectTo;
}
