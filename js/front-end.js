$(function(){document.createElement('HEADER');document.createElement('VIDEO');var $win=$(window);var $doc=$(document);var $body=$('body');var siteWidth=parseInt($('meta[name=website-width]').attr('content'))||null;window.silex=window.silex||{};window.silex.siteWidth=siteWidth;window.silex.scale=1;window.silex.scroll={top:0,left:0};window.silex.resizeBody=function(){};if($body.hasClass('silex-runtime')){if(!$body.hasClass('silex-published')){initPages();}
onScroll();onResize();$win.resize(onResize);$win.scroll(onScroll);function getScroll(){var container=$(document.scrollingElement||'html');return{left:container.scrollLeft(),top:container.scrollTop()}}
function onResize(){var ratio=getScaleRatio();var scroll=getScroll();$doc.trigger('silex.preresize',{scrollTop:scroll.top/ratio,scrollLeft:scroll.left/ratio,scale:ratio});window.data={scrollTop:scroll.top/ratio,scrollLeft:scroll.left/ratio,scale:ratio};window.silex.scale=ratio;window.silex.scrollTop=scroll.top;window.silex.scrollLeft=scroll.left;if(ratio===1){$body.css({'transform':'','transform-origin':'','min-width':'','height':''});$('.prevent-scale').css({'transform':'','transform-origin':''})}
else{$body.css({'transform':'scale('+ratio+')','transform-origin':'0 0','min-width':getScaleBreakPoint()+'px','height':$body.height()*ratio});$('.prevent-scale').css({'transform':'scale('+(1/ratio)+')','transform-origin':'0 0'})}
$doc.trigger('silex.resize',{scrollTop:scroll.top/ratio,scrollLeft:scroll.left/ratio,scale:ratio});}
function onScroll(){var ratio=getScaleRatio();var scroll=getScroll();$doc.trigger('silex.prescroll',{scrollTop:scroll.top/ratio,scrollLeft:scroll.left/ratio,scale:ratio});window.data={scrollTop:scroll.top/ratio,scrollLeft:scroll.left/ratio,scale:ratio};var offsetTop=scroll.top/ratio;var offsetLeft=scroll.left/ratio;$('.fixed').css({'position':'','transform':'translate('+offsetLeft+'px, '+offsetTop+'px)','transform-origin':'0 0'});$('.fixed.prevent-scale').css({'position':'','transform':'translate('+offsetLeft+'px, '+offsetTop+'px) scale('+(1/ratio)+')','transform-origin':'0 0'});$doc.trigger('silex.scroll',{scrollTop:scroll.top/ratio,scrollLeft:scroll.left/ratio,scale:ratio});}
function isBellowBreakPoint(){return window.matchMedia('only screen and (max-width: 480px)').matches;}
function getScaleRatio(){var winWidth=$win.width();if((siteWidth&&winWidth<siteWidth)||isBellowBreakPoint()){var breakPoint=getScaleBreakPoint();return winWidth/breakPoint;}
return 1;}
function getScaleBreakPoint(){return isBellowBreakPoint()?480:siteWidth;}
function initPages(){var firstPageName=null;var pages=$('a[data-silex-type="page"]');if(pages&&pages.length>0){var firstPage=pages[0];firstPageName=firstPage.getAttribute('id');}
$body.on('pageChanged',function(event,pageName){$('[data-silex-href*="#!'+pageName+'"]').addClass('page-link-active');$('[id*="'+pageName+'"]').addClass('page-link-active');$('[data-silex-iframe-src]').each(function(){this.setAttribute('src',this.getAttribute('data-silex-iframe-src'));});$('.paged-element-hidden iframe').each(function(){var src=this.getAttribute('src');if(src){this.setAttribute('data-silex-iframe-src',src);this.setAttribute('src','');}});});$body.pageable({currentPage:firstPageName,useDeeplink:$body.hasClass('silex-runtime'),pageClass:'paged-element'});$('.silex-runtime [data-silex-href]').click(function(){var href=this.getAttribute('data-silex-href');if(href.indexOf('#')===0){window.location.href=href;}
else{window.open(href,'_blank');}});}}});