import { supabase } from "../../lib/supabase";

export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export abstract class BaseService {
  protected async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      throw new Error("User not authenticated");
    }

    return user;
  }

  protected handleError(error: any, context: string): ServiceResponse<any> {
    console.error(`[${context}] Error:`, error);

    // Handle different types of errors
    if (error?.message) {
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    if (typeof error === "string") {
      return {
        data: null,
        error,
        success: false,
      };
    }

    return {
      data: null,
      error: "Terjadi kesalahan yang tidak terduga",
      success: false,
    };
  }

  protected createSuccessResponse<T>(data: T): ServiceResponse<T> {
    return {
      data,
      error: null,
      success: true,
    };
  }
}
