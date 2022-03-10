import React, { FunctionComponent } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface LoadingProps {
  loadingStyle?: StyleProp<ViewStyle>;
  size?: number;
  activityColor?: string;
  isLoading: boolean;
}

interface Styles {
  loading: ViewStyle;
}

/**
 * @class Loading
 * @classdesc Responsável por desenhar um loading animado na tela
 * @param {LoadingProps} loadingStyle Estilização do componente
 */
const Loading: FunctionComponent<LoadingProps> = ({
  isLoading = true,
  loadingStyle,
  size = 70,
  activityColor,
}: LoadingProps): JSX.Element => {
  if (!isLoading) return <></>;
  return (
    <View style={[styles.loading, loadingStyle]}>
      <ActivityIndicator
        color={!activityColor ? '#ED3269' : activityColor}
        size={size}
      />
    </View>
  );
};

export default Loading;

/**
 * Estilos locais do componente
 * São sobrescrevidos pelos vindos de fora do componente
 */
const styles = StyleSheet.create<Styles>({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
});
