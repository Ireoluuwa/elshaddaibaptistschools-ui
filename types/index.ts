export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
}

export * from './student.types';
export * from './teacher.types';
export * from './auth.types';
