# Expedia Reviews Scraper — documentation

Public documentation and examples for the **Expedia Reviews Scraper** Apify actor. Scrape public Expedia hotel
reviews at scale — guest **ratings**, full **review text**, category **sub-ratings**, **stay dates**,
**traveler type**, **language**, and **hotel owner responses** — plus a per-review **LLM-ready markdown** block.
Export clean **JSON, CSV, Excel or via API**. No login, no Expedia API key.

> This repository holds **documentation and examples only** — no scraper source code. This is an initial version;
> content will be expanded and optimized over time.

## Why use it?

- **Reputation & sentiment analysis** — track guest sentiment for your own or competitor hotels over time.
- **Competitor benchmarking** — pull rating distributions, category sub-scores and review volume per property.
- **Market research** — analyze traveler types, languages and what guests praise or complain about.
- **AI / RAG pipelines** — every review ships with a self-contained `markdownContent` block ready for
  vector-DB ingestion.

## How to use

1. Open a hotel's page on Expedia and copy the URL (it contains a `.h<number>.` segment, e.g.
   `.../Las-Vegas-Hotels-Bellagio.h140596.Hotel-Information`).
2. Paste one or more such URLs (any Expedia Group site) or bare IDs into **Hotel URLs**.
3. (Optional) Set **Max reviews per hotel**, a **date range**, a **rating range**, a **sort order**, or **Review
   sources**.
4. Run it and download the results as JSON, CSV, Excel, or pull them from the API.

## Input

| Field | Description |
|---|---|
| **Hotel URLs or property IDs** (`hotelUrls`) | Expedia hotel-page URLs (any regional TLD, each with a `.h<id>.` segment), Hotels.com `/ho<id>/` URLs, **or bare property IDs** (`140596`). One per line. |
| **Max reviews per hotel** (`maxReviewsPerHotel`) | Cap per hotel (default 200). |
| **Sort reviews by** (`sortBy`) | `newest` (default), `oldest`, `highestRating`, `lowestRating`. |
| **From / To date** (`fromDate` / `toDate`) | Keep only reviews in a `YYYY-MM-DD` range. |
| **Min / Max rating** (`minRating` / `maxRating`) | Keep only reviews within a 1–5 rating range. |
| **Review sources** (`reviewSources`) | Which Expedia Group brands' reviews to return. Empty = all (cross-brand union). |
| **Proxy** (`proxyConfiguration`) | Datacenter is enough; use residential for very large runs. |

## Output

One item per hotel with the reviews nested under `reviews[]`. Views: **Reviews** (one row per review, default),
**Hotels** (one row per hotel with aggregates), and **AI ingest** (the LLM-ready
`markdownContent` column). Ratings are presented on the **/10 scale** to match Expedia's public display.

## Supported sites

Expedia plus the other Expedia Group brands — paste a **Hotels.com, Travelocity, Orbitz, Wotif, CheapTickets** or
**ebookers** hotel URL directly (Hotels.com `/ho<id>/` URLs are resolved automatically). Use **Review sources** to
pick which brands' reviews to return, or leave it empty for the cross-brand union.

## Pricing

Pay-per-event with **no start fee** — you pay only a per-review fee (see the Apify Console pricing panel). Lower
**Max reviews per hotel** to control cost. Your first runs are covered by Apify's free tier.

## Legal

This actor collects only **publicly available** review content. You are responsible for complying with Expedia's
Terms of Service and applicable laws (including data-protection rules) when using the data.

## Links

- Apify Store listing: _coming soon_
