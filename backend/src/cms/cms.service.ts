import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UpsertCmsSectionDto } from './dto/upsert-cms-section.dto';

type CmsSection = {
  section_key: string;
  title: string | null;
  payload: Record<string, unknown>;
  updated_at: string | null;
};

@Injectable()
export class CmsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async listSections() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('cms_sections')
      .select('section_key, title, payload, updated_at')
      .order('section_key');

    if (error) {
      throw new InternalServerErrorException('Unable to load CMS sections.');
    }

    return (data ?? []) as CmsSection[];
  }

  async getSection(sectionKey: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('cms_sections')
      .select('section_key, title, payload, updated_at')
      .eq('section_key', sectionKey)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundException(`CMS section "${sectionKey}" not found.`);
      }

      throw new InternalServerErrorException('Unable to load CMS section.');
    }

    return data as CmsSection;
  }

  async upsertSection(sectionKey: string, dto: UpsertCmsSectionDto) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('cms_sections')
      .upsert(
        {
          section_key: sectionKey,
          title: dto.title ?? null,
          payload: dto.payload,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'section_key' },
      )
      .select('section_key, title, payload, updated_at')
      .single();

    if (error) {
      throw new InternalServerErrorException('Unable to save CMS section.');
    }

    return data as CmsSection;
  }
}