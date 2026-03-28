import React from 'react';
import { PresenceStatus, presenceStatusLabel } from './types';

interface PresenceStatusBadgeProps {
    status: PresenceStatus;
}

const PresenceStatusBadge: React.FC<PresenceStatusBadgeProps> = ({ status }) => {
    const getStatusStyles = (status: PresenceStatus) => {
        switch (status) {
            case 'present':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'absent':
                return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'retard':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            default:
                return 'bg-zinc-100 text-zinc-700 border-zinc-200';
        }
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusStyles(status)}`}>
            {presenceStatusLabel(status)}
        </span>
    );
};

export default PresenceStatusBadge;
