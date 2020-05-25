
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';
    $rep_username = $_POST['username'];
   
    // get rep quota
    $query1 = "SELECT quota FROM Rep WHERE username = '$rep_username'";
    $stmt1 = pdoQuery($conn, $query1);
    $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
    $quota = $row1['quota'];

    // if quota > 0, rep can only ask for updating
    if ($quota > 0) {
        echo 
            "<div class='request_bar'>QUOTA REQUEST</div>" .
            "<div class='request_alert'><span>QUOTA REMAIN: </span>" . $quota .
            "<br />You can send request to <span>UPDATE</span> your quota.</div>" .
            "<div class='quota_quantity'><input type='text' value='1000'></div>" .
            "<div class='request_option'>SEND REQUEST</div>" .
            "<div class='hide_request'>&#x29CB;</div>" .
            "<div class='request_confirm'>REQUEST SENT!<br /><br />Manager will respond soon. Please be aware to check your quota.<br /><br /><br />
            <div class='hide_request_confirm'>&#x29CB;</div></div>";
    }
    // if quota <= 0, rep can only ask for regrant
    if ($quota <= 0) {
        echo 
            "<div class='request_bar'>QUOTA REQUEST</div>" .
            "<div class='request_alert'><span>QUOTA EXCEED: </span>" . (0 - $quota) .
            "<br />You can send request asking for <span>REGRANT</span> your quota.</div>" .
            "<div class='quota_quantity'><input type='text' value='1000'></div>" .
            "<div class='request_option'>SEND REQUEST</div>" .
            "<div class='hide_request'>&#x29CB;</div>" .
            "<div class='request_confirm'>REQUEST SENT!<br /><br />Manager will respond soon. Please be aware to check your quota.<br /><br /><br />
            <div class='hide_request_confirm'>&#x29CB;</div></div>";
    }

    $conn = null;
?>

