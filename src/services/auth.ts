import { User } from '../types';

const AUTH_STORAGE_KEY = 'smn_auth_user_session';
const USERS_STORAGE_KEY = 'smn_registered_users_db';

interface StoredUser extends User {
  passwordHash: string;
}

const DEFAULT_USERS: StoredUser[] = [
  {
    id: 'user-cust-1',
    name: 'Anandbhai Patel',
    email: 'anand@example.com',
    phone: '+91 98250 12345',
    role: 'customer',
    createdAt: '2026-10-01T08:00:00Z',
    passwordHash: 'password123'
  },
  {
    id: 'user-admin-1',
    name: 'Sukhadiyaji (Shop Owner)',
    email: 'admin@sukhadiyamanilal.com',
    phone: '+91 98250 00000',
    role: 'admin',
    createdAt: '2026-01-01T08:00:00Z',
    passwordHash: 'admin123'
  }
];

class AuthService {
  private currentUser: User | null = null;
  private users: StoredUser[] = [];

  constructor() {
    this.init();
  }

  private init(): void {
    if (typeof localStorage === 'undefined') return;

    try {
      // Load or seed users
      const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      } else {
        this.users = [...DEFAULT_USERS];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));
      }

      // Load session
      const session = localStorage.getItem(AUTH_STORAGE_KEY);
      if (session) {
        this.currentUser = JSON.parse(session);
      } else {
        this.currentUser = null;
      }
    } catch (e) {
      this.users = [...DEFAULT_USERS];
      this.currentUser = null;
    }
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public login(identifier: string, password: string): { success: boolean; user?: User; error?: string } {
    const cleanId = identifier.trim().toLowerCase();
    const cleanDigits = identifier.replace(/\D/g, '');

    const found = this.users.find(u => {
      const matchEmail = u.email.toLowerCase() === cleanId;
      const userPhoneDigits = u.phone.replace(/\D/g, '');
      const matchPhone = cleanDigits && (userPhoneDigits.includes(cleanDigits) || cleanDigits.includes(userPhoneDigits));
      return matchEmail || matchPhone;
    });

    if (!found) {
      return {
        success: false,
        error: 'No account found matching this email or phone number. Please check or register.'
      };
    }

    if (found.passwordHash !== password) {
      return {
        success: false,
        error: 'Incorrect password. Please try again.'
      };
    }

    const { passwordHash, ...userSafe } = found;
    this.currentUser = userSafe;
    this.persistSession(userSafe);

    return {
      success: true,
      user: userSafe
    };
  }

  public register(data: { name: string; email: string; phone: string; password: string }): { success: boolean; user?: User; error?: string } {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPhone = data.phone.trim();

    // Check existing
    const existing = this.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please sign in.'
      };
    }

    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      role: 'customer',
      createdAt: new Date().toISOString(),
      passwordHash: data.password
    };

    this.users.push(newUser);
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));
    } catch {}

    const { passwordHash, ...userSafe } = newUser;
    this.currentUser = userSafe;
    this.persistSession(userSafe);

    return {
      success: true,
      user: userSafe
    };
  }

  public loginWithGoogle(email: string, name?: string, avatarUrl?: string): User {
    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    let existing = this.users.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      if (name && (!existing.name || existing.name === 'Google User')) existing.name = name;
      if (avatarUrl) existing.avatarUrl = avatarUrl;
      existing.authProvider = 'google';
    } else {
      // Derive a pleasant name from email if not given (e.g. yug.sukhadia@gmail.com -> Yug Sukhadia)
      const fallbackName = cleanEmail.split('@')[0]
        .split(/[._-]/)
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');

      const isAdmin = cleanEmail.includes('admin') || cleanEmail.includes('smnsweets');

      existing = {
        id: `google-user-${Date.now()}`,
        name: name || fallbackName || 'Google User',
        email: cleanEmail,
        phone: '+91 98250 12345',
        role: isAdmin ? 'admin' : 'customer',
        createdAt: new Date().toISOString(),
        passwordHash: 'google_oauth_token',
        authProvider: 'google',
        avatarUrl: avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || fallbackName)}&background=EA580C&color=fff`
      };

      this.users.push(existing);
      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));
      } catch {}
    }

    const { passwordHash, ...safe } = existing;
    this.currentUser = safe;
    this.persistSession(safe);
    return safe;
  }

  public logout(): void {
    this.currentUser = null;
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
  }

  public quickLoginCustomer(): User {
    const cust = this.users.find(u => u.role === 'customer') || DEFAULT_USERS[0];
    const { passwordHash, ...safe } = cust;
    this.currentUser = safe;
    this.persistSession(safe);
    return safe;
  }

  public quickLoginAdmin(): User {
    const admin = this.users.find(u => u.role === 'admin') || DEFAULT_USERS[1];
    const { passwordHash, ...safe } = admin;
    this.currentUser = safe;
    this.persistSession(safe);
    return safe;
  }

  private persistSession(user: User): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch {}
  }
}

export interface GoogleAccountProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  badge?: string;
}

export const PRESET_GOOGLE_ACCOUNTS: GoogleAccountProfile[] = [
  {
    id: 'google-yug',
    name: 'Yug Sukhadia',
    email: 'yug.sukhadia@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    badge: 'Personal Google ID'
  },
  {
    id: 'google-anand',
    name: 'Anandbhai Patel',
    email: 'anand.patel@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    badge: 'Customer Google ID'
  },
  {
    id: 'google-admin',
    name: 'Sukhadiya Manilal Desk',
    email: 'smnsweets1849@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=120&q=80',
    badge: 'Admin Desk Google ID'
  }
];

export const authService = new AuthService();
