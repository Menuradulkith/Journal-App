import React, { useState } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEntries } from '../hooks/useEntries';
import EntryCard from '../components/journal/EntryCard';
import EmptyState from '../components/journal/EmptyState';
import AddEntryModal from '../components/journal/AddEntryModal';
import { COLORS, SIZES, FONTS, SHADOW_STRONG } from '../constants/theme';
import { formatDate } from '../utils/dateUtils';

export default function JournalListScreen() {
  const { entryList, groupedEntries, loading, handleDeleteEntry } = useEntries();
  const [modalVisible, setModalVisible] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your journal...</Text>
      </View>
    );
  }

  const renderGroupHeader = ({ section: { title } }) => (
    <View style={styles.dateHeader}>
      <Text style={styles.dateHeaderText}>{formatDate(title)}</Text>
    </View>
  );

  const sections = Object.entries(groupedEntries).map(([date, entries]) => ({
    title: date,
    data: entries,
  }));

  return (
    <SafeAreaView style={styles.container}>
      {entryList.length === 0 ? (
        <EmptyState onAddPress={() => setModalVisible(true)} />
      ) : (
        <FlatList
          data={entryList}
          renderItem={({ item }) => (
            <EntryCard entry={item} onDelete={handleDeleteEntry} />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={styles.listHeader}>
              {entryList.length} {entryList.length === 1 ? 'entry' : 'entries'}
            </Text>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <AddEntryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 100,
  },
  listHeader: {
    ...FONTS.body,
    marginVertical: 10,
    textAlign: 'center',
  },
  dateHeader: {
    backgroundColor: COLORS.background,
    padding: 10,
    marginVertical: 5,
  },
  dateHeaderText: {
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  separator: {
    height: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: SIZES.fontMedium,
    color: COLORS.gray,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: SIZES.fabSize,
    height: SIZES.fabSize,
    borderRadius: SIZES.fabSize / 2,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW_STRONG,
  },
  fabText: {
    fontSize: 30,
    color: COLORS.white,
  },
});