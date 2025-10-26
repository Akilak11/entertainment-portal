import { User as UserType } from '@/shared/types';

export class UserModel {
  static async findByEmail(email: string): Promise<UserType | null> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    // return result.rows[0] || null;

    // Временная заглушка для тестирования
    if (email === 'test@example.com') {
      return {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        avatarUrl: '',
        bio: 'Test user bio',
        isVerified: true,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    return null;
  }

  static async findById(id: string): Promise<UserType | null> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    // return result.rows[0] || null;

    // Временная заглушка
    if (id === '1') {
      return {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        avatarUrl: '',
        bio: 'Test user bio',
        isVerified: true,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    return null;
  }

  static async create(userData: {
    email: string;
    username: string;
    passwordHash: string;
    firstName?: string;
    lastName?: string;
  }): Promise<UserType> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query(
    //   'INSERT INTO users (email, username, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    //   [userData.email, userData.username, userData.passwordHash, userData.firstName, userData.lastName]
    // );
    // return result.rows[0];

    // Временная заглушка
    return {
      id: Date.now().toString(),
      email: userData.email,
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      avatarUrl: '',
      bio: '',
      isVerified: false,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static async updateProfile(id: string, data: Partial<UserType>): Promise<UserType | null> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query(
    //   'UPDATE users SET username = $1, first_name = $2, last_name = $3, avatar_url = $4, bio = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
    //   [data.username, data.firstName, data.lastName, data.avatarUrl, data.bio, id]
    // );
    // return result.rows[0] || null;

    // Временная заглушка
    const user = await this.findById(id);
    if (user) {
      return { ...user, ...data, updatedAt: new Date() };
    }
    return null;
  }
}

