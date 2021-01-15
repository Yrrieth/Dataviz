<?php

	$files = array();

	$dir = opendir('images/faces/');

	$index = 0;
	while ($file = readdir($dir)) {
	    if ($file == '.' || $file == '..') {
	        continue;
	    }

	    $element["indexImage"] = $index++;
	    $element["URL"] = $file;
	    array_push($files, $element);
	}

	header('Content-type: application/json');
	/*echo*/ $jsonData =  json_encode($files);
	
	echo $jsonData;

	file_put_contents('dataImage.json', $jsonData);

?>