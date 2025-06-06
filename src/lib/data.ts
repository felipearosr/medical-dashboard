// lib/data.ts

import { promises as fs } from 'fs';
import path from 'path';
import { parseCSVData, calculateMonthlyStats, getRecentActivities as getRecentActivitiesFromProcessing } from '@/lib/data-processing';
import { Document, MonthlyStats, Activity } from './types';

interface DashboardData {
  documents: Document[];
  stats: MonthlyStats;
}

export async function loadData(): Promise<DashboardData> {
  try {
    // Read CSV file from public directory
    const filePath = path.join(process.cwd(), 'public', 'data', 'selected1.csv');
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      // Return mock data if file doesn't exist
      const mockStats = calculateMonthlyStats([]);
      return {
        documents: [],
        stats: mockStats
      };
    }
    
    // Read and parse CSV
    const csvContent = await fs.readFile(filePath, 'utf-8');
    const documents = parseCSVData(csvContent);
    const stats = calculateMonthlyStats(documents);
    
    return {
      documents,
      stats
    };
  } catch (error) {
    console.error('Error loading data:', error);
    
    // Return default data on error
    const mockStats = calculateMonthlyStats([]);
    return {
      documents: [],
      stats: mockStats
    };
  }
}

export function getRecentActivities(): Activity[] {
  return getRecentActivitiesFromProcessing();
} 