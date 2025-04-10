import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, Image, StyleSheet, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEntries } from '../../hooks/useEntries';
import MoodSelector from './MoodSelector';
import { COLORS, SIZES, FONTS, SHADOW } from '../../constants/theme';
import { MOODS } from '../../constants/moods';

export default function AddEntryModal({ visible, onClose }) {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [imageUri, setImageUri] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { handleAddEntry } = useEntries();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const onSave = () => {
    handleAddEntry(content, selectedMood, imageUri, selectedDate);
    setContent('');
    setImageUri(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Entry</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={content}
              onChangeText={setContent}
              placeholder="What's on your mind today?"
              placeholderTextColor={COLORS.muted}
              multiline
            />

            <Text style={styles.label}>How are you feeling?</Text>
            <MoodSelector
              selectedMood={selectedMood}
              onSelectMood={setSelectedMood}
            />

            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
              ) : (
                <View style={styles.imagePickerPlaceholder}>
                  <Text style={styles.imagePickerText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitButton, !content && styles.disabledButton]}
              onPress={onSave}
              disabled={!content}
            >
              <Text style={styles.submitButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.modalOverlay,
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    ...SHADOW,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingVertical: SIZES.padding,
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.dark,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
    maxHeight: '80%',
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    height: 150,
    fontSize: SIZES.fontMedium,
    color: COLORS.dark,
    textAlignVertical: 'top',
    marginBottom: SIZES.margin,
  },
  label: {
    ...FONTS.label,
    marginBottom: 10,
  },
  imagePickerButton: {
    width: '100%',
    height: 150,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
    overflow: 'hidden',
  },
  imagePickerPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: SIZES.radius,
    borderStyle: 'dashed',
  },
  imagePickerText: {
    fontSize: SIZES.fontMedium,
    color: COLORS.gray,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.radius,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#C0C0C0',
  },
  submitButtonText: {
    fontSize: SIZES.fontMedium,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});