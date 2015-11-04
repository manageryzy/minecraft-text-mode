<?
/*
A basic php file to get skin from mojang.
Author : manageryzy
*/

if(!isset($_GET['username'])){
	header("Status: 404 Not Found");
	echo 'No username';
	die;
}

header('image/png');

if($_GET['username']=='steve'){
	echo file_get_contents('steve.png');
	die;
}

@$uuid_json = file_get_contents('https://api.mojang.com/users/profiles/minecraft/'.$_GET['username']);
if($uuid_json===FALSE){
	echo file_get_contents('steve.png');
	die;
}
$o = json_decode($uuid_json);
if(!isset($o->id)){
	echo file_get_contents('steve.png');
	die;
}
$uuid = $o->id;


@$profile_json = file_get_contents('https://sessionserver.mojang.com/session/minecraft/profile/'.$uuid);
if($profile_json===FALSE){
	echo file_get_contents('steve.png');
	die;
}
$profile = json_decode($profile_json);
$v = $profile->properties[0]->value;

$texture_json = base64_decode($v);
$texture = json_decode($texture_json);

$url = $texture->textures->SKIN->url;
// header("Location: $url")

echo file_get_contents($url);
?>