// Interface for Courses
export interface ICourse {
    id: number;
    title: string;
    duration: number;
    'duration-unit': DurationUnit;
    description: string;
}

// Interface for pagination
export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

// Interface for API Response
export interface IApiResponse {
    status: boolean;
    error?: string;
}

// Enum for Course Duration Unit
export enum DurationUnit {
    'Days' = 'Days',
    'Weeks' = 'Weeks',
    'Months' = 'Months'
  }