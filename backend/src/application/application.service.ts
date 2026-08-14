import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ApplicationDto } from './dto/application.dto';

@Injectable()
export class ApplicationService {
  constructor(private supabaseService: SupabaseService) {}

  async listAreas() {
    const supabase = this.supabaseService.getClient();

    const { data: areas, error } = await supabase
      .from('areas')
      .select('area_id, name')
      .order('area_id');

    return areas;
  }

  async sendApplication(dto: ApplicationDto) {
    const supabase = this.supabaseService.getClient();

    if (dto.first_choice_area_id === dto.second_choice_area_id)
      throw new BadRequestException(
        'First choice and second choice areas must be different.',
      );

    const { error: error1 } = await supabase
      .from('areas')
      .select('area_id')
      .eq('area_id', dto.first_choice_area_id)
      .single();

    if (error1 && error1.code === 'PGRST116') {
      throw new NotFoundException('First choice area id does not exist.');
    }

    const { error: error2 } = await supabase
      .from('areas')
      .select('area_id')
      .eq('area_id', dto.second_choice_area_id)
      .single();

    if (error2 && error2.code === 'PGRST116') {
      throw new NotFoundException('Second choice area id does not exist.');
    }

    const { data, error } = await supabase
      .from('applicants')
      .insert(dto)
      .select()
      .single();

    if (error) {
      console.error(error.message);
      throw new InternalServerErrorException('Error, please try again.');
    }

    return data;
  }
}
