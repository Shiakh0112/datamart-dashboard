import { supabase } from '../config/supabaseClient.js';

export class ProductRepository {
  async findAll({ page = 1, limit = 20, search = '', category = '' }) {
    let query = supabase
      .from('products')
      .select('id, name, category, price, rating', { count: 'exact' });

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1).order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) throw error;

    return { data, total: count };
  }

  async findById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}
