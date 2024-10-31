import { Pool } from 'pg';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

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
      const file = files.file[0]; // Access the first file in the array

      // Check if the file is present
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Read the file
      const pdfData = fs.readFileSync(file.filepath); // Read the file from the correct path

      const pdfName = file.originalFilename;
      const presenter = fields.presenter[0];
      const topic = fields.topic[0];
      const posterId = fields.posterId[0];

      // Check if a record with the same pdf_name and poster_id exists
      const checkQuery = `
        SELECT id FROM files 
        WHERE presenter = $1 and poster_id = $2
      `;
      const checkValues = [ presenter,posterId];

      const checkResult = await pool.query(checkQuery, checkValues);

      if (checkResult.rows.length > 0) {
        // Record exists, update it
        const updateQuery = `
          UPDATE files 
          SET presenter = $1, topic = $2, pdf_data = $3 
          WHERE id = $4
        `;
        const updateValues = [
          presenter,
          topic,
          pdfData,
          checkResult.rows[0].id,
        ];

        await pool.query(updateQuery, updateValues);

        return res.status(200).json({ message: 'Record updated', id: checkResult.rows[0].id });
      } else {
        // Record does not exist, insert a new one
        const insertQuery = `
          INSERT INTO files (pdf_name, presenter, topic, poster_id, pdf_data) 
          VALUES ($1, $2, $3, $4, $5) 
          RETURNING id
        `;
        const insertValues = [
          pdfName,
          presenter,
          topic,
          posterId,
          pdfData,
        ];

        const insertResult = await pool.query(insertQuery, insertValues);
        return res.status(201).json({ message: 'Record created', id: insertResult.rows[0].id });
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
}
