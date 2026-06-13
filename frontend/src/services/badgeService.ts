import { UserBadgeResponse } from "@/lib/badges";

const API_BASE =
  process.env.NEXT_PUBLIC_MENTOR_API_URL || "http://127.0.0.1:8000";

export async function fetchUserBadges(userId: string): Promise<UserBadgeResponse> {
  const res = await fetch(`${API_BASE}/api/badges/user/${userId}`);
  if (!res.ok) throw new Error("Error fetching badges");
  return res.json();
}

export async function trackBadgeEvent(
  userId: string,
  event: string,
  value: number = 1,
): Promise<{ newBadges: { id: string; title: string; icon: string; xp: number }[] }> {
  const res = await fetch(`${API_BASE}/api/badges/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, event, value }),
  });
  if (!res.ok) throw new Error("Error tracking event");
  const data = await res.json();
  return { newBadges: data.newBadges ?? [] };
}

export function showBadgeNotification(badge: { title: string; icon: string; xp: number }) {
  const event = new CustomEvent("badge-unlocked", { detail: badge });
  window.dispatchEvent(event);
}
