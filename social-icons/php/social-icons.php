<?php
/**
 * Expected:
 * @var SocialIconCollection $icons
 * @var array $class_modifiers
 * @var array $element_attributes
 */

use DevAnime\Estarossa\Icon\IconView;
use DevAnime\Estarossa\SocialIcons\SocialIconCollection;
use DevAnime\Estarossa\SocialIcons\SocialIcon;
use DevAnime\Util; ?>

<ul <?= Util::componentAttributes('social-icons', $class_modifiers, $element_attributes); ?>>
    <?php foreach ($icons as $SocialIcon) : /* @var SocialIcon $SocialIcon */ ?>
        <li class="social-icons__item">
            <a class="social-icons__link" href="<?= $SocialIcon->getUrl(); ?>" target="<?= $SocialIcon->getTarget(); ?>"
               aria-label="<?= $SocialIcon->getLabel(); ?>">
                <?= IconView::createFromSocialIcon($SocialIcon); ?>
            </a>
        </li>
    <?php endforeach; ?>
</ul>
