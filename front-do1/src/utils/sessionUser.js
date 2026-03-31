export const getSessionUserId = () => {
  const direct = sessionStorage.getItem("user_id");
  if (direct != null && direct !== "") return String(direct);
  try {
    const raw = sessionStorage.getItem("user");
    if (!raw) return null;
    const u = JSON.parse(raw);
    if (u?.user_id == null) return null;
    return String(u.user_id);
  } catch {
    return null;
  }
};
