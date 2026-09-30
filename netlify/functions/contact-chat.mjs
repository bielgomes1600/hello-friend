import contactAPI from '../../api/leads/contacts/chat.js';

// Expõe o backend Groq existente como Netlify Function no mesmo caminho usado pelo dashboard.
export default async (req) => contactAPI.fetch(req);

export const config = { path: '/api/leads/contacts/chat' };
