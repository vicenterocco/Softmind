// Vraj

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  role: 'user' | 'admin' | 'professional';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    weekly: boolean;
  };
  privacy: {
    profilePublic: boolean;
    showStats: boolean;
  };
}

export interface UserStats {
  totalSpent: number;
  totalSaved: number;
  goalsCompleted: number;
  impulsesPrevented: number;
  accountAge: number;
}