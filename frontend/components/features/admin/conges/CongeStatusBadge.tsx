import React from 'react';
import { CongeStatus, congeStatusLabel } from './types';

interface CongeStatusBadgeProps {
    status: CongeStatus;
}

const CongeStatusBadge: React.FC<CongeStatusBadgeProps> = ({ status }) => {
    const getStatusStyles = (status: CongeStatus) => {
        switch (status) {
            case 'en_attente':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'accepte':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'refuse':
                return 'bg-rose-100 text-rose-700 border-rose-200';
            default:
                return 'bg-zinc-100 text-zinc-700 border-zinc-200';
        }
    };

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusStyles(status)}`}>
            {congeStatusLabel(status)}
        </span>
    );
};

export default CongeStatusBadge;
