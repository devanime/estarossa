<?php
/**
 * Expected:
 * @var string $container_id
 * @var bool $enable_anti_flicker
 */
?>

<!-- Google Tag Manager -->
<script>(function(w, d, s, l, i) {
        w[l]= w[l]||[];w[l].push({'gtm.start':new Date().getTime(), event:'gtm.js'});var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l :'';j.async = true;j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', '<?= $container_id; ?>');</script>
<!-- End Google Tag Manager -->
<?php if ($enable_anti_flicker): ?>
<!-- Anti-flicker snippet  -->
<script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
        h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
        (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
    })(window,document.documentElement,'async-hide','dataLayer',4000,
        {'<?= $container_id; ?>':true});</script>
<style>.async-hide .optimize-target { opacity: 0;}</style>
<!-- End Anti-flicker snippet  -->
<?php endif; ?>