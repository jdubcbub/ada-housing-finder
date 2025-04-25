
import { Property } from './googleSheets';

export const fetchProperties = async (query?: string): Promise<Property[]> => {
  try {
    console.log('Fetching properties with query:', query);
    const response = await fetch('https://nmzbrzekynvyxkalxlvl.supabase.co/functions/v1/fetch-properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5temJyemVreW52eXhrYWx4bHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMTU5NzEsImV4cCI6MjAyNDY5MTk3MX0.v_oO4kVxNJUzMFOK7tFOSA-icFwcW6wXJ0gDt0HZqiU'
      },
      body: JSON.stringify({ query: query || '' }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch error details:', {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText
      });
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Properties received:', data.length);
    return data;
  } catch (error) {
    console.error('Comprehensive fetch properties error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return [];
  }
};
