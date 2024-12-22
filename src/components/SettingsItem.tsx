import React from 'react';

interface SettingsItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function SettingsItem({ icon, title, description, children }: SettingsItemProps) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                    {icon}
                </div>
                <div>
                    <h3 className="font-medium text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
            {children}
        </div>
    );
}
