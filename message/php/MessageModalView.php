<?php

namespace DevAnime\Estarossa\Message;

use DevAnime\Producers\Message\Message;
use DevAnime\Producers\Message\MessageCollection;
use DevAnime\Estarossa\LazyImage\LazyImageView;
use DevAnime\Estarossa\Modal\ModalView;
use DevAnime\Estarossa\ResponsivePicture\ResponsivePictureView;
use DevAnime\Support\DateTime;
use DevAnime\View\Component;
use DevAnime\View\Element;
use WP_Image;

/**
 * Class MessageModalView
 * @author  DevAnime <devanimecards@gmail.com>
 * @contributor DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string   $id
 * @property string   $modal_id
 * @property string   $modal_style
 * @property string   $trigger
 * @property int      $delay
 * @property int      $scrollDistance
 * @property string   $heading
 * @property string   $heading_el
 * @property string   $heading_class
 * @property string   $image
 * @property string   $message
 * @property string   $link
 * @property string   $link_class
 * @property DateTime $start
 * @property DateTime $end
 * @property string   $expiry
 */
class MessageModalView extends Component
{
    protected $name = 'message-modal';
    protected static $default_properties = [
        'id' => '',
        'modal_id' => '',
        'modal_style' => '',
        'trigger' => '',
        'delay' => '',
        'scrollDistance' => '',
        'heading' => '',
        'heading_el' => '',
        'heading_class' => '',
        'image' => '',
        'message' => '',
        'link' => [],
        'link_class' => '',
        'start' => '',
        'end' => '',
        'expiry' => ''
    ];
    protected $json = [];

    public function __construct(Message $Message)
    {
        $image = array_filter((array) apply_filters('estarossa/message-modal/image', [
            'xs' => WP_Image::get_by_attachment_id($Message->getImageMobileId()),
            'md' => WP_Image::get_by_attachment_id($Message->getImageId())
        ]));
        $image = count($image) > 1 ? ResponsivePictureView::createFromBreakpoints($image) : array_pop($image);
        $image = $image instanceof WP_Image ? LazyImageView::create($image) : $image;
        parent::__construct([
            'id' => $Message->getId(),
            'modal_id' => $Message->getModalId(),
            'modal_style' => $Message->getModalStyle(),
            'trigger' => $Message->getModalTrigger(),
            'delay' => $Message->getModalTriggerDelay(),
            'scrollDistance' => $Message->getModalTriggerDistance(),
            'heading' => $Message->getHeading(),
            'heading_el' => apply_filters('estarossa/message-modal/heading-el', 'h2'),
            'heading_class' => apply_filters('estarossa/message-modal/heading-class', 'heading heading--large'),
            'image' => $image,
            'message' => $Message->getContent(),
            'link' => $Message->getLink(),
            'link_class' => apply_filters('estarossa/message-modal/link-class', 'button button--default'),
            'start' => $Message->getStart(),
            'end' => $Message->getEnd(),
            'expiry' => $Message->getExpiry()
        ]);
    }

    protected function render(array $scope): string
    {
        if ($this->modal_style === 'existing') {
            return '';
        }
        return ModalView::create($this->modal_id, array_merge([$this->modal_style, 'message'], apply_filters('estarossa/message-modal/modal-modifiers', [])), parent::render($scope));
    }
}
