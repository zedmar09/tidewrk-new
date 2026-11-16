export const contactIntro =
  "Tell us what you’re trying to deliver. We’ll get back to you within one business day.";

// "What brings you here?" options, matching the four routes (Website Direction §5.9).
export const serviceOptions = [
  "Build a product",
  "Scale my engineering team",
  "Support my back office",
  "Free up my time",
  "Not sure yet",
] as const;

export const contactLocations = [
  {
    region: "USA",
    phone: "(843) 654 - 1425",
    email: "info@tidewrk.com",
    addresses: [
      "3003 Dunes West Blvd., Suite 7, Mt. Pleasant, SC 29466",
      "80 Orville Drive, Suite 100, Bohemia New York, 11716",
    ],
  },
  {
    region: "Philippines",
    phone: "+63 (2) 8687 7519",
    email: "info@tidewrk.com",
    addresses: [
      "5F PHINMA Plaza, 39 Plaza Drive, 8 Rockwell, Rockwell Center Makati City, Manila",
    ],
  },
];
