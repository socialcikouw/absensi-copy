import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="CreateDropBaruHarianScreen"
        options={{
          presentation: "modal",
          title: "Tambah Drop Baru Harian",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#2196F3",
          },
        }}
      />
      <Stack.Screen
        name="CreateDropLamaHarianScreen"
        options={{
          presentation: "modal",
          title: "Tambah Drop Lama Harian",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#2196F3",
          },
        }}
      />
      <Stack.Screen
        name="dropbarumingguan-form"
        options={{
          presentation: "modal",
          title: "Tambah Drop Baru Mingguan",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#2196F3",
          },
        }}
      />
      <Stack.Screen
        name="droptempoan-form"
        options={{
          presentation: "modal",
          title: "Tambah Drop Tempoan",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#2196F3",
          },
        }}
      />
      <Stack.Screen
        name="DataNasabah"
        options={{
          presentation: "modal",
          title: "Data Nasabah",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#2196F3",
          },
        }}
      />
    </Stack>
  );
}
