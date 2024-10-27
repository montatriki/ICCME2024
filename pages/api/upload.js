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
    form.parse(req, (err, fields, files) => {
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

      const query = `
        INSERT INTO files (pdf_name, presenter, topic, poster_id, pdf_data) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id
      `;

      const values = [
        file.originalFilename,
        fields.presenter[0], // Access the first element of the presenter array
        fields.topic[0],     // Access the first element of the topic array
        fields.posterId[0],  // Access the first element of the posterId array
        pdfData,
      ];

      pool.query(query, values, (error, result) => {
        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ message: 'Database error' });
        }

        res.status(200).json({ id: result.rows[0].id });
      });
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
}
