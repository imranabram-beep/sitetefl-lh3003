/* eslint-disable */
// Supabase client stub - using mock data fallback for development
// TODO: Install @supabase/supabase-js once npm registry access is restored

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Stub Supabase client - the API will use mock data fallback
export const supabase = {
  from: (table: string) => ({
    select: (fields: string) => ({
      ilike: (field: string, value: string) => ({
        eq: (field: string, value: string) => ({
          limit: async (num: number) => ({
            data: null,
            error: { message: "Supabase not yet installed - using mock data" }
          })
        }),
        limit: async (num: number) => ({
          data: null,
          error: { message: "Supabase not yet installed - using mock data" }
        })
      }),
      eq: (field: string, value: string) => ({
        limit: async (num: number) => ({
          data: null,
          error: { message: "Supabase not yet installed - using mock data" }
        })
      }),
      limit: async (num: number) => ({
        data: null,
        error: { message: "Supabase not yet installed - using mock data" }
      })
    })
  })
};
