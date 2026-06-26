export interface DashboardData {
  monthlySpent: number;
  monthlyBudget: number;
  totalSaved: number;
  goalsCompleted: number;
  impulsesPrevented: number;
  currentStreak: number;
}

export interface DashboardChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
}

export interface PeriodStats {
  period: 'semana' | 'mes' | 'ano';
  totalSpent: number;
  averageDaily: number;
  highestDay: {
    date: Date;
    amount: number;
  };
  lowestDay: {
    date: Date;
    amount: number;
  };
}