const API_BASE = "https://tbclanportal.com/api/v1/clan";
const TTL = 15 * 60 * 1000;
const ALLOWED = { aggregates: 1, "chest-data": 1, members: 1 };
const mem = new Map();

export default async (req) => {
	const key = process.env.TBCP_API_KEY;
	if (!key) return json({ error: "proxy not configured" }, 500);
	const url = new URL(req.url);
	const endpoint = url.searchParams.get("endpoint");
	if (!ALLOWED[endpoint]) return json({ error: "unknown endpoint" }, 400);
	const qs = new URLSearchParams();
	for (const k of ["from", "to", "include_former"]) {
		const v = url.searchParams.get(k);
		if (v != null) qs.set(k, v);
	}
	const upstream = `${API_BASE}/${endpoint}${qs.toString() ? `?${qs}` : ""}`;
	const hit = mem.get(upstream);
	if (hit && Date.now() - hit.t < TTL) return json(hit.body, 200, "HIT");
	try {
		const r = await fetch(upstream, { headers: { Authorization: `Bearer ${key}`, Accept: "application/json" } });
		if (!r.ok) return json({ error: "upstream", status: r.status }, r.status === 429 ? 429 : 502);
		const body = await r.json();
		mem.set(upstream, { t: Date.now(), body });
		return json(body, 200, "MISS");
	} catch (e) {
		return json({ error: "fetch failed" }, 502);
	}
};
function json(obj, status = 200, cache = "SKIP") {
	return new Response(JSON.stringify(obj), {
		status,
		headers: {
			"content-type": "application/json",
			"cache-control": "public, max-age=300, s-maxage=300",
			"x-proxy-cache": cache
		}
	});
}
export const config = { path: "/api/clan" };
