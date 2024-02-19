declare module 'cloudinary' {
  export interface ConfigOptions {
    cloud_name: string;
    api_key: string;
    api_secret: string;
    secure?: boolean;
  }

  export namespace v2 {
    function config(options: ConfigOptions): void;
    const uploader: {
      upload: (file: string, callback?: (error: any, result: any) => void) => Promise<any>;
      // ... add more uploader functions as needed
    };
    // ... add more of the Cloudinary v2 API as needed
  }
}
