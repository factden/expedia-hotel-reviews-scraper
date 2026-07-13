# Examples

All real public review data collected with the actor (Bellagio, Las Vegas — `h140596`).

- **`input.json`** — a ready-to-run actor input (one Expedia hotel URL).
- **`reviews-output.sample.json`** — **3 real review rows** showing the full v1 field shape: a 10/10 stay, an 8/10,
  and a critical 4/10, each with the `subRatings` array, `travelCompanions` / `travelerCategories`, and the
  LLM-ready `markdownContent` block.
- **`reviews-sample.csv`** — **100 real reviews**, browsable right in GitHub's table view. CSV-flattened: `subRatings`
  and the array columns joined into one cell, `ownerResponse` split into `ownerResponse_text` / `ownerResponse_date`,
  and `markdownContent` omitted for readability.

Ratings are shown on the **/10 scale** to match Expedia's public display.

Run the actor for any hotel: **https://apify.com/factden/expedia-hotel-reviews-scraper?fpr=factden**
