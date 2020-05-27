
<?php
    // connect and include all wrapper funcitons
    include 'connect.php';
    $customer_username = $_POST['username'];
    // get all active rep names who are currently serving the same region as users'
    $query = "    
        SELECT R.username 
        FROM Customer C, Rep R 
        WHERE C.username = '$customer_username' AND C.country = R.country AND R.working_status = 'active'";

    $stmt = pdoQuery($conn, $query);
    // keep first line in selection bar safe 
    echo "<option value=''>&#x2B18; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Select a representative </option>";

    // add all valid reps in the selection bar.
    while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        echo "<option value='" . $row['username'] . "'>" . $row['username'] . "</option>";
    }
    $conn = null;
?>

