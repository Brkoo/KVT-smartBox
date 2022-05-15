package com.example.aplikacijazaprojekt.api

import com.example.aplikacijazaprojekt.utils.constans.Companion.API_KEY
import com.example.aplikacijazaprojekt.utils.constans.Companion.BASE_URL

import retrofit2.converter.gson.GsonConverterFactory
import java.util.AbstractMap
import okhttp3.Interceptor

import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response


import retrofit2.Retrofit
import java.io.IOException


object RetrofitInstance {

    class OAuthInterceptor(private val tokenType: String, private val acceessToken: String): Interceptor {

        override fun intercept(chain: Interceptor.Chain): okhttp3.Response {
            var request = chain.request()
            request = request.newBuilder().header("Authorization", "$tokenType $acceessToken").build()

            return chain.proceed(request)
        }
    }
    val client =  OkHttpClient.Builder()
        .addInterceptor(OAuthInterceptor("Bearer", "timotejspremeni"))
        .build()


    /*var client2: OkHttpClient = Retrofit.Builder().addInterceptor(object : Interceptor {
        @Throws(IOException::class)
        override fun intercept(chain: Interceptor.Chain): Response {
            val newRequest: Request = chain.request().newBuilder()
                .addHeader("Authorization", "Bearer $token")
                .build()
            return chain.proceed(newRequest)
        }
    }).build()

     */
    private val retrofit by lazy {
        Retrofit.Builder()
            .client(client)
            .baseUrl("timotejspremeni")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
    val api: SimpleApi by lazy {
        retrofit.create(SimpleApi::class.java)
    }
}