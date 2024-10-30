import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://elkhal_owner:WTRGEjf2er9S@ep-dry-pond-a5ef392i.us-east-2.aws.neon.tech/elkhal?sslmode=require',
});

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { rows } = await pool.query('SELECT * FROM program_items ORDER BY time');
        res.status(200).json(rows);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching program data' });
      }
      break;

    case 'POST':
      try {
        const { time, activity, posters } = req.body;
        const { rows } = await pool.query(
          'INSERT INTO program_items (time, activity, posters) VALUES ($1, $2, $3) RETURNING *',
          [time, activity, JSON.stringify(posters)]
        );
        res.status(201).json(rows[0]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating program item' });
      }
      break;

    case 'PUT':
      try {
        const { id, time, activity, posters } = req.body;
        const { rows } = await pool.query(
          'UPDATE program_items SET time = $1, activity = $2, posters = $3 WHERE id = $4 RETURNING *',
          [time, activity, JSON.stringify(posters), id]
        );
        if (rows.length === 0) {
          return res.status(404).json({ error: 'Program item not found' });
        }
        res.status(200).json(rows[0]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating program item' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const result = await pool.query('DELETE FROM program_items WHERE id = $1', [id]);
        if (result.rowCount === 0) {
          return res.status(404).json({ error: 'Program item not found' });
        }
        res.status(200).json({ message: 'Program item deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting program item' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
