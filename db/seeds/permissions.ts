import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PermissionRepository } from '@auth/repositories';

const permissionsToInsert = [
  { id: 1, name: 'Actualizar Políticas', codename: 'update_politics' },
  { id: 2, name: 'Consultar Políticas', codename: 'retrieve_politics' },
  { id: 3, name: 'Crear Usuarios', codename: 'create_users' },
  { id: 4, name: 'Listar Roles', codename: 'retrieve_roles' },
  { id: 5, name: 'Listar Permisos', codename: 'retrieve_permissions' },
  { id: 6, name: 'Crear Roles', codename: 'create_roles' },
  { id: 7, name: 'Ver Rol', codename: 'view_role' },
  { id: 8, name: 'Actualizar Rol', codename: 'update_role' },
  { id: 9, name: 'Eliminar Rol', codename: 'delete_role' },
  { id: 10, name: 'Listar Bitácoras', codename: 'retrieve_logs' },
  { id: 11, name: 'Listar Usuarios', codename: 'retrieve_users' },
  { id: 12, name: 'Generar Credenciales de Usuarios', codename: 'generate_user_credentials' },
  { id: 13, name: 'Gestionar Catálogos Académicos', codename: 'manage_academics_catalogues' },
  { id: 14, name: 'Eliminar Usuario', codename: 'delete_user' },
  { id: 15, name: 'Actualizar Usuario', codename: 'update_user' },
  { id: 16, name: 'Ver Usuario', codename: 'view_user' },
  { id: 17, name: 'Crear Estudiantes', codename: 'create_students' },
  { id: 18, name: 'Listar Estudiantes', codename: 'retrieve_students' },
  { id: 19, name: 'Gestionar Año Escolar', codename: 'manage_school_year' },
  { id: 20, name: 'Actualizar Estudiante', codename: 'update_student' },
  { id: 21, name: 'Visualizar Estudiante', codename: 'view_student' },
  { id: 22, name: 'Administrar Agenda', codename: 'manage_schedule' },
  { id: 23, name: 'Asignar Estudiantes', codename: 'assign_students' },
  { id: 24, name: 'Eliminar Estudiantes', codename: 'delete_student' },
  { id: 25, name: 'Gestionar Solicitudes de Consejería', codename: 'manage_requests' },
  { id: 26, name: 'Gestionar Faltas', codename: 'manage_fouls' },
  { id: 27, name: 'Listar Faltas', codename: 'view_fouls' },
  { id: 28, name: 'Gestionar Sanciones', codename: 'manage_sanctions' },
  { id: 29, name: 'Listar Sanciones', codename: 'view_sanctions' },
  { id: 30, name: 'Gestionar Pruebas Sociométricas', codename: 'manage_sociometric_tests' },
  {
    id: 31,
    name: 'Agregar Conclusión Final de Historial Académico y Conductual',
    codename: 'add_behavioral_history_conclusion',
  },
  { id: 32, name: 'Generar Reportes de Pruebas Sociométricas', codename: 'generate_sociometric_tests_reports' },
  { id: 33, name: 'Manejar Expedientes', codename: 'manage_expedient' },
  { id: 34, name: 'Generar Reportes de Sesiones', codename: 'generate_sessions_reports' },
  { id: 36, name: 'Agregar Anotación en Diario de Clases', codename: 'create_class_diary' },
  { id: 37, name: 'Actualizar Anotación en Diario de Clases', codename: 'update_class_diary' },
  { id: 38, name: 'Eliminar Anotación en Diario de Clases', codename: 'delete_class_diary' },
  { id: 41, name: 'Crear Asignación de Falta y Sanción', codename: 'create_fouls_sanction_assignation' },
  { id: 42, name: 'Actualizar una Asignación Específica', codename: 'update_fouls_sanction_assignation' },
  { id: 43, name: 'Eliminar un Asignación Específica', codename: 'delete_fouls_sanction_assignation' },
  { id: 44, name: 'Listar Diarios de Clases', codename: 'retrieve_class_diary' },
  { id: 46, name: 'Listar las Faltas Asignadas', codename: 'view_fouls_sanction_assignation' },
  {
    id: 47,
    name: 'Listar Historiales Académicos y Conductuales de Estudiantes',
    codename: 'retrieve_students_behavioral_history',
  },
];

export default class CreatePermissions implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const permissionRepository = connection.getCustomRepository(PermissionRepository);
    const permissions = await permissionRepository.find();
    const dbPermissionCodenames = permissions.map(permission => permission.codename);
    const filteredPermissions = permissionsToInsert.filter(
      permissionToInsert => !dbPermissionCodenames.includes(permissionToInsert.codename),
    );
    const lastPermission = permissionsToInsert[permissionsToInsert.length - 1];

    if (filteredPermissions.length) {
      await Promise.all(
        filteredPermissions.map(async permission => {
          console.log(`\nInserting permission with code ${permission.codename}`);
          await queryRunner.query(
            `INSERT INTO "public"."permission" (id, name, codename) VALUES (${permission.id}, '${permission.name}', '${permission.codename}');`,
          );
        }),
      );
      await queryRunner.query(`ALTER SEQUENCE permission_id_seq RESTART WITH ${lastPermission.id + 1};`);
    } else {
      console.log('\nAll permissions were inserted already');
    }
  }
}
