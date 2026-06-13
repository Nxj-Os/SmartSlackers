from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone

from firestore_service import get_db

router = APIRouter(prefix="/api/badges", tags=["badges"])

# ── Badge Definitions ──────────────────────────────────────────────────────────

BADGES = {
    "primera-vez": {
        "id": "primera-vez",
        "title": "Primera Vez",
        "description": "Completaste el test vocacional por primera vez",
        "icon": "🎯",
        "category": "test",
        "xp": 50,
    },
    "explorador": {
        "id": "explorador",
        "title": "Explorador",
        "description": "Exploraste 5 carreras diferentes",
        "icon": "🔍",
        "category": "exploracion",
        "xp": 75,
    },
    "explorador-experto": {
        "id": "explorador-experto",
        "title": "Explorador Experto",
        "description": "Exploraste 10 carreras diferentes",
        "icon": "🧭",
        "category": "exploracion",
        "xp": 150,
    },
    "corazon-generoso": {
        "id": "corazon-generoso",
        "title": "Corazón Generoso",
        "description": "Diste 10 likes en la comunidad",
        "icon": "❤️",
        "category": "comunidad",
        "xp": 75,
    },
    "simulador": {
        "id": "simulador",
        "title": "Simulador",
        "description": "Completaste una simulación de carrera",
        "icon": "🎮",
        "category": "simulacion",
        "xp": 100,
    },
    "pionero": {
        "id": "pionero",
        "title": "Pionero",
        "description": "Completaste 3 simulaciones de carrera",
        "icon": "🏆",
        "category": "simulacion",
        "xp": 200,
    },
    "comentarista": {
        "id": "comentarista",
        "title": "Comentarista",
        "description": "Publicaste 5 comentarios en la comunidad",
        "icon": "💬",
        "category": "comunidad",
        "xp": 75,
    },
    "popular": {
        "id": "popular",
        "title": "Popular",
        "description": "Tus posts recibieron 10 likes en total",
        "icon": "⭐",
        "category": "comunidad",
        "xp": 150,
    },
    "activo": {
        "id": "activo",
        "title": "Activo",
        "description": "Publicaste 5 posts en la comunidad",
        "icon": "📢",
        "category": "comunidad",
        "xp": 100,
    },
    "mentor": {
        "id": "mentor",
        "title": "Mentor",
        "description": "Usaste el Mentor IA 5 veces",
        "icon": "🤖",
        "category": "aprendizaje",
        "xp": 100,
    },
}

BADGES_COL = "UserBadges"
STATS_COL = "UserStats"


# ── Models ─────────────────────────────────────────────────────────────────────

class TrackEventBody(BaseModel):
    userId: str
    event: str  # e.g. "test_completed", "career_explored", "like_given", etc.
    value: int = 1
    meta: Optional[dict] = None


class BadgeInfo(BaseModel):
    id: str
    title: str
    description: str
    icon: str
    category: str
    xp: int
    unlocked: bool
    unlockedAt: Optional[str] = None
    progress: Optional[int] = None
    target: Optional[int] = None


# ── Helpers ────────────────────────────────────────────────────────────────────

def _get_user_stats(db, user_id: str) -> dict:
    ref = db.collection(STATS_COL).document(user_id)
    doc = ref.get()
    if doc.exists:
        return doc.to_dict()
    return {
        "testCompleted": 0,
        "careersExplored": 0,
        "likesGiven": 0,
        "simulationsCompleted": 0,
        "commentsMade": 0,
        "postsCreated": 0,
        "likesReceived": 0,
        "mentorUsed": 0,
    }


def _update_user_stats(db, user_id: str, event: str, value: int) -> dict:
    ref = db.collection(STATS_COL).document(user_id)
    doc = ref.get()
    stats = doc.to_dict() if doc.exists else {
        "testCompleted": 0,
        "careersExplored": 0,
        "likesGiven": 0,
        "simulationsCompleted": 0,
        "commentsMade": 0,
        "postsCreated": 0,
        "likesReceived": 0,
        "mentorUsed": 0,
    }

    field_map = {
        "test_completed": "testCompleted",
        "career_explored": "careersExplored",
        "like_given": "likesGiven",
        "simulation_completed": "simulationsCompleted",
        "comment_made": "commentsMade",
        "post_created": "postsCreated",
        "like_received": "likesReceived",
        "mentor_used": "mentorUsed",
    }

    field = field_map.get(event)
    if field:
        stats[field] = stats.get(field, 0) + value
        ref.set(stats, merge=True)

    return stats


def _get_unlocked_badges(db, user_id: str) -> dict:
    ref = db.collection(BADGES_COL).document(user_id)
    doc = ref.get()
    if doc.exists:
        return doc.to_dict().get("badges", {})
    return {}


def _check_and_award_badges(db, user_id: str, stats: dict) -> list:
    unlocked = _get_unlocked_badges(db, user_id)
    new_badges = []

    conditions = {
        "primera-vez": stats.get("testCompleted", 0) >= 1,
        "explorador": stats.get("careersExplored", 0) >= 5,
        "explorador-experto": stats.get("careersExplored", 0) >= 10,
        "corazon-generoso": stats.get("likesGiven", 0) >= 10,
        "simulador": stats.get("simulationsCompleted", 0) >= 1,
        "pionero": stats.get("simulationsCompleted", 0) >= 3,
        "comentarista": stats.get("commentsMade", 0) >= 5,
        "popular": stats.get("likesReceived", 0) >= 10,
        "activo": stats.get("postsCreated", 0) >= 5,
        "mentor": stats.get("mentorUsed", 0) >= 5,
    }

    now = datetime.now(timezone.utc).isoformat()
    for badge_id, meets in conditions.items():
        if meets and badge_id not in unlocked:
            unlocked[badge_id] = {"unlockedAt": now}
            new_badges.append(badge_id)

    if new_badges:
        ref = db.collection(BADGES_COL).document(user_id)
        ref.set({"badges": unlocked}, merge=True)

    return new_badges


# ── Routes ─────────────────────────────────────────────────────────────────────

@router.get("/definitions")
def get_badge_definitions():
    return {"badges": list(BADGES.values())}


@router.get("/user/{user_id}")
def get_user_badges(user_id: str):
    db = get_db()
    stats = _get_user_stats(db, user_id)
    unlocked = _get_unlocked_badges(db, user_id)

    progress_map = {
        "primera-vez": (stats.get("testCompleted", 0), 1),
        "explorador": (stats.get("careersExplored", 0), 5),
        "explorador-experto": (stats.get("careersExplored", 0), 10),
        "corazon-generoso": (stats.get("likesGiven", 0), 10),
        "simulador": (stats.get("simulationsCompleted", 0), 1),
        "pionero": (stats.get("simulationsCompleted", 0), 3),
        "comentarista": (stats.get("commentsMade", 0), 5),
        "popular": (stats.get("likesReceived", 0), 10),
        "activo": (stats.get("postsCreated", 0), 5),
        "mentor": (stats.get("mentorUsed", 0), 5),
    }

    result = []
    for badge_id, badge_def in BADGES.items():
        current, target = progress_map.get(badge_id, (0, 1))
        is_unlocked = badge_id in unlocked
        result.append({
            **badge_def,
            "unlocked": is_unlocked,
            "unlockedAt": unlocked.get(badge_id, {}).get("unlockedAt"),
            "progress": min(current, target),
            "target": target,
        })

    total_xp = sum(b["xp"] for b in result if b["unlocked"])
    total_badges = sum(1 for b in result if b["unlocked"])

    return {
        "badges": result,
        "totalXp": total_xp,
        "totalUnlocked": total_badges,
        "totalAvailable": len(result),
        "stats": stats,
    }


@router.post("/track")
def track_event(body: TrackEventBody):
    db = get_db()

    valid_events = {
        "test_completed", "career_explored", "like_given",
        "simulation_completed", "comment_made", "post_created",
        "like_received", "mentor_used",
    }
    if body.event not in valid_events:
        raise HTTPException(status_code=400, detail=f"Invalid event: {body.event}")

    stats = _update_user_stats(db, body.userId, body.event, body.value)
    new_badges = _check_and_award_badges(db, body.userId, stats)

    return {
        "ok": True,
        "newBadges": [BADGES[b] for b in new_badges],
        "stats": stats,
    }


@router.get("/leaderboard")
def get_leaderboard():
    db = get_db()
    docs = list(db.collection(BADGES_COL).limit(50).stream())

    board = []
    for doc in docs:
        data = doc.to_dict()
        badges = data.get("badges", {})
        total_xp = sum(BADGES[b]["xp"] for b in badges if b in BADGES)
        board.append({
            "userId": doc.id,
            "badgeCount": len(badges),
            "totalXp": total_xp,
        })

    board.sort(key=lambda x: x["totalXp"], reverse=True)
    return {"leaderboard": board[:20]}
