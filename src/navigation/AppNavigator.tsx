import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';
import AddGrievanceScreen from '../screens/AddGrievanceScreen';
import GrievanceListScreen from '../screens/GrievanceListScreen';
import GrievanceDetailScreen from '../screens/GrievanceDetailScreen';
import {Colors} from '../constants/colors';
import {Layout} from '../constants/layout';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.surface,
          },
          headerTintColor: Colors.textPrimary,
          headerTitleStyle: {
            fontWeight: Layout.fontWeight.bold,
            fontSize: Layout.fontSize.lg,
            color: Colors.textPrimary,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: Colors.background,
          },
          animation: 'slide_from_right',
        }}>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AddGrievance"
          component={AddGrievanceScreen}
          options={{
            title: 'New Grievance',
            headerStyle: {backgroundColor: Colors.background},
          }}
        />

        <Stack.Screen
          name="GrievanceList"
          component={GrievanceListScreen}
          options={{
            title: 'All Grievances',
            headerStyle: {backgroundColor: Colors.background},
          }}
        />

        <Stack.Screen
          name="GrievanceDetail"
          component={GrievanceDetailScreen}
          options={{
            title: 'Grievance Detail',
            headerStyle: {backgroundColor: Colors.background},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
