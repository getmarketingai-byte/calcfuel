# MCP servers for the AdSense verify loop

**Installed:** 2026-08-21 · user scope (`~/.claude.json`), so they are available in every project, not just this repo.

These shorten the loop between changing the site and knowing whether it still passes. None of them replace `npm run audit:adsense` — that gate is the deterministic check. See [adsense-remediation-spec.md](adsense-remediation-spec.md) §6.

| Server | Status | Needs |
|--------|--------|-------|
| `lighthouse` | Working now | nothing |
| `gsc` | Connected, needs credentials | Google Cloud OAuth client secrets file |
| `pagespeed` | Connected, needs credentials | Google API key in the shell environment |

Check health at any time with `claude mcp list`.

---

## lighthouse — ready

```
npx -y lighthouse-mcp
```

Runs the AC7 accessibility checks without leaving the session. Tools: `run_audit` (url, categories, device, throttling) and `get_performance_score`.

Nothing further to do.

---

## gsc — one credentials file to add

The only source of truth for what Google **actually indexed**, as opposed to what the sitemap claims. After the CalcFuel deploy it answers the two questions the gate cannot: were the ~80 retired URLs processed as 410, and is any marketing URL still sitting in the index.

Runs `mcp-search-console` via `uvx` (installed with `brew install uv`).

### What you need to do

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and create or select a project.
2. **APIs & Services → Library →** enable **Search Console API**.
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**, application type **Desktop app**.
4. Download the JSON and save it exactly here:

```
~/.config/gsc/client_secrets.json
```

5. In an interactive `claude` session, ask it to list your Search Console properties. The server opens a browser once for consent and caches the token; after that it is silent.

You also need `calcfuel.com` verified as a property in Search Console under the same Google account.

### Useful tools once connected

`list_properties`, `get_search_analytics`, `inspect_url_enhanced`, `batch_url_inspection`, `check_indexing_issues`, `list_sitemaps_enhanced`, `manage_sitemaps`, `compare_search_periods`.

### Note on `UV_CACHE_DIR`

The server config pins `UV_CACHE_DIR` to `~/.local/uv-cache` because `~/.cache` on this machine is **owned by root** (`drwxr-xr-x root staff`) and the user cannot write to it. That will also break other tools that expect a writable XDG cache. The broader fix, when convenient:

```bash
sudo chown -R "$(id -un)":staff ~/.cache
```

---

## pagespeed — one API key to add

Adds Chrome UX Report field data on top of lab metrics. Honest caveat: **CrUX only returns data for origins with enough real traffic**, so this stays mostly empty until CalcFuel has meaningful visitors. Lab-based tools (`analyze_page_speed`, `get_recommendations`) work immediately.

### What you need to do

1. Same Google Cloud project — **enable PageSpeed Insights API**.
2. **Credentials → Create Credentials → API key**, and copy it.
3. Export it in your shell profile:

```bash
echo 'export GOOGLE_PAGESPEED_API_KEY="paste-key-here"' >> ~/.zshrc
```

The server config reads `${GOOGLE_PAGESPEED_API_KEY}` rather than storing the key in `~/.claude.json`, so the key never lands in a config file. Restart your terminal afterwards.

---

## Deliberately not installed

| Tool | Why not |
|------|---------|
| `seo-audit-mcp` | Built for job boards — JobPosting schema validation, expired-job detection. Its general crawl is a strict subset of `npm run audit:adsense`. |
| Ahrefs / Semrush MCP | Paid, and aimed at keyword and ranking work. Neither has any bearing on an AdSense approval decision. |
| "AdSense eligibility checkers" | Not MCP servers — third-party web tools. They have no access to Google's classifier and re-check `ads.txt` and word counts, both of which already passed before the first rejection. |

Ask if you want any of these anyway.
