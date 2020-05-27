
<?php
    // connect and include all wrapper funcitons
    include 'connect.php';

    $username = $_POST['username'];
    $password = $_POST['password'];
 
    // check if username is unique during registration
    $stmt = pdoQuery($conn, "SELECT * FROM Customer WHERE username = '$username' AND password = '$password'");
    $row = $stmt -> fetch(PDO::FETCH_BOTH);
    if ($row) { // success
        echo "Logging..";
        $conn = null;
    } else { // fail
        echo "Sorry, user name or password incorrect, please kindly check again.";
        $conn = null;
    }
?>

