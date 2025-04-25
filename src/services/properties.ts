
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AdaUnit = Database['public']['Tables']['ada_units']['Row'];

export const fetchProperties = async (query?: string): Promise<AdaUnit[]> => {
  try {
    // Correct common misspellings
    const correctedQuery = query 
      ? query.replace(/Capital Hill/gi, 'Capitol Hill')
      : query;

    console.log('Fetching properties with query:', correctedQuery);
    
    let queryBuilder = supabase
      .from('ada_units')
      .select('*');
    
    if (correctedQuery) {
      queryBuilder = queryBuilder.ilike('neighborhood', `%${correctedQuery}%`);
    }
    
    const { data, error } = await queryBuilder;
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Properties fetched:', data?.length);
    return data || [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}

