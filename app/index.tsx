import { TextStyle } from "@/constants";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.logo}>

        <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" width={150} height={150} />
      </View>
      <View style={styles.text}>
        <Text>Bem-vindo ao</Text>
        <Text>TwinCity</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",

  },

  text: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: TextStyle.bodyLarge.fontFamily,


  },

  buttons: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },

});