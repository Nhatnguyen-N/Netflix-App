import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
export default function RootLayout() {
  const myTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "white",
    },
  };
  return (
    <ThemeProvider value={myTheme}>
      <PaperProvider>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: "black" },
            headerShown: false,
          }}
        >
          <Stack.Screen name="mediaDetails/[id]" />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}
