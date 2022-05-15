package com.example.pametnipaketnik

import androidx.appcompat.app.AppCompatActivity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.pametnipaketnik.model.Post
import com.example.pametnipaketnik.repository.Repository
import com.google.zxing.integration.android.IntentIntegrator
import org.json.JSONException
import org.json.JSONObject

class MainActivity : AppCompatActivity() {
    lateinit var buttonScan: Button
    lateinit var textViewAddress: TextView
    lateinit var textViewName: TextView
    lateinit var qrScan : IntentIntegrator
    var boxID: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        buttonScan = findViewById<Button>(R.id.buttonScan)
        textViewName = findViewById<TextView>(R.id.textViewName)
        textViewAddress = findViewById<TextView>(R.id.textViewAddress)
        qrScan = IntentIntegrator(this)
        qrScan.setOrientationLocked(false)
        buttonScan.setOnClickListener {
            qrScan.initiateScan()
        }
    }
	
	override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        val result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data)
        if (result != null) {
            //if qrcode has nothing in it
            if (result.contents == null) {
                Toast.makeText(this, "Result Not Found", Toast.LENGTH_LONG).show()
            } else {
                //if qr contains data
                try {
                    //converting the data to json
                    //val obj = JSONObject(result.contents)
                    //setting values to textviews
                        boxID = result.contents.toInt()
                    textViewName.text = boxID.toString()
                    //textViewAddress.setText(obj.getString("address"))
                } catch (e: JSONException) {
                    e.printStackTrace()
                    //if control comes here
                    //that means the encoded format not matches
                    //in this case you can display whatever data is available on the qrcode
                    //to a toast
                    Toast.makeText(this, result.contents, Toast.LENGTH_LONG).show()
                }
            }
        } else {
            super.onActivityResult(requestCode, resultCode, data)
        }
    }
}