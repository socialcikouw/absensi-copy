import { Stack } from "expo-router";
import {
  createModalScreenOptions,
  modalScreens,
} from "../../constants/config/modalConfig";

export default function ModalsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={modalScreens.createDropBaruHarian.name}
        options={createModalScreenOptions(
          modalScreens.createDropBaruHarian.title
        )}
      />
      <Stack.Screen
        name={modalScreens.createDropLamaHarian.name}
        options={createModalScreenOptions(
          modalScreens.createDropLamaHarian.title
        )}
      />
      <Stack.Screen
        name="CustomerListScreen"
        options={createModalScreenOptions("Data Nasabah")}
      />
    </Stack>
  );
}
