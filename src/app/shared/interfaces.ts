// Interface for Courses
export interface ICourses {
    id: number;
    title: string;
    duration: number;
    'duration-unit': string;
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