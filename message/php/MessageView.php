<?php

namespace DevAnime\Estarossa\Message;

use DevAnime\Producers\Message\Message;
use DevAnime\Producers\Message\MessageCollection;
use DevAnime\Support\DateTime;
use DevAnime\View\Component;
use DevAnime\View\Element;

/**
 * Class MessageView
 * @package DevAnime\Estarossa\Message
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 *
 * @property string $id
 * @property string $message
 * @property array $link
 * @property DateTime $start
 * @property DateTime $end
 * @property int $expiry
 */
class MessageView extends Component
{
    protected $name = 'message';
    protected static $default_properties = [
        'id' => '',
        'message' => '',
        'link' => [],
        'start' => '',
        'end' => '',
        'expiry' => ''
    ];

    public function __construct(Message $Message)
    {
        parent::__construct([
            'id' => $Message->getId(),
            'message' => $Message->getContent(),
            'link' => $Message->getLink(),
            'start' => $Message->getStart(),
            'end' => $Message->getEnd(),
            'expiry' => $Message->getExpiry()
        ]);
        $this->elementAttributes([
            'data-id' => $this->id,
            'data-start' => $this->start->format(DATE_ATOM),
            'data-end' => $this->end->format(DATE_ATOM),
            'data-expiry' => $this->expiry
        ]);
    }

    public static function create(Message $Message)
    {
        if (!$Message->shouldDisplay()) {
            return '';
        }
        if ($Message->getDisplayType() === 'modal') {
            echo new MessageModalView($Message);
            return '';
        }
        $View = new static($Message);
        if ($style = $Message->getStyle()) {
            $View->classModifiers($style);
        }
        return $View;
    }

    /**
     * @deprecated
     *
     * @param Message $Message
     * @return MessageView|string
     */
    public static function createFromMessage(Message $Message)
    {
        if (!$Message->shouldDisplay()) {
            return '';
        }
        if ($Message->getDisplayType() === 'modal') {
            add_action('wp_footer', function () use ($Message) {
                echo(new MessageModalView($Message));
            });

            return '';
        }
        $View = new static($Message);
        if ($style = $Message->getStyle()) {
            $View->classModifiers($style);
        }
        return $View;
    }


    /**
     * @deprecated
     *
     * @return MessageView|string
     */
    public static function createGlobal()
    {
        $Message = Message::createFromOptions();

        // Backwards Compat
        $MessageCollection = new MessageCollection([$Message]);
        if ($MessageCollection instanceof MessageCollection && !$MessageCollection->isEmpty()) {
            echo Element::create('script', 'window.messageModalData = ' . json_encode($MessageCollection->getConfigFromDeprecatedMessageFields()),
                ['type' => 'text/javascript']);
        }
        return static::createFromMessage($Message);
    }
}
