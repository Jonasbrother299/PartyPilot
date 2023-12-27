import { Asset } from "expo-asset";

const profile = require("../../assets/DefaultAvatar.webp");
const Logo = require("../../assets/Logo.png");
const CocktailImage = require("../../assets/CocktailImage.jpg");
const Background = require("../../assets/Background.png");

// Function to preload the background image
export const preloadBackgroundImage = async () => {
  try {
    await Asset.fromModule(Background).downloadAsync();
  } catch (error) {}
};

// Export the images
export default {
  profile,
  Logo,
  CocktailImage,
  Background,
};
