
import type { Property } from '@/types/property';

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
      id: "1",
      building_name: "Skyline Apartments",
      address: "123 Main St",
      neighborhood: "Downtown",
      unit_number: "101",
      occupied: "N",
      date_of_availability: "2025-05-01",
      square_feet: 750,
      bedrooms: 1,
      bathrooms: 1,
      roll_in_shower: "Y",
      grab_bars: "Y",
      wheelchair_width_doors: "Y",
      kitchen_accessible: "Y",
      elevator_access: "Y",
      rent: 1500,
      income_restricted: "N",
      contact_name: "John Smith",
      phone: "555-123-4567",
      email: "john@example.com",
      special_features: "Near public transit, pet friendly"
    },
    {
      id: "2",
      building_name: "Harbor View",
      address: "456 Ocean Ave",
      neighborhood: "Waterfront",
      unit_number: "205",
      occupied: "N",
      date_of_availability: "2025-05-15",
      square_feet: 900,
      bedrooms: 2,
      bathrooms: 1.5,
      roll_in_shower: "N",
      grab_bars: "Y",
      wheelchair_width_doors: "Y",
      kitchen_accessible: "N",
      elevator_access: "Y",
      rent: 1800,
      income_restricted: "Y",
      contact_name: "Sarah Johnson",
      phone: "555-987-6543",
      email: "sarah@example.com",
      special_features: "Water view, fitness center"
    }
  ];
};
