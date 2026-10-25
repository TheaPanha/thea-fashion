// Cloudflare Worker: ស្ថិតិអតិថិជនទាំងអស់ (មើលរូប / ចុចកម្មង់)
//
// ការរៀបចំ (Cloudflare Dashboard):
//  1. Workers & Pages → KV → Create namespace (ឧ. "stats")
//  2. បង្កើត Worker ថ្មី → បិទភ្ជាប់កូដនេះ → Deploy
//  3. Worker → Settings → Bindings → Add → KV namespace
//       Variable name = STATS   |  Namespace = stats
//  4. Worker → Settings → Variables and Secrets → Add
//       ADMIN_KEY (Secret) = ពាក្យសម្ងាត់សម្រាប់មើលស្ថិតិ (ដាក់ខ្លួនឯង)
//       ALLOWED_ORIGIN (ជម្រើស) = https://ឈ្មោះអ្នកប្រើ.github.io
//  5. ចម្លង URL របស់ Worker ទៅដាក់ក្នុង Admin → ហាង → "URL Worker ស្ថិតិ"
//  6. ក្នុង Admin → ស្ថិតិ → ដាក់ ADMIN_KEY ក្នុងប្រអប់ Key

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });

    // ---- អតិថិជនផ្ញើព្រឹត្តិការណ៍ ----
    if (request.method === "POST") {
      let d;
      try { d = JSON.parse(await request.text()); } catch { return new Response("bad json", { status: 400, headers: cors }); }
      const type = d.type;
      const n = Number(d.n);
      if (!["view", "order"].includes(type) || !Number.isInteger(n) || n < 1 || n > 1000) {
        return new Response("bad request", { status: 400, headers: cors });
      }
      const key = `${type}:${n}`;
      const cur = parseInt((await env.STATS.get(key)) || "0", 10);
      await env.STATS.put(key, String(cur + 1));
      return new Response("ok", { headers: cors });
    }

    // ---- ម្ចាស់ហាងអានស្ថិតិ ----
    if (request.method === "GET") {
      const key = new URL(request.url).searchParams.get("key") || "";
      if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) {
        return new Response("unauthorized", { status: 401, headers: cors });
      }
      const out = { view: {}, order: {} };
      const list = await env.STATS.list();
      await Promise.all(list.keys.map(async ({ name }) => {
        const [type, n] = name.split(":");
        if (out[type]) out[type][n] = parseInt((await env.STATS.get(name)) || "0", 10);
      }));
      return new Response(JSON.stringify(out), {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response("method not allowed", { status: 405, headers: cors });
  },
};
