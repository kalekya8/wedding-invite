export interface Couple {
  bride: {
    name: string;
    parents: {
      father: string;
      mother: string;
    };
  };
  groom: {
    name: string;
    parents: {
      father: string;
      mother: string;
    };
  };
  waxSealInitials: string;
}

export interface Venue {
  name: string;
  address: string;
  mapsUrl: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  dressCode: string;
  activities?: string[];
  drinks?: string;
  description: string;
}

export interface RSVPFormData {
  guestName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  foodPreference: 'vegetarian' | 'non-vegetarian';
  message?: string;
}

export const COUPLE_DATA: Couple = {
  bride: {
    name: 'Lohitha',
    parents: {
      father: 'Mr. RamaRao Kurapati',
      mother: 'Mrs. Rani Kurapati'
    }
  },
  groom: {
    name: 'Vivian',
    parents: {
      father: 'Mr. Raja Bhushan Kappala',
      mother: 'Mrs. Suhasini Beulah'
    }
  },
  waxSealInitials: 'LV'
};

export const WEDDING_VENUE: Venue = {
  name: 'Harpers by Bailey Farms',
  address: '3014 Scott St, New Virginia, IA 50210',
  mapsUrl: 'https://maps.app.goo.gl/4GtsyuwmNBHYHFnQ8'
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'haldi-mehendi',
    name: 'Haldi & Mehendi',
    date: '25 August',
    time: 'Evening',
    dressCode: 'Traditional with Yellow',
    activities: ['Haldi', 'Mehendi', 'Flowers', 'Water Balloons', 'Karaoke'],
    description: 'Celebrate the pre-wedding traditions with vibrant colors and joyful moments.'
  },
  {
    id: 'pellikuthuru',
    name: 'Pellikuthuru / Pellikoduku',
    date: '26 August',
    time: 'Evening',
    dressCode: 'Traditional',
    description: 'An intimate gathering to celebrate the bride\'s farewell and new beginnings.'
  },
  {
    id: 'ceremony',
    name: 'Wedding Ceremony',
    date: '27 August',
    time: 'Morning (11:07 AM)',
    dressCode: 'Traditional',
    description: 'Join us for the sacred union of two families in a beautiful ceremony.'
  },
  {
    id: 'reception',
    name: 'Reception',
    date: '27 August',
    time: 'Evening',
    dressCode: 'Traditional',
    drinks: 'Drinks & Dinner Available',
    description: 'Celebrate the joy and togetherness with music, dance, and delicious food.'
  }
];

export const WEDDING_DATE = new Date('2026-08-27T11:07:00-05:00');
export const WEDDING_DATE_STRING = '27 August 2026';
export const WEDDING_TIME = '11:07 AM';

export const COLOR_PALETTE = {
  sagePrimary: '#9CA88C',
  sageDark: '#7D8A71',
  cream: '#F6F1E7',
  gold: '#C8A24A',
  goldDark: '#A67C2E',
  floralWhite: '#FFFDF7'
};
