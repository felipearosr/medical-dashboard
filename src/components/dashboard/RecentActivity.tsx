// components/dashboard/RecentActivity.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, FileText, AlertCircle, CheckCircle, Pill } from 'lucide-react';
import { getRecentActivities } from '@/lib/data-processing';

export function RecentActivity() {
  const activities = getRecentActivities();
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'info':
        return <Pill className="w-4 h-4 text-blue-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>🕐 Actividad Reciente</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg border-l-4 bg-gray-50",
                activity.type === 'success' && "border-green-500",
                activity.type === 'error' && "border-red-500",
                activity.type === 'info' && "border-blue-500"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-700">
                      {activity.time}
                    </span>
                    <span className="text-gray-600">
                      - {activity.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {activity.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}