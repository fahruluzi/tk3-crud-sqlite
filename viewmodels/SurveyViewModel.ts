import * as SurveyModel from '../models/SurveyModel';

// Fetch surveys through ViewModel
export const fetchSurveys = async (): Promise<SurveyModel.Survey[]> => {
    try {
        const surveys = await SurveyModel.getSurveys();
        return surveys;
    } catch (error) {
        console.error('Error fetching surveys:', error);
        return [];
    }
};

// Fetch surveys through ViewModel
export const fetchSurvey = async (id: number): Promise<SurveyModel.Survey | null> => {
    try {
        const surveys = await SurveyModel.getSurveyById(id);
        return surveys;
    } catch (error) {
        console.error('Error fetching surveys:', error);
        return null;
    }
};

// Create a new survey via ViewModel
export const createSurvey = async (title: string, description: string): Promise<void> => {
    try {
        await SurveyModel.insertSurvey(title, description);
    } catch (error) {
        console.error('Error creating survey:', error);
    }
};

// Delete a survey via ViewModel
export const removeSurvey = async (id: number): Promise<void> => {
    try {
        await SurveyModel.deleteSurvey(id);
    } catch (error) {
        console.error('Error deleting survey:', error);
    }
};

// Update a survey via ViewModel
export const modifySurvey = async (id: number, title: string, description: string): Promise<void> => {
    try {
        await SurveyModel.updateSurvey(id, title, description);
    } catch (error) {
        console.error('Error updating survey:', error);
    }
};
