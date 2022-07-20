<?php


namespace DevAnime\Estarossa\Talent;

use DevAnime\Producers\Talent\TalentPost;
use DevAnime\Estarossa\Modal\ModalView;
use DevAnime\View\WrapperView;

class TalentCardWrapperView extends WrapperView
{
    protected $wrap_container = true;

    public function __construct(TalentPost $TalentPost, $name = 'talent-card-wrapper', $modal_name = 'talent-card-modal')
    {
        $this->View = new TalentCardView($TalentPost);
        $this->name = $name;
        $attributes = [
            'class' => $name,
        ];
        if ($TalentPost->bio && $modal_name && apply_filters('estarossa/talent/use_modal', true, $TalentPost->type_slug, $TalentPost)) {
            $attributes['class'] = 'js-modal-builder';
            $attributes['data-button'] = null;
            $attributes['data-modal-target'] = '#' . $modal_name;
            $attributes['data-gtm'] = sd_gtm_attr([
                'label' => $TalentPost->title(),
                'role' => $TalentPost->role,
                'type' => $TalentPost->type_slug
            ], false);
        }
        $this->elementAttributes($attributes);
    }
}
