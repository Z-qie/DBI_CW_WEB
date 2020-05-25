
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';

    $username = $_POST['username'];
    $password = $_POST['password'];
 
    // check if username is unique during registration
    $stmt = pdoQuery($conn, "SELECT * FROM Rep WHERE username = '$username' AND password = '$password'");
    $row = $stmt -> fetch(PDO::FETCH_BOTH);
    if ($row) { // success
        echo "Logging..";
        $conn = null;
    } else { // fail
        echo "Sorry, user name or password incorrect, please kindly check again.<br />
            Hint: <br />
            1. User name can only be within 4-16 alphanumeric characters. <br />
            2. Password can only be within 6-32 alphanumeric characters. ";
        $conn = null;
    }
?>

