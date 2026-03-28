import { EmployeeRow } from "../employees/types";

export type CongeStatus = 'en_attente' | 'accepte' | 'refuse';

export interface CongeRow {
    id: number;
    employeeId: number;
    employee?: EmployeeRow;
    date_debut: string;
    date_fin: string;
    motif: string;
    status: CongeStatus;
    createdAt: string;
    updatedAt: string;
}

export const congeStatusLabel = (status: CongeStatus) => {
    switch (status) {
        case 'en_attente': return 'En attente';
        case 'accepte': return 'Accepté';
        case 'refuse': return 'Refusé';
        default: return status;
    }
};
