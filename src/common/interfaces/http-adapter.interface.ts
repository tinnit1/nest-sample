export interface HttpAdapter {
    get<T>( ut: string): Promise<T>;
}