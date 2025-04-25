import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type AdaUnit = Database['public']['Tables']['ada_units']['Row'];

export async function fetchProperties(searchQuery?: string): Promise<AdaUnit[]> {
  try {
    console.log('Fetching properties with query:', searchQuery);

    let queryBuilder = supabase
      .from('ada_units')
      .select('*')
      .eq('occupied', 'N'); // ✅ Only get AVAILABLE units

    if (searchQuery) {
      queryBuilder = queryBuilder.ilike('neighborhood', `%${searchQuery}%`);
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
