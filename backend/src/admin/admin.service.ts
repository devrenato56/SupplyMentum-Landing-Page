import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AdminService {
  constructor(private supabaseService: SupabaseService) {}

  async getApplicants() {
    const supabase = this.supabaseService.getClient();

    const { data } = await supabase
      .from('applicants')
      .select(
        'first_name, last_name, email, phone, career, university_semester, first_choice_area_id, second_choice_area_id, application_reason, created_at',
      );

    return data;
  }
}
