<?php

header('Access-Control-Allow-Origin: https://android.googleapis.com/gcm/send');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');


include 'http-test.html';

?>

<a href="http-test.php?<?php echo time(); ?>">Reload</a>