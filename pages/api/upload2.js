import { Pool } from 'pg';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disables Next.js default body parsing
  },
};

// Initialize PostgreSQL pool
const pool = new Pool({
  connectionString: 'postgresql://elkhal_owner:WTRGEjf2er9S@ep-dry-pond-a5ef392i.us-east-2.aws.neon.tech/elkhal?sslmode=require',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err); // Log the error
        return res.status(500).json({ message: 'Error parsing form' });
      }

      const file = files.file && Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file || !file.filepath) {
        return res.status(400).json({ message: 'Invalid file or file path' });
      }

      try {
        const pdfData = fs.readFileSync(file.filepath);
        const pdfName = file.originalFilename || 'Unknown File';
        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name || 'Unnamed';
        const time = Array.isArray(fields.time) ? fields.time[0] : fields.time || 'No Time Provided';
        const key = Array.isArray(fields.uniqueKey) ? fields.uniqueKey[0] : fields.uniqueKey || 'No Key Provided';

        // Check if a record with the same key exists
        const checkQuery = 'SELECT id FROM filestow WHERE key = $1';
        const checkValues = [key];
        const checkResult = await pool.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
          // Record exists, update it
          const updateQuery = 'UPDATE filestow SET pdf_data = $1, pdf_name = $2 WHERE id = $3';
          const updateValues = [pdfData, pdfName, checkResult.rows[0].id];
          await pool.query(updateQuery, updateValues);

          return res.status(200).json({ message: 'Record updated', id: checkResult.rows[0].id });
        } else {
          // Record does not exist, insert a new one
          const insertQuery = `
            INSERT INTO filestow (pdf_name, name, "time", pdf_data, key)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
          `;
          const insertValues = [pdfName, name, time, pdfData, key];
          const insertResult = await pool.query(insertQuery, insertValues);

          return res.status(201).json({ message: 'Record created', id: insertResult.rows[0].id });
        }
      } catch (fileReadError) {
        console.error('Error reading uploaded file:', fileReadError); // Log the error
        return res.status(500).json({ message: 'Error reading uploaded file' });
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error); // Log the error
    return res.status(500).json({ message: 'Error uploading file' });
  }
}
