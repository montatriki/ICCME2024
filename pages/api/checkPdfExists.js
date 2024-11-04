// pages/api/checkPdfExists.js

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://elkhal_owner:WTRGEjf2er9S@ep-dry-pond-a5ef392i.us-east-2.aws.neon.tech/elkhal?sslmode=require',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { key } = req.body;
  if (!key) {
    return res.status(400).json({ message: 'Key is required' });
  }

  try {
    const query = 'SELECT id FROM filestow WHERE key = $1';
    const values = [key];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking PDF existence:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
