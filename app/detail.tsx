import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Correct hook for search params
import { fetchSurvey, removeSurvey } from '../viewmodels/SurveyViewModel';
import { Survey } from '../models/SurveyModel';

export default function DetailPage() {
    const [survey, setSurvey] = useState<Survey | null>(null);
    const { id } = useLocalSearchParams();  // Correctly use useLocalSearchParams
    const router = useRouter();

    useEffect(() => {
        if (id) {
            loadSurvey(Number(id));  // Fetch the survey using the 'id' param
        }
    }, [id]);

    const loadSurvey = async (id: number) => {
        const fetchedSurvey = await fetchSurvey(id);
        setSurvey(fetchedSurvey);
    };

    const handleDelete = async () => {
        if (id) {
            await removeSurvey(Number(id));
            router.back();  // Go back after deleting the survey
        }
    };

    if (!survey) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>Title: {survey.title}</Text>
            <Text>Description: {survey.description}</Text>
            <Button title="Delete Survey" onPress={handleDelete} />
            <Button title="Go Back" onPress={() => router.back()} />
        </View>
    );
}
