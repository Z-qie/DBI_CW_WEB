
<?php
    // connect and include all wrapper funcitons
    include 'connect.php';

    // get all current unit price of all kinds of mask.
    $stmt = pdoQuery($conn, "SELECT unit_price FROM Mask");
    $rows = $stmt -> fetchAll(PDO::FETCH_BOTH);
    echo $rows[0][0] . " " . $rows[1][0] . " " . $rows[2][0];
    $conn = null;
?>

