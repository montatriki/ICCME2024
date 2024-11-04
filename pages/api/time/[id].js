import { Pool } from 'pg';

// Initialize PostgreSQL pool
const pool = new Pool({
  connectionString: 'postgresql://elkhal_owner:WTRGEjf2er9S@ep-dry-pond-a5ef392i.us-east-2.aws.neon.tech/elkhal?sslmode=require',
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    console.log('Request method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Extract 'id' from the query parameters (changed from 'key' to 'id')
  const { id } = req.query;
  // console.log('Requested ID (before conversion):', id);

  // Check if ID exists
  if (!id) {
    console.error('No ID provided');
    return res.status(400).json({ message: 'ID parameter is required' });
  }

  // Validate and convert 'id' to a bigint
  let numericKey;
  try {
    numericKey = BigInt(id);
    // console.log('Converted ID to BigInt:', numericKey);
  } catch (error) {
    console.error('Error converting ID to BigInt:', error);
    return res.status(400).json({ message: 'ID parameter must be a valid number' });
  }

  try {
    // Query to fetch the PDF data and name using the provided 'id'
    const query = `
      SELECT pdf_data, pdf_name
      FROM filestow
      WHERE key = $1
    `;
    // console.log('Executing query:', query);
    const result = await pool.query(query, [numericKey]);
    // console.log('Database query result:', result);

    if (result.rows.length === 0) {
      console.log('No file found for ID:', numericKey);
      return res.status(404).json({ message: 'File not found' });
    }

    const file = result.rows[0];
    // console.log('File found:', file);

    // Check if pdf_data is present
    if (!file.pdf_data) {
      console.error('PDF data is missing or invalid:', file.pdf_data);
      return res.status(500).json({ message: 'Invalid PDF data' });
    }

    // Set headers to serve the PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${file.pdf_name}"`);
    res.send(file.pdf_data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Error fetching file' });
  }
}