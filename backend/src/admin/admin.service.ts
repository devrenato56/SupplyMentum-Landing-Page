import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AdminService {
  constructor(private supabaseService: SupabaseService) {}

  async getApplicants() {
    const supabase = this.supabaseService.getClient();

    const { data } = await supabase.from('applicants').select('*');

    return data;
  }
}
