import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchSurveys } from '../viewmodels/SurveyViewModel';
import { Survey } from '@/models/SurveyModel';

export default function MainPage() {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadSurveys();
    }, []);

    const loadSurveys = async () => {
        try {
            const result = await fetchSurveys();
            setSurveys(result);
        } catch (error) {
            console.error('Error fetching surveys:', error);
        } finally {
            setLoading(false);
        }
    };

    const navigateToDetail = (id: number) => {
        router.push({
            pathname: '/detail',
            params: { id }, // Pass the survey ID to the detail page
        });
    };

    if (loading) {
        return <Text>Loading surveys...</Text>;
    }

    return (
        <View>
            <Button title="Add New Survey" onPress={() => router.push('/add')} />
            {surveys.length === 0 ? (
                <Text>No surveys available</Text>
            ) : (
                <FlatList
                    data={surveys}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigateToDetail(item.id)}>
                            <Text>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}
