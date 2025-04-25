// Define the Property interface locally first
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
    console.log('Fetching properties with query:', query);
    
    // Add more detailed logging
    console.log('Fetch URL:', 'https://nmzbrzekynvyxkalxlvl.supabase.co/functions/v1/fetch-properties');
    
    // Add a short timeout to allow for network issues
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
      const response = await fetch('https://nmzbrzekynvyxkalxlvl.supabase.co/functions/v1/fetch-properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5temJyemVreW52eXhrYWx4bHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMTU5NzEsImV4cCI6MjAyNDY5MTk3MX0.v_oO4kVxNJUzMFOK7tFOSA-icFwcW6wXJ0gDt0HZqiU'
        },
        body: JSON.stringify({ query: query || '' }),
        signal: controller.signal,
        // Adding mode and credentials to handle potential CORS issues
        mode: 'cors',
      });
    
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Detailed fetch error:', {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorText
        });
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Properties received:', data.length);
      return data;
    } catch (fetchError) {
      console.error('Fetch request error:', {
        name: fetchError.name,
        message: fetchError.message,
        stack: fetchError.stack
      });
      throw fetchError;
    }
  } catch (error) {
    console.error('Comprehensive fetch properties error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // For development purposes, return some mock data to check if UI works
    if (process.env.NODE_ENV === 'development') {
      console.log('Returning mock data for development');
      return getMockProperties();
    }
    
    return [];
  }
};

// Helper function to generate mock data for development testing
const getMockProperties = (): Property[] => {
  return [
    {
      buildingName: "Skyline Apartments",
      address: "123 Main St",
      neighborhood: "Downtown",
      unitNumber: "101",
      occupied: "N",
      availabilityDate: "2025-05-01",
      squareFeet: 750,
      bedrooms: 1,
      bathrooms: 1,
      rollInShower: "Y",
      grabBars: "Y",
      wheelchairWidthDoors: "Y",
      kitchenAccessible: "Y",
      elevatorAccess: "Y",
      rent: 1500,
      incomeRestricted: "N",
      contactName: "John Smith",
      phone: "555-123-4567",
      email: "john@example.com",
      specialFeatures: "Near public transit, pet friendly"
    },
    {
      buildingName: "Harbor View",
      address: "456 Ocean Ave",
      neighborhood: "Waterfront",
      unitNumber: "205",
      occupied: "N",
      availabilityDate: "2025-05-15",
      squareFeet: 900,
      bedrooms: 2,
      bathrooms: 1.5,
      rollInShower: "N",
      grabBars: "Y",
      wheelchairWidthDoors: "Y",
      kitchenAccessible: "N",
      elevatorAccess: "Y",
      rent: 1800,
      incomeRestricted: "Y",
      contactName: "Sarah Johnson",
      phone: "555-987-6543",
      email: "sarah@example.com",
      specialFeatures: "Water view, fitness center"
    }
  ];
};
