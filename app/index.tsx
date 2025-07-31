import Category from "@/components/Category";
import Header from "@/components/Header";
import LLText from "@/components/LLText";
import MenuItemCard from "@/components/MenuItemCard";
import { Colors } from "@/constants/Colors";
import { fetchMenuData } from "@/constants/helpers";
import { createTable, filterByQueryAndCategories, getMenuItems, saveMenuItems } from "@/database";
import { useAppContext } from "@/hooks/useAppContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Image, SafeAreaView, TextInput, View } from "react-native";

export type MenuItem = {
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

const sections = ["Starters", "Mains", "Desserts", "Drinks", "Specials"];

export default function Index() {
  const { loadUserData } = useAppContext();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSelections, setFilterSelections] = useState(sections.map(() => false));
  const [query, setQuery] = useState("");
  const [searchBarText, setSearchBarText] = useState("");

  useEffect(() => {
    async function fetchData() {
      await loadUserData();
    }
    fetchData();

    (async () => {
      try {
        setLoading(true);
        await createTable();
        let menuItems = await getMenuItems();
        console.log("Menu items fetched from database.");
        if (!menuItems.length) {
          console.log("No menu items found in database, fetching from API...");
          const menuItems = await fetchMenuData();
          console.log("Menu items fetched from API.");
          saveMenuItems(menuItems);
          console.log("Menu items saved to database.");
        }
        setMenuItems(menuItems);
        setLoading(false);
      } catch (e: any) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories<MenuItem>(query, activeCategories);
        setMenuItems(menuItems);
      } catch (e: any) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text: string) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = (index: number) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <View style={{ backgroundColor: Colors.primary.green }}>
        <View style={{ flexDirection: "row", alignItems: "center", margin: 16, gap: 16 }}>
          <View style={{ flex: 1 }}>
            <LLText size="xxl" weight="bold" style={{ color: Colors.primary.yellow }}>
              Little Lemon
            </LLText>
            <LLText size="xl" color="white" weight="bold">
              Chicago
            </LLText>
            <LLText size="lg" color="white" style={{ marginTop: 24 }}>
              We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </LLText>
          </View>
          <Image source={require("@/assets/images/hero-image.png")} style={{ width: 125, height: 125, borderRadius: 8 }} />
        </View>
        <View style={{ flexDirection: "row", backgroundColor: Colors.gray.light, padding: 12, margin: 16, borderRadius: 8, gap: 8 }}>
          <FontAwesome name="search" size={24} color={Colors.gray.medium} />
          <TextInput style={{ flex: 1, fontSize: 18 }} onChangeText={handleSearchChange} value={searchBarText} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {loading ? (
          <LLText size="md" color="black">
            Loading menu items...
          </LLText>
        ) : (
          <FlatList
            ListHeaderComponent={() => (
              <View style={{ backgroundColor: "#fff", paddingHorizontal: 8, paddingTop: 8, gap: 8 }}>
                <LLText size="md" weight="bold">
                  ORDER FOR DELIVERY
                </LLText>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 8, gap: 8 }}
                  data={sections}
                  keyExtractor={(item) => item}
                  renderItem={({ item, index }) => (
                    <Category label={item} isSelected={filterSelections[index]} onPress={() => handleFiltersChange(index)} />
                  )}
                />
                <View style={{ height: 2, backgroundColor: Colors.gray.medium }}></View>
              </View>
            )}
            stickyHeaderIndices={[0]}
            data={menuItems}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <MenuItemCard item={item} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.gray.medium, margin: 4 }} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
