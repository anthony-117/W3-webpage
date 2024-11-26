<?php

declare(strict_types=1);

function inputs_are_empty($event_name, $event_days, $from, $to): bool
{

    if (!isset($event_name) || !isset($event_days) || !isset($from) || !isset($to)) {
        return true;
    }
    return false;
}
function from_time_greater_than_to_time($from, $to)
{
    if ($from >= $to) {
        return true;
    }
    return false;
}
