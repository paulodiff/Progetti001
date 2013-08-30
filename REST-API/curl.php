<?php

if (isset($_POST["data_2_send"])) {
    $data_2_send = $_POST["data_2_send"];
} else {
	$data_2_send = "{}";
}




$data = array(
				"time_to_live" => 108, 
				"delay_while_idle" => true,
				"data" => array (
						"score" => "4x8",
						"foreground" => true,
						"soundname" => "bell.mp3",
						"message" => "ops...",
						"msgcnt" => "12",
						"time" => "15:16.2342"
						),
				"registration_ids" => array (
						"APA91bGGGhKkhR2GE1TppjDw1XC9FXOHQzD4ZH_kebJmEGHfXM2erRjt3G9t9jfrh81Jez-gpzBgdlnCqqjnS8NHdDgZ6FlGJ4jxqrsz2Qtjrt6kDG8LahAjNlkWH9of_crBLP8QH_kCDXkmnzOParKV_KsAyMlgnA"
					)
			);                                                                    
			

$data_string = json_encode($data);                                                                                   

echo "<pre>" . $data_string . "</pre>";

$url = "https://android.googleapis.com/gcm/send";
$ch = curl_init("https://android.googleapis.com/gcm/send");
//curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_VERBOSE, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST"); 
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER , false);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
		'Content-Type: application/json',                                                                                
		'Content-Length: ' . strlen($data_string),
		'Authorization:key=AIzaSyBp249VakoQG3mNuXedhYJedjtaioiKIKg'
		)                                                                       
);  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//$result = curl_exec($ch);
$result = "ok";
curl_close ($ch);

print_r($result);

/*
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_VERBOSE, 1);
curl_setopt($ch, CURLOPT_POST, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
$returned = curl_exec($ch);

curl_close ($ch);


echo $returned;

*/




// $data = array("name" => "Hagrid", "age" => "36");                                                                    
// $data_string = json_encode($data);                                                                                   
 
// $ch = curl_init('http://api.local/rest/users');                                                                      
// curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
// curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
// curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
//  'Content-Type: application/json',                                                                                
//    'Content-Length: ' . strlen($data_string))                                                                       
// );                                                                                                                   
// $result = curl_exec($ch);



?>






