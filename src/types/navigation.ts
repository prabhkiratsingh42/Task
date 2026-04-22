import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Grievance } from './grievance';

export type RootStackParamList = {
  Home: undefined;
  AddGrievance: undefined;
  GrievanceList: undefined;
  GrievanceDetail: { grievance: Grievance };
};


export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type AddGrievanceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddGrievance'
>;
export type GrievanceListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GrievanceList'
>;
export type GrievanceDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GrievanceDetail'
>;
