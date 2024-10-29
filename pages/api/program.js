import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://elkhal_owner:WTRGEjf2er9S@ep-dry-pond-a5ef392i.us-east-2.aws.neon.tech/elkhal?sslmode=require',
});

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const result = await pool.query('SELECT * FROM program_data');
        return res.status(200).json(result.rows);

      case 'POST':
        const { time, activity, posters } = req.body;

        if (!time || !activity || !Array.isArray(posters)) {
          return res.status(400).json({ error: 'Invalid data format for POST request' });
        }

        const postResult = await pool.query(
          'INSERT INTO program_data (time, activity, posters) VALUES ($1, $2, $3) RETURNING *',
          [time, activity, JSON.stringify(posters)]
        );
        return res.status(201).json(postResult.rows[0]);

      case 'PUT':
        const { id, time: updateTime, activity: updateActivity, posters: updatePosters } = req.body;

        if (!id || !updateTime || !updateActivity || !Array.isArray(updatePosters)) {
          return res.status(400).json({ error: 'Invalid data format for PUT request' });
        }

        const putResult = await pool.query(
          'UPDATE program_data SET time = $1, activity = $2, posters = $3 WHERE id = $4 RETURNING *',
          [updateTime, updateActivity, JSON.stringify(updatePosters), id]
        );

        if (putResult.rows.length === 0) {
          return res.status(404).json({ error: 'Record not found' });
        }

        return res.status(200).json(putResult.rows[0]);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(`Error processing ${method} request:`, error.message);
    return res.status(500).json({ error: `Error processing ${method} request` });
  }
}