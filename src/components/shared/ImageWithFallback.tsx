import React, { useState } from "react";
import { Image, ImageStyle, Text, View, ViewStyle } from "react-native";

interface ImageWithFallbackProps {
  imageUri: string;
  style?: ViewStyle | ImageStyle;
  fallbackText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  imageUri,
  style,
  fallbackText = "📷",
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset error state when imageUri changes
  React.useEffect(() => {
    if (imageUri) {
      setHasError(false);
      setIsLoading(true);
    }
  }, [imageUri]);

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const fallbackStyle: ViewStyle = {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    ...style,
  };

  // Show fallback if no image URI, has error, or is loading
  if (!imageUri || hasError) {
    return (
      <View style={fallbackStyle}>
        <Text style={{ fontSize: 24, color: "#ccc" }}>{fallbackText}</Text>
      </View>
    );
  }

  return (
    <View style={style}>
      <Image
        source={{ uri: imageUri }}
        style={style as ImageStyle}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        resizeMode="cover"
      />
      {isLoading && (
        <View
          style={[
            fallbackStyle,
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          ]}
        >
          <Text style={{ fontSize: 24, color: "#ccc" }}>⏳</Text>
        </View>
      )}
    </View>
  );
};
