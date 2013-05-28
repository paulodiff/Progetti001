<?php
// load required files
require 'Slim/Slim.php';
require 'RedBean/rb.php';

// register Slim auto-loader
\Slim\Slim::registerAutoloader();

// set up database connection
R::setup('mysql:host=localhost;dbname=appdata','user','pass');
R::freeze(true);

// initialize app
$app = new \Slim\Slim(array(
  'cookies.secret_key' => 'my_secret_key',
));

// set default conditions for route parameters
\Slim\Route::setDefaultConditions(array(
  'id' => '[0-9]{1,}',
));

class ResourceNotFoundException extends Exception {}

// route middleware for simple API authentication
function authenticate(\Slim\Route $route) {
    $app = \Slim\Slim::getInstance();
    $uid = $app->getEncryptedCookie('uid');
    $key = $app->getEncryptedCookie('key');
    if (validateUserKey($uid, $key) === false) {
      $app->halt(401);
    }
}

function validateUserKey($uid, $key) {
  // insert your (hopefully more complex) validation routine here
  if ($uid == 'demo' && $key == 'demo') {
    return true;
  } else {
    return false;
  }
}

// handle GET requests for /articles
$app->get('/articles', 'authenticate', function () use ($app) {    
  try {
    $articles = R::find('articles'); 
    $mediaType = $app->request()->getMediaType();
    if ($mediaType == 'application/xml') {
      $app->response()->header('Content-Type', 'application/xml');
      $xml = new SimpleXMLElement('<root/>');
      $result = R::exportAll($articles);
      foreach ($result as $r) {
        $item = $xml->addChild('item');
        $item->addChild('id', $r['id']);
        $item->addChild('title', $r['title']);
        $item->addChild('url', $r['url']); 
        $item->addChild('date', $r['date']); 
      }
      echo $xml->asXml();
    } else if (($mediaType == 'application/json')) {
      $app->response()->header('Content-Type', 'application/json');
      echo json_encode(R::exportAll($articles));
    }
  } catch (Exception $e) {
    $app->response()->status(400);
    $app->response()->header('X-Status-Reason', $e->getMessage());
  }
});

// handle GET requests for /articles/:id
$app->get('/articles/:id', 'authenticate', function ($id) use ($app) {    
  try {
    $article = R::findOne('articles', 'id=?', array($id));
    if ($article) {
      $mediaType = $app->request()->getMediaType();
      if ($mediaType == 'application/xml') {
        $app->response()->header('Content-Type', 'application/xml');
        $xml = new SimpleXMLElement('<root/>');
        $result = R::exportAll($article);
        foreach ($result as $r) {
          $item = $xml->addChild('item');
          $item->addChild('id', $r['id']);
          $item->addChild('title', $r['title']);
          $item->addChild('url', $r['url']); 
          $item->addChild('date', $r['date']); 
        }
        echo $xml->asXml();      
      } else if (($mediaType == 'application/json')) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode(R::exportAll($article));
      }
    } else {
      throw new ResourceNotFoundException();
    }
  } catch (ResourceNotFoundException $e) {
    $app->response()->status(404);
  } catch (Exception $e) {
    $app->response()->status(400);
    $app->response()->header('X-Status-Reason', $e->getMessage());
  }
});

// handle POST requests for /articles
$app->post('/articles', 'authenticate', function () use ($app) {    
  try {
    $request = $app->request();
    $mediaType = $request->getMediaType();
    $body = $request->getBody();
    if ($mediaType == 'application/xml') {
      $input = simplexml_load_string($body);
    } elseif ($mediaType == 'application/json') {    
      $input = json_decode($body); 
    } 
    $article = R::dispense('articles');
    $article->title = (string)$input->title;
    $article->url = (string)$input->url;
    $article->date = (string)$input->date;
    $id = R::store($article);
    
    if ($mediaType == 'application/xml') {
      $app->response()->header('Content-Type', 'application/xml');
      $xml = new SimpleXMLElement('<root/>');
      $result = R::exportAll($article);
      foreach ($result as $r) {
        $item = $xml->addChild('item');
        $item->addChild('id', $r['id']);
        $item->addChild('title', $r['title']);
        $item->addChild('url', $r['url']); 
        $item->addChild('date', $r['date']); 
      }
      echo $xml->asXml();          
    } elseif ($mediaType == 'application/json') {
      $app->response()->header('Content-Type', 'application/json');
      echo json_encode(R::exportAll($article));
    } 
  } catch (Exception $e) {
    $app->response()->status(400);
    $app->response()->header('X-Status-Reason', $e->getMessage());
  }
});

// handle PUT requests for /articles
$app->put('/articles/:id', 'authenticate', function ($id) use ($app) {    
  try {
    $request = $app->request();
    $mediaType = $request->getMediaType();
    $body = $request->getBody();
    if ($mediaType == 'application/xml') {
      $input = simplexml_load_string($body);
    } elseif ($mediaType == 'application/json') {    
      $input = json_decode($body); 
    } 
    $article = R::findOne('articles', 'id=?', array($id));  
    if ($article) {      
      $article->title = (string)$input->title;
      $article->url = (string)$input->url;
      $article->date = (string)$input->date;
      R::store($article);    
      if ($mediaType == 'application/xml') {
        $app->response()->header('Content-Type', 'application/xml');
        $xml = new SimpleXMLElement('<root/>');
        $result = R::exportAll($article);
        foreach ($result as $r) {
          $item = $xml->addChild('item');
          $item->addChild('id', $r['id']);
          $item->addChild('title', $r['title']);
          $item->addChild('url', $r['url']); 
          $item->addChild('date', $r['date']); 
        }
        echo $xml->asXml();          
      } elseif ($mediaType == 'application/json') {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode(R::exportAll($article));
      } 
    } else {
      throw new ResourceNotFoundException();    
    }
  } catch (ResourceNotFoundException $e) {
    $app->response()->status(404);
  } catch (Exception $e) {
    $app->response()->status(400);
    $app->response()->header('X-Status-Reason', $e->getMessage());
  }
});

// handle DELETE requests for /articles
$app->delete('/articles/:id', 'authenticate', function ($id) use ($app) {    
  try {
    $request = $app->request();
    $article = R::findOne('articles', 'id=?', array($id));  
    if ($article) {
      R::trash($article);
      $app->response()->status(204);
    } else {
      throw new ResourceNotFoundException();
    }
  } catch (ResourceNotFoundException $e) {
    $app->response()->status(404);
  } catch (Exception $e) {
    $app->response()->status(400);
    $app->response()->header('X-Status-Reason', $e->getMessage());
  }
});

// generates a temporary API key using cookies
// call this first to gain access to API methods
$app->get('/demo', function () use ($app) {    
  try {
    $app->setEncryptedCookie('uid', 'demo', '5 minutes');
    $app->setEncryptedCookie('key', 'demo', '5 minutes');
  } catch (Exception $e) {
    $app->response()->status(400);
    $app->response()->header('X-Status-Reason', $e->getMessage());
  }
});


// run
$app->run();
?>