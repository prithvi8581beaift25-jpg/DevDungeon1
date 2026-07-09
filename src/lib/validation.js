export function validateUID(uid) {
  return (
    typeof uid === "string" &&
    uid.trim().length > 0
  );
}

export function validateEmail(email) {
  return (
    typeof email === "string" &&
    email.includes("@")
  );
}

export function validateXP(xp) {
  return (
    typeof xp === "number" &&
    xp >= 0
  );
}

export function validateCoins(coins) {
  return (
    typeof coins === "number" &&
    coins >= 0
  );
}

export function validateDifficulty(difficulty) {
  const allowed = [
    "Easy",
    "Medium",
    "Hard",
  ];

  return allowed.includes(difficulty);
}

export function validateAchievement(achievement) {
  const allowed = [
    "FIRST_DUNGEON",
    "FIRST_WIN",
    "LEVEL_5",
    "LEVEL_10",
    "STREAK_7",
  ];

  return allowed.includes(achievement);
}