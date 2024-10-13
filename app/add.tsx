import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { createSurvey } from '../viewmodels/SurveyViewModel';

export default function AddDataPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleAddSurvey = async () => {
        await createSurvey(title, description);
        router.back();  // Go back to the main page after adding the survey
    };

    return (
        <View>
            <TextInput
                placeholder="Survey Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Survey Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button title="Add Survey" onPress={handleAddSurvey} />
        </View>
    );
}
