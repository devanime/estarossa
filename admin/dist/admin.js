jQuery(function($) {
    var $seoMeta = $("#wpseo_meta").find('[class*="SnippetPreview__MobileContainer"]');
    var $titleContainer = $("#titlediv");
    if (!($seoMeta.length && $titleContainer.length)) {
        return
    }
    var metaTitle = $seoMeta.find('[class*="SnippetPreview__TitleUnboundedMobile"]').first().text();
    var metaDescription = $seoMeta.find('[class*="SnippetPreview__MobileDescription"]').first().text();
    var $content = $('<div class="seo-preview">' + '<p class="seo-preview__label">SEO Snippet Preview</p>' + '<p class="seo-preview__title">' + metaTitle + "</p>" + '<p class="seo-preview__desc">' + metaDescription + "</p>" + '<a class="seo-preview__link" href="#wpseo_meta">edit</a>' + "</div>");
    $titleContainer.append($content)
});