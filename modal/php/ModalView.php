<?php

namespace DevAnime\Estarossa\Modal;
use DevAnime\View\ComponentView;

/**
 * Class ModalView
 * @package DevAnime\Estarossa\Modal
 * @property string $class
 * @property string $id
 * @property string $type
 * @property string $content
 * @property string $format_content
 * @property string $label
 */
class ModalView extends ComponentView
{
    const TYPE_BOX = 'box';
    const TYPE_CENTERED = 'centered';
    const TYPE_VIDEO = 'video';

    protected $default_template = __DIR__ . '/modal';
    protected $name = 'modal';
    protected static $modals_loaded = [];

    public function __construct(array $properties = [])
    {
        parent::__construct($properties);
        $type = array_filter((array) $this->type);
        $this->class = implode(' ', array_map(function($t) { return "modal--$t"; }, $type));
        if (!isset($this->content)) {
            $this->content = '';
        }
        if ($this->format_content) {
            $this->content = apply_filters('the_content', $this->content);
        }
    }

    public static function create($id, $type, $content = '', $format_content = false, $label = '')
    {
        return new static(compact('id', 'type', 'content', 'format_content', 'label'));
    }

    public static function load($id, $type, $content = '', $format_content = false, $label = '')
    {
        $id = str_replace('_', '-', $id);
        if (!in_array($id, self::$modals_loaded)) {
            self::$modals_loaded[$id] = compact('id', 'type', 'content', 'format_content', 'label');
        }
    }

    public static function unloadAll()
    {
        $ret = '';
        foreach (self::$modals_loaded as $item) {
            $ret .= new static($item);
        }
        self::$modals_loaded = [];
        return $ret;
    }
}
