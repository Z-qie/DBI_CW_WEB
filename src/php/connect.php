<?php
    header("Content-type:text/html;charset=utf-8");
    $responseData = array("code" => 0, "message" => "");
    // this file connects databse of mysql
    // use PDO to do all operations on database.
    try{
        $dsn = "mysql:dbname=DBICW;host=127.0.0.1;";
        $name = "root";
        $pwd = "Daniel+1997=";
        $conn = new PDO($dsn,$name,$pwd);
        $conn -> setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        // var_dump($conn);
    } catch (PDOException $e) {
        echo $e -> getMessage();
    }

    // wrap operation to handle system error.
    // wrapped execution funciton:
    function pdoExec ($pdo, $sql) {
        $res = $pdo -> exec($sql);
        if ($res === false) {
            echo 'SQL Error: <br />';
            echo 'Error code: ' . $pdo -> errorCode() . '<br />';
            echo 'Error Info: ' . $pdo -> errorInfo()[2];
            exit;
        }
        return $res;
    }
    // wrapped query funciton:
    function pdoQuery ($pdo, $sql) {
        $stmt = $pdo -> query($sql);
        if ($stmt === false) {
            echo 'SQL Error: <br />';
            echo 'Error code: ' . $pdo -> errorCode() . '<br />';
            echo 'Error Info: ' . $pdo -> errorInfo()[2];
            exit;
        }
        return $stmt;  
    }
?>