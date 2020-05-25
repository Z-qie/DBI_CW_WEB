
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';

    // get all orders in processing
    $query = "SELECT * FROM Quota_Request ORDER BY request_ID DESC";
    $stmt = pdoQuery($conn, $query);
    $count = 0;


    echo "<div class='request_title'>REQUEST</div><div class='hide_request_section'>&#x29D0;</div>";

    // get order info in loop
    while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) {
        $rep_ID = $row['rep_ID'];
        $request_ID = $row['request_ID'];
        $quota_quantity = $row['quota_quantity'];
        $time = date_format(date_create($row['request_date']), 'h:i A');
        $date = date_format(date_create($row['request_date']), 'Y-m-d');
        
        //get rep name
        $query1 = "SELECT * FROM Rep WHERE rep_ID = $rep_ID";
        $stmt1 = pdoQuery($conn, $query1);
        $row1 = $stmt1 -> fetch(PDO::FETCH_ASSOC);
       

        if ($row['request_status'] == 'no response') {
            if ($row1['quota'] > 0) {
                 // set list
                echo 
                "<div class='request_list' style='top: " . ( 4 +$count * 15) . "%;'>" .
                    "<div class='time'>" . $time . "</div>" .
                    "<div class='date'>" . $date . "</div>" .
                    "<div class='description'>REQUEST ID: " .  $request_ID . " &nbsp; REP ID: " .  $rep_ID . "&nbsp; QUOTA REQUEST: " . $quota_quantity . "</div>" .
                    "<div class='rep_name'>Sale Rep: " .$row1['username'] . " &nbsp; QUOTA REMAINING: " . $row1['quota'] . "</div>" .
                    "<div class='status' style='color: red;  text-shadow: 0 0 5px red; '>STATUS: " . $row['request_status'] ."</div>" .
                    "<div class='grant'>UPDATE</div>" .
                    "<div class='refuse_request'>REFUSE</div>" .
                    "<div class='request_confrim'></div>" .
                "</div>";
            } else {
                 // set list
                 echo 
                 "<div class='request_list' style='top: " . (4 + $count * 15) . "%;'>" .
                     "<div class='time'>" . $time . "</div>" .
                     "<div class='date'>" . $date . "</div>" .
                     "<div class='description'>REQUEST ID: " .  $request_ID . " &nbsp; REP ID: " .  $rep_ID . "&nbsp; QUOTA REQUEST: " . $quota_quantity . "</div>" .
                     "<div class='rep_name'>Sale Rep: " .$row1['username'] . " &nbsp; QUOTA REMAINING: " . $row1['quota'] . "</div>" .
                     "<div class='status' style='color: red;  text-shadow: 0 0 5px red; '>STATUS: " . $row['request_status'] ."</div>" .
                     "<div class='grant'>REGRANT</div>" .
                     "<div class='refuse_request'>REFUSE</div>" .
                     "<div class='request_confrim'></div>" .
                 "</div>";
            }
        } else {
                // set list
                echo 
                "<div class='request_list' style='top: " . (4 + $count * 15) . "%;'>" .
                    "<div class='time'>" . $time . "</div>" .
                    "<div class='date'>" . $date . "</div>" .
                    "<div class='description'>REQUEST ID: " .  $request_ID . " &nbsp; REP ID: " .  $rep_ID . "&nbsp; QUOTA REQUEST: " . $quota_quantity . "</div>" .
                    "<div class='rep_name'>Sale Rep: " .$row1['username'] . " &nbsp; QUOTA REMAINING: " . $row1['quota'] . "</div>" .
                    "<div class='status'>STATUS: " . $row['request_status'] ."</div>" .
                    "<div class='request_confrim'></div>" .
                "</div>";
        }
        
        $count++;
    }

     $conn = null;
?>