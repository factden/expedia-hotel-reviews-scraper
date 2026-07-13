"""Run the Expedia Reviews Scraper on Apify and print the results.

Install:  pip install apify-client
Docs:     https://apify.com/factden/expedia-hotel-reviews-scraper
"""

from apify_client import ApifyClient

# Get your token from https://console.apify.com/settings/integrations
client = ApifyClient("<YOUR_APIFY_TOKEN>")

run_input = {
    "hotelUrls": [
        "https://www.expedia.com/Las-Vegas-Hotels-Bellagio.h140596.Hotel-Information",
    ],
    "maxReviewsPerHotel": 100,
    "sortBy": "newest",
}

# Start the actor and wait for it to finish
run = client.actor("factden/expedia-hotel-reviews-scraper").call(run_input=run_input)

# Iterate the resulting dataset (one row per review)
for row in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(f"{row.get('overallRating')}/10  {row.get('hotelName')}")
    if row.get("ownerResponse"):
        print("   ↳ hotel responded")
