import { EmployeeRow } from "../employees/types";

export type PresenceStatus = 'present' | 'absent' | 'retard';

export interface PresenceRow {
    id: number;
    employeeId: number;
    employee?: EmployeeRow;
    date: string;
    date_arrivee?: string | null;
    date_depart?: string | null;
    status: PresenceStatus;
    createdAt: string;
    updatedAt: string;
}

export const presenceStatusLabel = (status: PresenceStatus) => {
    switch (status) {
        case 'present': return 'Présent';
        case 'absent': return 'Absent';
        case 'retard': return 'En retard';
        default: return status;
    }
};
