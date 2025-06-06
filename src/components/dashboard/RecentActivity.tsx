// components/dashboard/RecentActivity.tsx

'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getRecentActivities } from '@/lib/data';
import { Activity } from '@/lib/types';

export function RecentActivity() {
  const activities: Activity[] = getRecentActivities();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Most recent activities in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {activity.title.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.detail}
                </p>
              </div>
              <div className="ml-auto font-medium">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}