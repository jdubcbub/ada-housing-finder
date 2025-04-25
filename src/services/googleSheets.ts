
interface Property {
  buildingName: string;
  address: string;
  neighborhood: string;
  unitNumber: string;
  occupied: string;
  availabilityDate: string;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  rollInShower: string;
  grabBars: string;
  wheelchairWidthDoors: string;
  kitchenAccessible: string;
  elevatorAccess: string;
  rent: number;
  incomeRestricted: string;
  contactName: string;
  phone: string;
  email: string;
  specialFeatures: string;
}

export const fetchProperties = async (query?: string): Promise<Property[]> => {
  try {
    const response = await fetch('https://<your-project>.supabase.co/functions/fetch-properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};
