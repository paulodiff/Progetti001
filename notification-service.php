<?php


//http://www.lornajane.net/posts/2011/posting-json-data-with-php-curl

//echo "Json Data" . var_dump($HTTP_RAW_POST_DATA);
//echo json_decode($HTTP_RAW_POST_DATA);


$authorization_header = "Authorization:" . $_GET['Authorization'];
print_r($authorization_header);

$inputJSON = file_get_contents('php://input');
print_r($inputJSON);
$input= json_decode( $inputJSON, TRUE ); //convert JSON into array
//print_r($input);
$input2=json_encode($input);
//print_r($input2);

$data_string = $inputJSON;                                                                                   

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
		$authorization_header
		)                                                                       
);  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
//$result = "ok";
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






