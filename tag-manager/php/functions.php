<?php

/**
 * @param string|array $attr
 * @param bool         $include_attr_key Set false to just get the value
 *
 * @return string
 */
function sd_gtm_attr($attr, $include_attr_key = true)
{
    if (is_array($attr) || is_object($attr)) {
        $attr = json_encode($attr);
    };
    $attr = esc_attr($attr);

    return $include_attr_key ? "data-gtm='{$attr}'" : $attr;
}
