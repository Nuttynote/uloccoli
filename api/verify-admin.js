module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) {
    res.status(500).json({ ok: false, error: "서버에 ADMIN_PASSWORD가 설정되지 않았어요" });
    return;
  }
  const { password } = req.body || {};
  if (password && password === ADMIN_PASSWORD) {
    res.status(200).json({ ok: true });
    return;
  }
  res.status(401).json({ ok: false });
};
