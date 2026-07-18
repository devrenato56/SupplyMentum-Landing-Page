// create-admin.js
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');

// Configura directamente aquí tus credenciales o cárgalas si usas dotenv
const SUPABASE_URL = 'https://hrmhechruvmjojlenxwg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Z_tPfvW9dycNxQgWW5ACGA_AxqcAEfU';

// Define aquí las credenciales del nuevo administrador
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createAdminUser() {
  try {
    console.log(`Generando hash para el usuario: ${ADMIN_USERNAME}...`);

    // 1. Encriptar la contraseña (10 rondas de sal es el estándar seguro)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    console.log('Insertando registro en Supabase...');

    // 2. Insertar la fila en la tabla 'admins'
    const { data, error } = await supabase
      .from('admins')
      .insert([
        {
          username: ADMIN_USERNAME,
          password_hash: passwordHash,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    console.log('¡Administrador creado con éxito!');
    console.log('Datos guardados:', data);
  } catch (error) {
    console.error('Error al crear el administrador:', error.message);
  }
}

createAdminUser();
