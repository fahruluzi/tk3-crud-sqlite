import * as SQLite from 'expo-sqlite';
// import * as Sharing from 'expo-sharing';

// import * as FileSystem from 'expo-file-system';

export interface Survey {
    id: number;
    title: string;
    description: string;
}

// Open the database and check the connection
const openDatabase = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('survey.db');

        try {
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS surveys (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    title TEXT, 
                    description TEXT
                );
            `);
            console.log('Table created successfully');
        } catch (error) {
            console.error('Error creating table:', error);
        }

        // await Sharing.shareAsync(
        //     FileSystem.documentDirectory + 'SQLite.zip', 
        //     {dialogTitle: 'share or copy your DB via'}
        //  ).catch(error =>{
        //     console.log(error);
        //  })
         
        return db;
    } catch (error) {
        console.error('Failed to open database:', error);
        throw error;
    }
};

// Insert a new survey into the surveys table
export const insertSurvey = async (title: string, description: string) => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            'INSERT INTO surveys (title, description) VALUES (?, ?);',
            [title, description]
        );
        console.log('Survey inserted successfully:', result);
    } catch (error) {
        console.error('Error inserting survey:', error);
    }
};

// Fetch all surveys from the surveys table
export const getSurveys = async () : Promise<Survey[]> => {
    const db = await openDatabase();
    try {
        const result = await db.getAllAsync<Survey>('SELECT * FROM surveys;');
        console.log('Surveys fetched successfully:', result);
        return result;
    } catch (error) {
        console.error('Error fetching surveys:', error);
        return []
    }
};

export const getSurveyById = async (id: number) : Promise<Survey | null> => {
    const db = await openDatabase();
    try {
        const result = await db.getFirstAsync<Survey>(
            'SELECT * FROM surveys WHERE id = ?;',
            [id]
        );

        if (result) {  // Get the first matching row
            console.log('Survey fetched successfully:', result);
            return result;  // Return the survey
        } else {
            console.log('No survey found with this ID');
            return result;  // No survey found
        }
    } catch (error) {
        console.error('Error fetching survey:', error);
        throw error;
    }
};

// Update a survey in the surveys table
export const updateSurvey = async (id: number, title: string, description: string) => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            'UPDATE surveys SET title = ?, description = ? WHERE id = ?;',
            [title, description, id]
        );
        console.log('Survey updated successfully:', result);
    } catch (error) {
        console.error('Error updating survey:', error);
    }
};

// Delete a survey by ID
export const deleteSurvey = async (id: number) => {
    const db = await openDatabase();
    try {
        const result = await db.runAsync(
            'DELETE FROM surveys WHERE id = ?;',
            [id]
        );
        console.log('Survey deleted successfully:', result);
    } catch (error) {
        console.error('Error deleting survey:', error);
    }
};
