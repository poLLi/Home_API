// Database: Lowdb setup
// ---------------------------------

import { Low, JSONFile } from 'lowdb';

const adapter = new JSONFile('./database/db.json');
const db = new Low(adapter);

await db.read();
db.data ||= { weather: [] };

export default db;
