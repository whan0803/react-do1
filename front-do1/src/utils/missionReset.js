export const RESET_HOUR = 0;

export const getNextResetAt = (now = new Date()) => {
  const resetAt = new Date(now);
  resetAt.setHours(RESET_HOUR, 0, 0, 0);

  if (now >= resetAt) {
    resetAt.setDate(resetAt.getDate() + 1);
  }

  return resetAt.getTime();
};

export const getRemainingSeconds = (nextResetAt, nowMs = Date.now()) => {
  if (!nextResetAt) return 0;
  return Math.max(0, Math.floor((Number(nextResetAt) - nowMs) / 1000));
};

export const isResetPassed = (nextResetAt, nowMs = Date.now()) => {
  if (!nextResetAt) return true;
  return Number(nextResetAt) <= nowMs;
};

export const isLegacyNoonResetAt = (nextResetAt) => {
  if (!nextResetAt) return false;
  const date = new Date(Number(nextResetAt));
  return (
    date.getHours() === 12 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0
  );
};
