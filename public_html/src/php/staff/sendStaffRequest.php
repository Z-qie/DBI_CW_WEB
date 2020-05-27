
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['username'];
    $quota_quantity = $_POST['quota_quantity'];

    // get request date
    $request_date = date("Y-m-d H:i:s");

    // get rep ID
    $query1 = "SELECT rep_ID FROM Rep WHERE username = '$rep_username'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $rep_ID = $row1['rep_ID'];

    // check if rep already has request with no response yet by manager
    $query2 = "SELECT request_status FROM Quota_Request WHERE rep_ID = $rep_ID";
    $stmt2 = pdoQuery($conn, $query2);

    $is_allowed = true;
    while ($row2 = $stmt2 -> fetch(PDO::FETCH_ASSOC)) {
        if ($row2['request_status'] == 'no response') {
            $is_allowed = false;
        }
    }
    
    if ($is_allowed == false) {
        // if rep currently has a request with no response by manager yet, alert
        echo "SORRY!<br /><br />You currently have a request with no response by manager yet, please wait.<br /><br /><br />
        <div class='hide_request_confirm'>&#x29CB;</div>";

    } else {
        // create request
        $query3 = 
        "INSERT INTO Quota_Request 
        (request_date, rep_ID, quota_quantity, request_status) 
        VALUES 
        ('$request_date', $rep_ID, $quota_quantity, 'no response')";
        $stmt3 = pdoExec($conn, $query3);

        echo "REQUEST SENT!<br /><br />Manager will respond soon. Please be aware to check your quota.<br /><br /><br />
        <div class='hide_request_confirm'>&#x29CB;</div>";
    }

    $conn = null;
?>