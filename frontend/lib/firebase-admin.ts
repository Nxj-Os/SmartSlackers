import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { join } from "path";

function getServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (raw) {
    const parsed = JSON.parse(raw);
    if (parsed.private_key) {
      parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
    }
    return parsed;
  }
  const filePath = join(process.cwd(), "service-account.json");
  const content = readFileSync(filePath, "utf8");
  return JSON.parse(content);
}

export function getAdminApp() {
  const apps = getApps();
  if (apps.length > 0) return apps[0]!;
  return initializeApp({
    credential: cert(getServiceAccount()),
  });
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
