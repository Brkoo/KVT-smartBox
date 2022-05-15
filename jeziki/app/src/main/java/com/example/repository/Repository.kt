package com.example.repository

import com.example.aplikacijazaprojekt.api.RetrofitInstance
import com.example.aplikacijazaprojekt.model.Post
import retrofit2.Response
import retrofit2.Retrofit

class Repository {

    suspend fun pushPost(post: Post): Response<Post> {
        return RetrofitInstance.api.pushPost(post)
    }
}