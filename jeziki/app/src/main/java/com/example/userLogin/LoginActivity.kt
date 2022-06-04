package com.example.userLogin

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

import com.example.R


import com.google.android.material.textfield.TextInputEditText
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException


class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)


        val buttonLogin: Button = findViewById(R.id.buttonLogin)

        val buttonRegister = findViewById<Button>(R.id.buttonRegister)
        buttonRegister.setOnClickListener{
            val intent = Intent(this, RegsterActivity::class.java)
            startActivity(intent)
        }

        buttonLogin.setOnClickListener{
            getLogin()
        }
    }
    fun getLogin(){
        val editTextEmail = findViewById<TextInputEditText>(R.id.editTextEmail)
        val editTexPassword = findViewById<TextInputEditText>(R.id.editTextPassword)
        val username = editTextEmail.text.toString()
        val password = editTexPassword.text.toString()
        Thread(Runnable {
            val MEDIA_TYPE_JSON = "application/json; charset=utf-8".toMediaType()
            val client = OkHttpClient()

            Log.d("Main",username)
            Log.d("Main", password)
            //val payload = """{"username" : ${email.toString()}, "password" : ${password.toString()}}"""
            /*val formBody: RequestBody = FormBody.Builder()
                .add("username", "b")
                .add("password", "b")

                .build()
*/
            //val json = "{\"username\":e,\"password\":\"e\"}"

            val jsonObject = JSONObject()
            jsonObject.put("username", username)
            jsonObject.put("password", password)

            val body = jsonObject.toString().toRequestBody("application/json; charset=utf-8".toMediaTypeOrNull())

            val request = Request.Builder()
                .url(BASE_URL)
                .post(body)
                .build()
            try {
                client.newCall(request).execute().use { response ->
                    if (!response.isSuccessful){
                        showToast("Wrong username or password")
                        throw IOException("Unexpected code $response")
                    }


                    val responseData = response.body!!.string()
                    //Toast.makeText(this, response.code.toString(), Toast.LENGTH_SHORT).show()
                    Log.d("Main", response.code.toString())
                    Log.d("Main", responseData)
                    //Log.d("Main", response.message)
                    //val jsonObject = JSONObject(responseData)

                    //val boxToken = jsonObject.getString("data")
                    sharedPrefrences.setUserName(this, username)
                    val intent2 = Intent(this, MainActivity::class.java)
                    startActivity(intent2)
                }
            }catch (e:Exception){
                //Toast.makeText(this, "Unable to login", Toast.LENGTH_SHORT).show()
                showToast("Unable to login try again or check your connection")
                Log.d("Main", "Problem at logging in: $e")
            }

        }).start()

    }
    fun showToast(toast: String?) {
        runOnUiThread {
            Toast.makeText(this, toast, Toast.LENGTH_SHORT).show()
        }
    }
}