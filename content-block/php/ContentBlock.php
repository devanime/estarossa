<?php

namespace DevAnime\Estarossa\ContentBlock;

/**
 * Class ContentBlock
 * @package DevAnime\Estarossa\ContentBlock
 * @author DevAnime <devanimecards@gmail.com>
 * @version 1.0
 * @property string $headline
 * @property string $content
 * @property array $cta
 * @property string $tagline
 */
class ContentBlock
{
    protected $headline;
    protected $content;
    protected $cta;
    protected $tagline;

    public function __construct(string $headline, string $content, array $cta = [], string $tagline = '')
    {
        $this->headline = $headline;
        $this->content = $content;
        $this->cta = $cta;
        $this->tagline = $tagline;
    }

    /**
     * TODO: We should aim to deprecate this method, and remove tagline from the default constructor.
     *
     * @param string $headline
     * @param string $content
     * @param array $cta
     * @return ContentBlock
     */
    public static function create(string $headline, string $content, array $cta = [])
    {
        return new static($headline, $content, $cta);
    }

    /**
     * @param string $headline
     * @param string $tagline
     * @param string $content
     * @param array $cta
     * @return ContentBlock
     */
    public static function createWithTagline(string $headline, string $tagline, string $content, array $cta = [])
    {
        $ContentBlock = new static($headline, $content, $cta);
        $ContentBlock->setTagline($tagline);
        return $ContentBlock;
    }

    public function getHeadline()
    {
        return $this->headline;
    }

    public function getTagline()
    {
        return $this->tagline ?: '';
    }

    public function getContent()
    {
        return $this->content;
    }

    public function getCTA()
    {
        return $this->cta;
    }

    public function hasHeadline()
    {
        return !empty($this->getHeadline());
    }

    public function hasTagline()
    {
        return !empty($this->getTagline());
    }

    public function hasContent()
    {
        return !empty($this->getContent());
    }

    public function hasCTA()
    {
        return !empty($this->cta);
    }

    private function setTagline($tagline)
    {
        $this->tagline = $tagline;
    }
}
