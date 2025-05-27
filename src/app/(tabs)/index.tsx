import MediaListItem from "@/src/components/MediaListItem";
import mediaList from "@assets/data/mediaList.json";
import Feather from "@expo/vector-icons/Feather";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>For Lukas</Text>
          <Feather name="search" size={22} color="white" />
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text style={styles.filterText}>TV Shows</Text>
          <Text style={styles.filterText}>Movies</Text>
          <Text style={styles.filterText}>Categories</Text>
        </View>
      </View>
      <FlatList
        data={mediaList}
        renderItem={({ item: verticalListItem }) => (
          <View>
            <Text style={styles.sectionTitle}>{verticalListItem.title}</Text>
            <FlatList
              horizontal
              data={verticalListItem.data}
              renderItem={({ item: horizontalListItem }) => (
                <MediaListItem mediaItem={horizontalListItem} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    gap: 10,
  },
  filterText: {
    color: "lightgrey",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    paddingVertical: 10,
    color: "white",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    marginHorizontal: 10,
    gap: 10,
  },
});
