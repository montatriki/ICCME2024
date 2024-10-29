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
        const { activities } = req.body; // Expecting activities as an array

        if (!Array.isArray(activities)) {
          return res.status(400).json({ error: 'Invalid data format for POST request' });
        }

        // Loop through each activity and insert into the database
        const insertedActivities = [];
        for (const activity of activities) {
          const { time, activity: actDescription, posters } = activity;

          // Validate each activity's structure
          if (!time || !actDescription || !Array.isArray(posters)) {
            return res.status(400).json({ error: 'Invalid activity data format' });
          }

          const postResult = await pool.query(
            'INSERT INTO program_data (time, activity, posters) VALUES ($1, $2, $3) RETURNING *',
            [time, actDescription, JSON.stringify(posters)]
          );
          insertedActivities.push(postResult.rows[0]);
        }

        return res.status(201).json(insertedActivities); // Return all inserted activities

      case 'PUT':
        const { id, posterId, presenter } = req.body; // Expecting id, posterId, and presenter in the body

        if (!id || !posterId || !presenter) {
          return res.status(400).json({ error: 'Invalid data format for PUT request' });
        }

        const updateQuery = `
          UPDATE program_data 
          SET posters = jsonb_set(posters, '{${posterId}, presenter}', '"${presenter}"')
          WHERE id = $1 
          RETURNING *;
        `;

        const putResult = await pool.query(updateQuery, [id]);

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
