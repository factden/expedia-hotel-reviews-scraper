# Output fields

The Expedia Reviews Scraper produces **two datasets**. The **Reviews** dataset (the default) has one row per public
guest review, with the hotel context merged onto each row. The **Hotels** dataset has one row per hotel with the
aggregates. Ratings are on the **/10 scale** to match Expedia's public display. Fields a given property doesn't
provide are `null` (or an empty array).

## Reviews dataset

Each row starts with the hotel context, then the review fields.

| Field | Type | Description |
|---|---|---|
| `hotelId` | string | Expedia Group property ID (the `.h<id>.` segment; shared across Expedia Group brands). |
| `hotelName` | string \| null | Hotel display name. |
| `hotelUrl` | string | The hotel-page URL that produced this row. |
| `source` | string | Which brand the URL resolved to (e.g. `expedia`, `hotels`). |
| `reviewId` | string | Unique review identifier. |
| `submittedAt` | string \| null | Review date, `YYYY-MM-DD` (day precision). |
| `overallRating` | number \| null | Overall guest rating on the **0–10** scale. |
| `ratingLabel` | string \| null | Rating tier label (e.g. Excellent, Good). |
| `reviewText` | string \| null | Review body. |
| `verified` | boolean | Whether the review is a verified (booking-backed) review. |
| `reviewerName` | string \| null | Reviewer display name; `null` when anonymous. |
| `language` | string \| null | Review language code; `en` for device-language reviews, the original locale for translated ones. |
| `isMachineTranslated` | boolean | Whether the text was machine-translated. |
| `helpfulVotes` | integer | Helpful-vote count on the review. |
| `imagesCount` | integer | Number of guest photos attached to the review. |
| `reviewPhotos` | array | URLs of guest photos attached to the review (where present). |
| `ownerResponse` | object \| null | Hotel owner / management reply `{ text, date, responder }`, or `null` when none. |
| `isAnonymous` | boolean | Whether the review was posted anonymously. |
| `markdownContent` | string \| null | **LLM-ready** self-contained markdown block for the review — drop straight into a RAG pipeline. |
| `subRatings`, `reviewerLocation`, `checkInDate`, `checkOutDate`, `travelCompanions`, `travelerCategories`, `roomTypeId`, `brandType` | kept | Retained in the schema for compatibility but **no longer provided by Expedia** — always `null` / empty. |

## Hotels dataset

One row per hotel (the aggregates). Starts with the same hotel context (`hotelId`, `hotelName`, `hotelUrl`,
`source`), then:

| Field | Type | Description |
|---|---|---|
| `avgOverallRating` | number \| null | Overall property score on the **0–10** scale. |
| `totalReviewCount` | integer | Total public reviews Expedia reports for the property. |
| `hotelSubRatings` | array | Property-level category sub-scores (labeled-string array), e.g. `["Cleanliness: 9.8", "Location: 9.2"]`. |
| `reviewsExtracted` | integer | How many reviews this run actually delivered for the hotel. |
| `extractedAt` | string (ISO datetime) | When the hotel row was scraped (UTC ISO 8601). |
| `brandName`, `structureType`, `latitude`, `longitude`, `halfLifeRating`, `ratingDistribution`, `categoryCounts`, `languageCounts` | kept | Retained in the schema for compatibility but **no longer provided by Expedia** — always `null`. |

## Dataset views

The Reviews dataset ships two pre-built views you can switch between in the Console or request via the API:

- **Overview** — the columns most users want first (hotel, rating, review text, reviewer, review photos, owner response).
- **AI ingest (LLM-ready)** — `markdownContent` plus the original text, language, rating and source — optimized for
  vector-DB / RAG loading.
