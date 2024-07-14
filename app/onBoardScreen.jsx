import { Image } from "react-native";
import { OnboardFlow } from "react-native-onboard";

export default function onBoardScreen() {
  return (
    <OnboardFlow
      pages={[
        {
          title: "Identify the Green World Around You",
          subtitle: "Turn your smartphone into a plant expert. Scan any plant using your camera and let Plantify identify it for you.",
          imageUri: Image.resolveAssetSource(require('../assets/images/onborad-one.jpg')).uri,
        },
        {
          title: "Your All-in-One Plant Care Companion",
          subtitle: "Plantify helps you care for your plants. Set reminders, document their growth, and diagnose diseases with a quick camera scan.",
          imageUri: Image.resolveAssetSource(require('../assets/images/onborad-two.jpg')).uri,
        },
        {
          title: "My Plants - A Green Diary Just For You",
          subtitle: "Bring your garden to life! Add your favorite plants, set care reminders, snap progress photos, & explore your planting history.",
          imageUri: Image.resolveAssetSource(require('../assets/images/onborad-two.jpg')).uri,
        },
      ]}
      type={"fullscreen"}
    />
  );
}
