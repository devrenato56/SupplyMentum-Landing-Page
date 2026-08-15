import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

export interface MemberRole {
  role_id: number;
  name: string;
  sort_order: number;
  is_active: boolean;
}

export interface MemberArea {
  area_id: number;
  name: string;
  short_name: string | null;
}

export interface MemberRecord {
  member_id: number;
  full_name: string;
  role_id: number;
  area_id: number | null;
  description: string | null;
  image_path: string | null;
  linkedin_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  role?: MemberRole | null;
  area?: MemberArea | null;
}

@Injectable()
export class MembersService {
  private readonly tableName = 'members';

  private readonly publicColumns = `
    member_id,
    full_name,
    role_id,
    area_id,
    description,
    image_path,
    linkedin_url,
    sort_order,
    role:roles (
      role_id,
      name,
      sort_order,
      is_active
    ),
    area:areas (
      area_id,
      name,
      short_name
    )
  `;

  private readonly adminColumns = `
    member_id,
    full_name,
    role_id,
    area_id,
    description,
    image_path,
    linkedin_url,
    is_active,
    sort_order,
    created_at,
    updated_at,
    role:roles (
      role_id,
      name,
      sort_order,
      is_active
    ),
    area:areas (
      area_id,
      name,
      short_name
    )
  `;

  constructor(private readonly supabaseService: SupabaseService) {}

  /**
   * Ordena los miembros según la jerarquía del rol
   * y posteriormente por el orden individual del miembro.
   */
  private sortMembers(members: MemberRecord[]): MemberRecord[] {
    return [...members].sort((a, b) => {
      const roleOrderA = a.role?.sort_order ?? Number.MAX_SAFE_INTEGER;

      const roleOrderB = b.role?.sort_order ?? Number.MAX_SAFE_INTEGER;

      if (roleOrderA !== roleOrderB) {
        return roleOrderA - roleOrderB;
      }

      if (a.sort_order !== b.sort_order) {
        return a.sort_order - b.sort_order;
      }

      return a.member_id - b.member_id;
    });
  }

  /**
   * Verifica que el rol exista y esté activo.
   */
  private async validateRole(roleId: number): Promise<void> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('roles')
      .select('role_id, is_active')
      .eq('role_id', roleId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        `No se pudo validar el rol: ${error.message}`,
      );
    }

    if (!data) {
      throw new BadRequestException(`No existe un rol con el ID ${roleId}`);
    }

    if (!data.is_active) {
      throw new BadRequestException(
        `El rol con ID ${roleId} se encuentra desactivado`,
      );
    }
  }

  /**
   * Verifica que el área exista y esté activa.
   */
  private async validateArea(areaId: number): Promise<void> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('areas')
      .select('area_id, is_active')
      .eq('area_id', areaId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        `No se pudo validar el área: ${error.message}`,
      );
    }

    if (!data) {
      throw new BadRequestException(`No existe un área con el ID ${areaId}`);
    }

    if (!data.is_active) {
      throw new BadRequestException(
        `El área con ID ${areaId} se encuentra desactivada`,
      );
    }
  }

  /**
   * Obtiene los miembros visibles en la landing.
   */
  async findPublicAll() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from(this.tableName)
      .select(this.publicColumns)
      .eq('is_active', true);

    if (error) {
      throw new InternalServerErrorException(
        `No se pudieron obtener los miembros: ${error.message}`,
      );
    }

    const members = (data ?? []) as unknown as MemberRecord[];

    const visibleMembers = members.filter(
      (member) => member.role && member.role.is_active,
    );

    return this.sortMembers(visibleMembers);
  }

  /**
   * Obtiene un miembro activo para la landing.
   */
  async findPublicOne(memberId: number): Promise<MemberRecord> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from(this.tableName)
      .select(this.publicColumns)
      .eq('member_id', memberId)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        `No se pudo obtener el miembro: ${error.message}`,
      );
    }

    if (!data) {
      throw new NotFoundException(
        `No existe un miembro activo con el ID ${memberId}`,
      );
    }

    const member = data as unknown as MemberRecord;

    if (!member.role?.is_active) {
      throw new NotFoundException(
        `No existe un miembro activo con el ID ${memberId}`,
      );
    }

    return member;
  }

  /**
   * Obtiene todos los miembros para el CMS,
   * incluyendo los desactivados.
   */
  async findAdminAll() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from(this.tableName)
      .select(this.adminColumns);

    if (error) {
      throw new InternalServerErrorException(
        `No se pudieron obtener los miembros: ${error.message}`,
      );
    }

    const members = (data ?? []) as unknown as MemberRecord[];

    return this.sortMembers(members);
  }

  /**
   * Obtiene cualquier miembro mediante su ID.
   */
  async findAdminOne(memberId: number): Promise<MemberRecord> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from(this.tableName)
      .select(this.adminColumns)
      .eq('member_id', memberId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException(
        `No se pudo obtener el miembro: ${error.message}`,
      );
    }

    if (!data) {
      throw new NotFoundException(`No existe un miembro con el ID ${memberId}`);
    }

    return data as unknown as MemberRecord;
  }

  /**
   * Crea un nuevo miembro.
   */
  async create(createMemberDto: CreateMemberDto) {
    await this.validateRole(createMemberDto.role_id);

    if (
      createMemberDto.area_id !== undefined &&
      createMemberDto.area_id !== null
    ) {
      await this.validateArea(createMemberDto.area_id);
    }

    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from(this.tableName)
      .insert({
        full_name: createMemberDto.full_name,
        role_id: createMemberDto.role_id,
        area_id: createMemberDto.area_id ?? null,
        description: createMemberDto.description ?? null,
        image_path: createMemberDto.image_path ?? null,
        linkedin_url: createMemberDto.linkedin_url ?? null,
        is_active: createMemberDto.is_active ?? true,
        sort_order: createMemberDto.sort_order ?? 0,
      })
      .select(this.adminColumns)
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new ConflictException('Ya existe un miembro con esos datos');
      }

      if (error.code === '23503') {
        throw new BadRequestException(
          'El rol o el área especificada no existe',
        );
      }

      throw new InternalServerErrorException(
        `No se pudo crear el miembro: ${error.message}`,
      );
    }

    return data;
  }

  /**
   * Actualiza parcialmente un miembro existente.
   */
  async update(memberId: number, updateMemberDto: UpdateMemberDto) {
    await this.findAdminOne(memberId);

    if (updateMemberDto.role_id !== undefined) {
      await this.validateRole(updateMemberDto.role_id);
    }

    if (
      updateMemberDto.area_id !== undefined &&
      updateMemberDto.area_id !== null
    ) {
      await this.validateArea(updateMemberDto.area_id);
    }

    const updateData: Record<string, unknown> = {};

    if (updateMemberDto.full_name !== undefined) {
      updateData.full_name = updateMemberDto.full_name;
    }

    if (updateMemberDto.role_id !== undefined) {
      updateData.role_id = updateMemberDto.role_id;
    }

    if (updateMemberDto.area_id !== undefined) {
      updateData.area_id = updateMemberDto.area_id;
    }

    if (updateMemberDto.description !== undefined) {
      updateData.description = updateMemberDto.description;
    }

    if (updateMemberDto.image_path !== undefined) {
      updateData.image_path = updateMemberDto.image_path;
    }

    if (updateMemberDto.linkedin_url !== undefined) {
      updateData.linkedin_url = updateMemberDto.linkedin_url;
    }

    if (updateMemberDto.is_active !== undefined) {
      updateData.is_active = updateMemberDto.is_active;
    }

    if (updateMemberDto.sort_order !== undefined) {
      updateData.sort_order = updateMemberDto.sort_order;
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException(
        'Debe enviar al menos un campo para actualizar',
      );
    }

    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from(this.tableName)
      .update(updateData)
      .eq('member_id', memberId)
      .select(this.adminColumns)
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new ConflictException('Ya existe un miembro con esos datos');
      }

      if (error.code === '23503') {
        throw new BadRequestException(
          'El rol o el área especificada no existe',
        );
      }

      throw new InternalServerErrorException(
        `No se pudo actualizar el miembro: ${error.message}`,
      );
    }

    return data;
  }

  /**
   * Desactiva un miembro sin eliminarlo físicamente.
   */
  async remove(memberId: number) {
    await this.findAdminOne(memberId);

    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from(this.tableName)
      .update({
        is_active: false,
      })
      .eq('member_id', memberId)
      .select(this.adminColumns)
      .single();

    if (error) {
      throw new InternalServerErrorException(
        `No se pudo desactivar el miembro: ${error.message}`,
      );
    }

    return {
      message: 'Miembro desactivado correctamente',
      member: data,
    };
  }
}
