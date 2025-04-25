
interface Property {
  buildingName: string;
  unitNumber: string;
  availabilityDate: string;
  contactName: string;
  phone: string;
  email: string;
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
