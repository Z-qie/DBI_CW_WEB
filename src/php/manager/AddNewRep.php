
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $username = $_POST['username'];
    $password = $_POST['password'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $quota = $_POST['quota'];
    $country = $_POST['country'];   


    // check if username is unique during registration
    $stmt = pdoQuery($conn, "SELECT * FROM Rep WHERE username = '$username'");
    $row = $stmt -> fetch(PDO::FETCH_BOTH);
    if (empty($row[0])) {
        $insert = "INSERT INTO Rep(username, password, first_name, last_name, telephone, email, quota, country, working_status) VALUES ('$username','$password','$first_name','$last_name','$telephone','$email', $quota, '$country', 'active');";
        pdoExec($conn, $insert);
        echo "Successfully sign up new sale rep account!";
        $conn = null;
    } else {
        echo "Sorry, user name already exist, please kindly choose another one.";
        $conn = null;
    }
?>

