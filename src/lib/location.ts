export const BUSINESS_LOCATION = {
  streetAddress: "5031 168th ST SW STE 100",
  addressLocality: "Lynnwood",
  addressRegion: "WA",
  postalCode: "98037",
  addressCountry: "US",
} as const;

export const BUSINESS_ADDRESS_LINES = [
  BUSINESS_LOCATION.streetAddress,
  `${BUSINESS_LOCATION.addressLocality}, ${BUSINESS_LOCATION.addressRegion} ${BUSINESS_LOCATION.postalCode}`,
] as const;

export const BUSINESS_PHONE_DISPLAY = "425-742-4282";
export const BUSINESS_PHONE_TEL = "+14257424282";
export const BUSINESS_PHONE_STRUCTURED = "+1-425-742-4282";
