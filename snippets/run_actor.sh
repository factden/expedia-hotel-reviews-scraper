#!/usr/bin/env bash
# Run the Expedia Reviews Scraper on Apify with curl, then fetch the dataset.
# Docs: https://apify.com/factden/expedia-hotel-reviews-scraper

TOKEN="<YOUR_APIFY_TOKEN>"   # https://console.apify.com/settings/integrations

# Run the actor synchronously and get dataset items back in one call
curl -s -X POST \
  "https://api.apify.com/v2/acts/factden~expedia-hotel-reviews-scraper/run-sync-get-dataset-items?token=${TOKEN}" \
  -H 'Content-Type: application/json' \
  -d '{
    "hotelUrls": [
      "https://www.expedia.com/Las-Vegas-Hotels-Bellagio.h140596.Hotel-Information"
    ],
    "maxReviewsPerHotel": 100,
    "sortBy": "newest"
  }'
