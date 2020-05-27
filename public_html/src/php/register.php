
<?php
    // connect and include all wrapper funcitons
    include 'connect.php';
    $username = $_POST['username'];
    $password = $_POST['password'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $passport_ID = $_POST['passport_ID'];
    $country = $_POST['country'];   

    // check if username is unique during registration
    $stmt = pdoQuery($conn, "SELECT * FROM Customer WHERE username = '$username' OR passport_ID = '$passport_ID'");
    $row = $stmt -> fetch(PDO::FETCH_BOTH);
    if (empty($row[0])) {
        $insert = "INSERT INTO Customer(username, password, first_name, last_name, telephone, email, passport_ID, country) VALUES ('$username','$password','$first_name','$last_name','$telephone','$email','$passport_ID', '$country');";
        pdoExec($conn, $insert);
        echo "Sign up successfully! Welcome, " . $username . "! Jumping to Log in now..";
        $conn = null;
    } else {
        echo "Sorry, user name or passport ID already exist, please kindly choose another one.";
        $conn = null;
    }
?>

