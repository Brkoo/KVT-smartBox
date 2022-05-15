package com.example.aplikacijazaprojekt.api

import com.example.aplikacijazaprojekt.model.Post
import com.example.aplikacijazaprojekt.utils.constans.Companion.API_KEY
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Headers
import retrofit2.http.POST

interface SimpleApi {
    //@Headers("Authorization " + API_KEY)
    @POST("Access/openbox")
    suspend fun pushPost(
        //@Body post: Post): Response<Post>    KARLO SPREMENI
}