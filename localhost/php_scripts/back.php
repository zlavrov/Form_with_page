<?php

if (isset($_POST['Fname']) && isset($_POST['Lname']) && isset($_POST['Email'])) {
    $fname = htmlspecialchars(stripslashes(strip_tags(trim($_POST['Fname']))), ENT_QUOTES);
    $lname = htmlspecialchars(stripslashes(strip_tags(trim($_POST['Lname']))), ENT_QUOTES);
    $email = htmlspecialchars(stripslashes(strip_tags(trim($_POST['Email']))), ENT_QUOTES);
    $flname = $fname . ' ' . $lname;
    $users = [ "id" => [ 1, 2, 3, 4, 5],
            "name" => ["Adam Cotter", "Pauline Noble", "Sherilyn Metzel", "Terrie Boaler", "Rutter Pude"],
            "email" => ["adam.cotter@gmail.com", "pauline.noble@gmail.com", "sherilyn.metzel@gmail.com", "terrie.boaler@gmail.com", "rutter.pude@gmail.com"],
        ];

        if (in_array($flname, $users['name']) && in_array($email, $users['email']) && array_search($flname, $users['name']) == array_search($email, $users['email'])) {
            $key = array_search($flname, $users['name']);
            $flog = fopen('log.txt', 'a');
            fwrite($flog, "{user: " . $flname . ", id: " . $users["id"][$key] . ", adress: " . $email . ", is in the array: true}\n");
            fclose($flog);
            echo json_encode(array('result' => true));
        } else {
            $flog = fopen('log.txt', 'a');
            fwrite($flog, "{user: " . $flname . ", adress: " . $email . ", is in the array: false}\n");
            fclose($flog);
            echo json_encode(array('result' => false));
        }

} else {

    echo json_encode(array('result' => false));
    exit;
    
}

?>