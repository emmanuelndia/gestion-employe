/**
 * Configuration de l'API
 * Utilise la variable d'environnement NEXT_PUBLIC_API_URL en production
 * Défaut sur localhost:4000 pour le développement local
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
