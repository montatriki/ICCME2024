import { Pool } from 'pg';
import formidable from 'formidable';
import fs from 'fs';

// Configure API to use formidable for parsing form data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: 'postgresql://elkhal_owner:WTRGEjf2er9S@ep-dry-pond-a5ef392i.us-east-2.aws.neon.tech/elkhal?sslmode=require',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable({ multiples: false });

    // Parse the form
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(500).json({ message: 'Error parsing form' });
      }

      // Access the uploaded file
      const file = files.file;
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Read the file content
      const pdfData = fs.readFileSync(file.filepath);
      const pdfName = file.originalFilename;
      const name = fields.name;
      const time = fields.time;

      // Check if a record with the same name and time exists
      const checkQuery = 'SELECT id FROM filestow WHERE name = $1 AND "time" = $2';
      const checkValues = [name, time];
      const checkResult = await pool.query(checkQuery, checkValues);

      if (checkResult.rows.length > 0) {
        // Record exists, update it
        const updateQuery = 'UPDATE filestow SET pdf_data = $1 WHERE id = $2';
        const updateValues = [pdfData, checkResult.rows[0].id];
        await pool.query(updateQuery, updateValues);

        return res.status(200).json({ message: 'Record updated', id: checkResult.rows[0].id });
      } else {
        // Record does not exist, insert a new one
        const insertQuery = `
          INSERT INTO filestow (pdf_name, name, "time", pdf_data)
          VALUES ($1, $2, $3, $4)
          RETURNING id
        `;
        const insertValues = [pdfName, name, time, pdfData];
        const insertResult = await pool.query(insertQuery, insertValues);

        return res.status(201).json({ message: 'Record created', id: insertResult.rows[0].id });
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
}
