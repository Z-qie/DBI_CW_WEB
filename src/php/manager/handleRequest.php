
<?php
    // connect and include all wrapper funcitons
    include '../connect.php';

    $option = $_POST['option'];
    $request_ID = $_POST['request_ID'];
    

    if ($option == 'UPDATE') {
        // get rep ID
        $query = "SELECT * FROM Quota_Request WHERE request_ID = $request_ID";
        $stmt = pdoQuery($conn, $query);
        $row = $stmt -> fetch(PDO::FETCH_ASSOC);
        $rep_ID = $row['rep_ID'];

        // get quota request
        $query3 = "SELECT quota_quantity FROM Quota_Request WHERE request_ID = $request_ID";
        $stmt3 = pdoQuery($conn, $query3);
        $row3 = $stmt3 -> fetch(PDO::FETCH_ASSOC);
        $quota_quantity = $row3['quota_quantity'];
    
        
        $query4 = "SELECT quota FROM Rep WHERE rep_ID = $rep_ID";
        $stmt4 = pdoQuery($conn, $query4);
        $row4 = $stmt4 -> fetch(PDO::FETCH_ASSOC);
        $quota_remain = $row4['quota'];
        $quota =  $quota_remain + $quota_quantity;

        $query4 = "UPDATE Rep SET quota = $quota WHERE rep_ID = $rep_ID";
        $stmt4 = pdoExec($conn, $query4);

        $query1 = "UPDATE Quota_Request SET request_status = 'updated' WHERE request_ID = $request_ID";
        $stmt1 = pdoExec($conn, $query1);
        
    
    } else if ($option == 'REGRANT') {

         // get rep ID
         $query = "SELECT * FROM Quota_Request WHERE request_ID = $request_ID";
         $stmt = pdoQuery($conn, $query);
         $row = $stmt -> fetch(PDO::FETCH_ASSOC);
         $rep_ID = $row['rep_ID'];
 
         // get quota request
         $query3 = "SELECT quota_quantity FROM Quota_Request WHERE request_ID = $request_ID";
         $stmt3 = pdoQuery($conn, $query3);
         $row3 = $stmt3 -> fetch(PDO::FETCH_ASSOC);
         $quota_quantity = $row3['quota_quantity'];
     
         
         $query4 = "SELECT quota FROM Rep WHERE rep_ID = $rep_ID";
         $stmt4 = pdoQuery($conn, $query4);
         $row4 = $stmt4 -> fetch(PDO::FETCH_ASSOC);
         $quota_remain = $row4['quota'];
         $quota =  $quota_remain + $quota_quantity;
 
         $query4 = "UPDATE Rep SET quota = $quota WHERE rep_ID = $rep_ID";
         $stmt4 = pdoExec($conn, $query4);


        $query1 = "UPDATE Quota_Request SET request_status = 'regranted' WHERE request_ID = $request_ID";
        $stmt1 = pdoExec($conn, $query1);

    } else if ($option == 'REFUSE') {

        $query1 = "UPDATE Quota_Request SET request_status = 'refused' WHERE request_ID = $request_ID";
        $stmt1 = pdoExec($conn, $query1);
    }
        

    $conn = null;
?>
    