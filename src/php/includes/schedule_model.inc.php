<?php

declare(strict_types=1);

function delete_user($pdo, $id): bool
{
    $query = "DELETE FROM EVENTS WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id);

    $stmt->execute();
    return $stmt->rowCount() > 0;
}
