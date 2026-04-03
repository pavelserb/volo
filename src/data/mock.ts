export interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Slot {
  id: string;
  date: string;
  time: string;
  remaining: number;
  total: number;
}

export interface SKU {
  id: string;
  slug: string;
  name: string;
  direction: string;
  directionSlug: string;
  city: string;
  citySlug: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  priceModel: 'per_unit' | 'per_slot';
  price: number;
  priceLabel: string;
  buyoutPrice?: number;
  capacityModel: 'exclusive' | 'shared' | 'shared_buyout';
  capacityTotal: number;
  capacityUnit: string;
  durationMinutes: number;
  includes: string[];
  cancellationPolicy: string;
  confirmationModel: 'instant' | 'request';
  paymentModel: 'full' | 'deposit';
  depositPercent?: number;
  addons: Addon[];
  reviews: Review[];
  averageRating: number;
}

export interface Booking {
  id: string;
  skuId: string;
  skuName: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending_confirmation' | 'completed' | 'cancelled';
  image: string;
}

export interface Gift {
  id: string;
  skuId: string;
  skuName: string;
  type: 'bought' | 'received';
  recipientName?: string;
  buyerName?: string;
  status: 'pending_activation' | 'activated' | 'used' | 'expired';
  code: string;
  purchaseDate: string;
  expiryDate: string;
  image: string;
}

function generateSlots(total: number, isExclusive: boolean): Slot[] {
  const slots: Slot[] = [];
  const today = new Date();
  const times = isExclusive
    ? ['09:00', '11:00', '14:00', '17:00']
    : ['10:00', '12:00', '15:00'];
  for (let d = 1; d <= 14; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    const dateStr = date.toISOString().split('T')[0];
    const dayTimes = d % 3 === 0 ? times.slice(0, 2) : times;
    for (const time of dayTimes) {
      const remaining = isExclusive ? 1 : [1, 2, 3, 2, 3, 1, 3][slots.length % 7];
      slots.push({
        id: `slot-${dateStr}-${time}`,
        date: dateStr,
        time,
        remaining,
        total,
      });
    }
  }
  return slots;
}

export const heliSlots = generateSlots(3, false);
export const transferSlots = generateSlots(1, true);

export const skus: SKU[] = [
  {
    id: 'heli-scenic-20',
    slug: 'lot-widokowy-nad-krakowem',
    name: 'Lot widokowy nad Krakowem',
    direction: 'Loty helikopterem',
    directionSlug: 'helicopters',
    city: 'Kraków',
    citySlug: 'krakow',
    description: 'Odkryj Kraków z perspektywy ptaka podczas niezapomnianego lotu helikopterem. 20 minut widoków, które zapamiętasz na zawsze.',
    longDescription: `Wzbij się nad Kraków i poczuj magię miasta widzianego z góry. Trasa lotu obejmuje panoramę Starego Miasta, Zamek Królewski na Wawelu, zakola Wisły i — przy dobrej pogodzie — odległe szczyty Tatr na horyzoncie.\n\nLot trwa 20 minut i jest prowadzony przez doświadczonego pilota z licencją komercyjną. Przed startem otrzymasz krótki briefing dotyczący bezpieczeństwa i trasy. Helikopter startuje z lądowiska oddalonego ok. 15 minut od centrum Krakowa.`,
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
    priceModel: 'per_unit',
    price: 899,
    priceLabel: 'PLN / os.',
    buyoutPrice: 2399,
    capacityModel: 'shared_buyout',
    capacityTotal: 3,
    capacityUnit: 'miejsce',
    durationMinutes: 20,
    includes: [
      'Lot helikopterem — 20 minut',
      'Ubezpieczenie pasażera',
      'Briefing pilota przed lotem',
      'Zdjęcie pamiątkowe przy helikopterze',
    ],
    cancellationPolicy: 'Bezpłatna anulacja do 48h przed lotem. W przypadku odwołania z powodu pogody — pełny zwrot lub bezpłatne przełożenie.',
    confirmationModel: 'request',
    paymentModel: 'full',
    addons: [
      { id: 'addon-video', name: 'Wideorelacja z lotu', price: 199, description: 'Profesjonalna wideorelacja z kamery GoPro zamontowanej na helikopterze' },
      { id: 'addon-champagne', name: 'Szampan na pokładzie', price: 149, description: 'Butelka szampana do wypicia po lądowaniu (ze względów bezpieczeństwa — po locie)' },
    ],
    reviews: [
      { id: 'r1', author: 'Marta K.', rating: 5, text: 'Niesamowite przeżycie! Widoki na Wawel i Tatry zapierają dech. Pilot bardzo profesjonalny i opowiadał ciekawostki o mieście.', date: '2025-09-14' },
      { id: 'r2', author: 'Anna W.', rating: 5, text: 'Świetny pomysł na prezent. Mój mąż był zachwycony! Organizacja bez zarzutu — od briefingu po lądowanie.', date: '2025-08-22' },
      { id: 'r3', author: 'Tomasz P.', rating: 4, text: 'Lot trochę krótszy niż oczekiwałem, ale widoki rekompensują wszystko. Warto dopłacić za wideo — świetna pamiątka.', date: '2025-07-30' },
    ],
    averageRating: 4.7,
  },
  {
    id: 'transfer-vip',
    slug: 'vip-transfer-lotnisko',
    name: 'VIP Transfer: lotnisko ↔ centrum',
    direction: 'Transfery VIP',
    directionSlug: 'transfers',
    city: 'Kraków',
    citySlug: 'krakow',
    description: 'Komfortowy transfer z/do lotniska Kraków-Balice luksusowym sedanem. Kierowca czeka na Ciebie z tabliczką.',
    longDescription: `Zapomnij o kolejkach do taksówek i niepewności komunikacji miejskiej. Twój kierowca czeka na Ciebie w hali przylotów z tabliczką z Twoim imieniem.\n\nTransfer odbywa się luksusowym sedanem klasy premium (Mercedes E-klasa lub equivalent). W aucie czeka schłodzona woda mineralna i Wi-Fi. Czas przejazdu do centrum — około 25-35 minut w zależności od ruchu.\n\nUsługa obejmuje do 4 pasażerów i standardowy bagaż. Dodatkowy postój w drodze — na życzenie.`,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop',
    ],
    priceModel: 'per_slot',
    price: 349,
    priceLabel: 'PLN / przejazd',
    capacityModel: 'exclusive',
    capacityTotal: 1,
    capacityUnit: 'przejazd',
    durationMinutes: 30,
    includes: [
      'Samochód klasy premium (Mercedes E-klasa)',
      'Kierowca z tabliczką w hali przylotów',
      'Woda mineralna i Wi-Fi',
      'Do 4 pasażerów + bagaż standardowy',
    ],
    cancellationPolicy: 'Bezpłatna anulacja do 24h przed transferem. Późniejsza anulacja — opłata 50%.',
    confirmationModel: 'instant',
    paymentModel: 'full',
    addons: [
      { id: 'addon-childseat', name: 'Fotelik dziecięcy', price: 0, description: 'Fotelik samochodowy dla dziecka (bezpłatnie)' },
      { id: 'addon-stop', name: 'Dodatkowy postój', price: 49, description: 'Jeden dodatkowy postój w drodze (do 15 minut)' },
    ],
    reviews: [
      { id: 'r4', author: 'Jan M.', rating: 5, text: 'Punktualny, czysty samochód, miły kierowca. Idealne rozwiązanie po długim locie. Polecam.', date: '2025-10-05' },
      { id: 'r5', author: 'Katarzyna L.', rating: 4, text: 'Wygodny transfer, bez stresu. Cena adekwatna do jakości. Jedyny minus — brak opcji płatności kartą na miejscu.', date: '2025-09-18' },
    ],
    averageRating: 4.5,
  },
];

export function getSkuBySlug(slug: string): SKU | undefined {
  return skus.find((s) => s.slug === slug);
}

export function getSkuById(id: string): SKU | undefined {
  return skus.find((s) => s.id === id);
}

export function getSlotsForSku(skuId: string): Slot[] {
  if (skuId === 'heli-scenic-20') return heliSlots;
  if (skuId === 'transfer-vip') return transferSlots;
  return [];
}

const futureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

const pastDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
};

export const mockBookings: Booking[] = [
  {
    id: 'BK-2024-001',
    skuId: 'heli-scenic-20',
    skuName: 'Lot widokowy nad Krakowem',
    date: futureDate(5),
    time: '12:00',
    guests: 2,
    totalPrice: 1798,
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&h=300&fit=crop',
  },
  {
    id: 'BK-2024-002',
    skuId: 'transfer-vip',
    skuName: 'VIP Transfer: lotnisko ↔ centrum',
    date: pastDate(12),
    time: '14:00',
    guests: 2,
    totalPrice: 349,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
  },
];

export const mockGifts: Gift[] = [
  {
    id: 'GF-2024-001',
    skuId: 'heli-scenic-20',
    skuName: 'Lot widokowy nad Krakowem',
    type: 'bought',
    recipientName: 'Marek',
    status: 'pending_activation',
    code: 'VOLO-GIFT-7X3K9',
    purchaseDate: pastDate(3),
    expiryDate: futureDate(362),
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&h=300&fit=crop',
  },
  {
    id: 'GF-2024-002',
    skuId: 'heli-scenic-20',
    skuName: 'Lot widokowy nad Krakowem',
    type: 'received',
    buyerName: 'Ewa',
    status: 'activated',
    code: 'VOLO-GIFT-M2P8Q',
    purchaseDate: pastDate(30),
    expiryDate: futureDate(335),
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&h=300&fit=crop',
  },
];

export const mockUser = {
  name: 'Kasia Nowak',
  email: 'kasia@example.com',
  phone: '+48 600 123 456',
};
