import { User as UserType } from '@/shared/types';

export class UserModel {
  static async findByEmail(email: string): Promise<UserType | null> {
    const { query } = await import('../utils/database');
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id.toString(),
      email: row.email,
      username: row.username,
      firstName: row.first_name,
      lastName: row.last_name,
      avatarUrl: row.avatar_url,
      bio: row.bio,
      isVerified: row.is_verified,
      role: row.role,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }

  static async findById(id: string): Promise<UserType | null> {
    const { query } = await import('../utils/database');
    const result = await query('SELECT * FROM users WHERE id = $1', [parseInt(id)]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id.toString(),
      email: row.email,
      username: row.username,
      firstName: row.first_name,
      lastName: row.last_name,
      avatarUrl: row.avatar_url,
      bio: row.bio,
      isVerified: row.is_verified,
      role: row.role,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }

  static async create(userData: {
    email: string;
    username: string;
    passwordHash: string;
    firstName?: string;
    lastName?: string;
  }): Promise<UserType> {
    const { query } = await import('../utils/database');
    const result = await query(
      'INSERT INTO users (email, username, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userData.email, userData.username, userData.passwordHash, userData.firstName, userData.lastName]
    );

    const row = result.rows[0];
    return {
      id: row.id.toString(),
      email: row.email,
      username: row.username,
      firstName: row.first_name,
      lastName: row.last_name,
      avatarUrl: row.avatar_url,
      bio: row.bio,
      isVerified: row.is_verified,
      role: row.role,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }

  static async updateProfile(id: string, data: Partial<UserType>): Promise<UserType | null> {
    const { query } = await import('../utils/database');
    const result = await query(
      'UPDATE users SET username = $1, first_name = $2, last_name = $3, avatar_url = $4, bio = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [data.username, data.firstName, data.lastName, data.avatarUrl, data.bio, parseInt(id)]
    );
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id.toString(),
      email: row.email,
      username: row.username,
      firstName: row.first_name,
      lastName: row.last_name,
      avatarUrl: row.avatar_url,
      bio: row.bio,
      isVerified: row.is_verified,
      role: row.role,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
}

