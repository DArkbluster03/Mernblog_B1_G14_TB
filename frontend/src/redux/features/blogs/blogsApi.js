import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api-neon-rho.vercel.app/api/', 
    credentials: 'include'
  }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    // Fetch blogs with filters
    fetchBlogs: builder.query({
      query: ({ search = '', category = '', location = '' }) => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category && category !== 'All Categories') params.append('category', category);
        if (location) params.append('location', location);
        return `blogs?${params.toString()}`;
      },
      providesTags: ['Blogs'],
    }),

    // Fetch a single blog by ID
    fetchBlogById: builder.query({
      query: (id) => `blogs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blogs', id }],
    }),

    // Fetch related blogs
    fetchRelatedBlogs: builder.query({
      query: (id) => `blogs/related/${id}`,
    }),

    // Create a new blog
    postBlog: builder.mutation({
      query: (newBlog) => ({
        url: '/blogs/create-post',
        method: 'POST',
        body: newBlog,
        credentials: 'include',
      }),
      invalidatesTags: ['Blogs'],
    }),

    // Update an existing blog
    updateBlog: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `blogs/update-post/${id}`,
        method: 'PATCH',
        body: rest,
        credentials: 'include',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
    }),

    // Delete a blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Blogs', id }],
    }),
  }),
});

export const { 
  useFetchBlogsQuery, 
  useFetchBlogByIdQuery, 
  usePostBlogMutation, 
  useUpdateBlogMutation, 
  useDeleteBlogMutation,
  useFetchRelatedBlogsQuery,
} = blogsApi;

