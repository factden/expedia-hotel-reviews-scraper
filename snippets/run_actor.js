// Run the Expedia Reviews Scraper on Apify and print the results.
//
// Install:  npm install apify-client
// Docs:     https://apify.com/factden/expedia-hotel-reviews-scraper

import { ApifyClient } from 'apify-client';

// Get your token from https://console.apify.com/settings/integrations
const client = new ApifyClient({ token: '<YOUR_APIFY_TOKEN>' });

const input = {
    hotelUrls: [
        'https://www.expedia.com/Las-Vegas-Hotels-Bellagio.h140596.Hotel-Information',
    ],
    maxReviewsPerHotel: 100,
    sortBy: 'newest',
};

// Start the actor and wait for it to finish
const run = await client.actor('factden/expedia-hotel-reviews-scraper').call(input);

// Fetch the resulting dataset (one row per review)
const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const row of items) {
    console.log(`${row.overallRating}/10  ${row.hotelName}`);
    if (row.ownerResponse) {
        console.log('   ↳ hotel responded');
    }
}
