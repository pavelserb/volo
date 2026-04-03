import type { Locale } from '@/i18n/types';
import type { Addon, Review, SKU } from './mock';

type SkuPatch = Partial<
  Pick<
    SKU,
    | 'name'
    | 'direction'
    | 'description'
    | 'longDescription'
    | 'priceLabel'
    | 'capacityUnit'
    | 'includes'
    | 'cancellationPolicy'
  >
> & {
  addons?: (Partial<Pick<Addon, 'name' | 'description'>> & { id: string })[];
  reviews?: Partial<Pick<Review, 'text' | 'id'>>[];
};

const enPatches: Record<string, SkuPatch> = {
  'heli-scenic-20': {
    name: 'Scenic flight over Kraków',
    direction: 'Helicopter flights',
    description:
      'Discover Kraków from above on an unforgettable helicopter flight. 20 minutes of views you will remember forever.',
    longDescription: `Rise above Kraków and feel the magic of the city from the sky. The route covers the Old Town panorama, Wawel Royal Castle, bends of the Vistula, and — in good weather — distant Tatra peaks on the horizon.

The flight lasts 20 minutes and is flown by an experienced pilot with a commercial licence. Before take-off you receive a short safety and route briefing. The helicopter departs from a helipad about 15 minutes from central Kraków.`,
    priceLabel: 'PLN / person',
    capacityUnit: 'seat',
    includes: [
      'Helicopter flight — 20 minutes',
      'Passenger insurance',
      'Pilot briefing before flight',
      'Souvenir photo by the helicopter',
    ],
    cancellationPolicy:
      'Free cancellation up to 48h before the flight. If cancelled due to weather — full refund or free reschedule.',
    addons: [
      {
        id: 'addon-video',
        name: 'Flight video',
        description: 'Professional video from a GoPro mounted on the helicopter',
      },
      {
        id: 'addon-champagne',
        name: 'Champagne on board',
        description: 'A bottle of champagne after landing (for safety — after the flight)',
      },
    ],
    reviews: [
      {
        id: 'r1',
        text: 'Incredible experience! Views of Wawel and the Tatras are breathtaking. The pilot was very professional and shared interesting facts about the city.',
      },
      {
        id: 'r2',
        text: 'Great gift idea. My husband loved it! Flawless organisation — from briefing to landing.',
      },
      {
        id: 'r3',
        text: 'The flight felt a bit shorter than I expected, but the views make up for everything. Worth paying extra for the video — a great keepsake.',
      },
    ],
  },
  'transfer-vip': {
    name: 'VIP transfer: airport ↔ city centre',
    direction: 'VIP transfers',
    description:
      'Comfortable transfer to/from Kraków-Balice airport in a luxury sedan. Your driver waits with a name sign.',
    longDescription: `Forget taxi queues and uncertainty after your flight. Your driver meets you in arrivals with a sign bearing your name.

The transfer is in a premium-class sedan (Mercedes E-Class or equivalent). Chilled water and Wi‑Fi on board. Journey time to the centre is about 25–35 minutes depending on traffic.

The service covers up to 4 passengers and standard luggage. An extra stop en route is available on request.`,
    priceLabel: 'PLN / ride',
    capacityUnit: 'ride',
    includes: [
      'Premium-class car (Mercedes E-Class)',
      'Driver with sign in arrivals',
      'Mineral water and Wi‑Fi',
      'Up to 4 passengers + standard luggage',
    ],
    cancellationPolicy:
      'Free cancellation up to 24h before the transfer. Later cancellation — 50% fee.',
    addons: [
      {
        id: 'addon-childseat',
        name: 'Child seat',
        description: 'Car seat for children (free of charge)',
      },
      {
        id: 'addon-stop',
        name: 'Extra stop',
        description: 'One additional stop en route (up to 15 minutes)',
      },
    ],
    reviews: [
      {
        id: 'r4',
        text: 'Punctual, clean car, friendly driver. Perfect after a long flight. Highly recommend.',
      },
      {
        id: 'r5',
        text: 'Comfortable, stress-free transfer. Fair price for the quality. Only minus — no card payment on site.',
      },
    ],
  },
};

function patchAddons(sku: SKU, patch?: SkuPatch['addons']): Addon[] {
  if (!patch) return sku.addons;
  return sku.addons.map((a) => {
    const p = patch.find((x) => x.id === a.id);
    if (!p) return a;
    const { id: _id, ...rest } = p;
    return { ...a, ...rest };
  });
}

function patchReviews(sku: SKU, patch?: SkuPatch['reviews']): Review[] {
  if (!patch) return sku.reviews;
  return sku.reviews.map((r) => {
    const p = patch.find((x) => x.id === r.id);
    if (!p?.text) return r;
    return { ...r, text: p.text };
  });
}

export function localizeSku(sku: SKU, locale: Locale): SKU {
  if (locale === 'pl') return sku;
  const patch = enPatches[sku.id];
  if (!patch) return sku;
  return {
    ...sku,
    name: patch.name ?? sku.name,
    direction: patch.direction ?? sku.direction,
    description: patch.description ?? sku.description,
    longDescription: patch.longDescription ?? sku.longDescription,
    priceLabel: patch.priceLabel ?? sku.priceLabel,
    capacityUnit: patch.capacityUnit ?? sku.capacityUnit,
    includes: patch.includes ?? sku.includes,
    cancellationPolicy: patch.cancellationPolicy ?? sku.cancellationPolicy,
    addons: patch.addons ? patchAddons(sku, patch.addons) : sku.addons,
    reviews: patch.reviews ? patchReviews(sku, patch.reviews) : sku.reviews,
  };
}

export function localizeSkus(list: SKU[], locale: Locale): SKU[] {
  return list.map((s) => localizeSku(s, locale));
}
