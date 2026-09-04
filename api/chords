const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function sbHeaders() {
  return {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

module.exports = async (req, res) => {
  if (!SUPABASE_URL || !SERVICE_KEY || !ADMIN_PASSWORD) {
    res.status(500).json({ error: "서버 환경변수(SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / ADMIN_PASSWORD)가 설정되지 않았어요" });
    return;
  }

  const { password, id, chord } = req.body || {};
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "비밀번호가 올바르지 않아요" });
    return;
  }

  try {
    if (req.method === "POST") {
      const body = {
        id: chord.id,
        root: chord.root,
        name: chord.name,
        full_name: chord.full,
        frets: chord.frets,
      };
      const r = await fetch(`${SUPABASE_URL}/rest/v1/chords`, {
        method: "POST",
        headers: sbHeaders(),
        body: JSON.stringify(body),
      });
      if (!r.ok) { res.status(500).json({ error: await r.text() }); return; }
      res.status(200).json(await r.json());
      return;
    }

    if (req.method === "PATCH") {
      const body = {
        root: chord.root,
        name: chord.name,
        full_name: chord.full,
        frets: chord.frets,
      };
      const r = await fetch(`${SUPABASE_URL}/rest/v1/chords?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: sbHeaders(),
        body: JSON.stringify(body),
      });
      if (!r.ok) { res.status(500).json({ error: await r.text() }); return; }
      res.status(200).json(await r.json());
      return;
    }

    if (req.method === "DELETE") {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/chords?id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: sbHeaders(),
      });
      if (!r.ok) { res.status(500).json({ error: await r.text() }); return; }
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
