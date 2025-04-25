
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleSpreadsheet } from "npm:google-spreadsheet@4.1.1";
import { JWT } from "npm:google-auth-library@9.6.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const GOOGLE_PRIVATE_KEY = Deno.env.get('GOOGLE_PRIVATE_KEY')?.replace(/\\n/g, '\n');
    const GOOGLE_CLIENT_EMAIL = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const SHEET_ID = Deno.env.get('SHEET_ID');

    if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL || !SHEET_ID) {
      throw new Error('Missing required environment variables');
    }

    const jwt = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, jwt);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Assumes data is in first sheet
    const rows = await sheet.getRows();

    const properties = rows.map(row => ({
      buildingName: row.get('buildingName') || '',
      address: row.get('address') || '',
      neighborhood: row.get('neighborhood') || '',
      unitNumber: row.get('unitNumber') || '',
      occupied: row.get('occupied') || '',
      availabilityDate: row.get('availabilityDate') || '',
      squareFeet: Number(row.get('squareFeet')) || 0,
      bedrooms: Number(row.get('bedrooms')) || 0,
      bathrooms: Number(row.get('bathrooms')) || 0,
      rollInShower: row.get('rollInShower') || '',
      grabBars: row.get('grabBars') || '',
      wheelchairWidthDoors: row.get('wheelchairWidthDoors') || '',
      kitchenAccessible: row.get('kitchenAccessible') || '',
      elevatorAccess: row.get('elevatorAccess') || '',
      rent: Number(row.get('rent')) || 0,
      incomeRestricted: row.get('incomeRestricted') || '',
      contactName: row.get('contactName') || '',
      phone: row.get('phone') || '',
      email: row.get('email') || '',
      specialFeatures: row.get('specialFeatures') || '',
    }));

    const { query } = await req.json();
    let filteredProperties = properties;
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredProperties = properties.filter(property => 
        property.neighborhood.toLowerCase().includes(lowercaseQuery)
      );
    }

    return new Response(
      JSON.stringify(filteredProperties),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
