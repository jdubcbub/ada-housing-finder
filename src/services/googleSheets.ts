
export interface Property {
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
    const response = await fetch('https://nmzbrzekynvyxkalxlvl.supabase.co/functions/v1/fetch-properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5temJyemVreW52eXhrYWx4bHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMTU5NzEsImV4cCI6MjAyNDY5MTk3MX0.v_oO4kVxNJUzMFOK7tFOSA-icFwcW6wXJ0gDt0HZqiU'
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
