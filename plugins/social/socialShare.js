/*
 Plugin Name: socialShare
 Version: 1.0
 Plugin URI: https://github.com/tolgaergin/social
 Description: To share any page with 46 icons
 Author: Tolga Ergin
 Author URI: http://tolgaergin.com
 Designer: Gökhun Güneyhan
 Designer URI: http://gokhunguneyhan.com
 */

/* PLUGIN USAGE */
/* 

 $('#clickable').socialShare({
 social: 'blogger,delicious,digg,facebook,friendfeed,google,linkedin,myspace,pinterest,reddit,stumbleupon,tumblr,twitter,windows,yahoo'
 });

 */

(function($){
    $.fn.extend({

        socialShare: function(options) {

            /* --Get first slide image */
            var firstSlide = document.getElementsByClassName("item")[0];
            var style = firstSlide.currentStyle || window.getComputedStyle(firstSlide, false);
            var img = style.backgroundImage.slice(4, -1).replace(/"/g, "");
            /* --*/

            /* --Shared property*/
            var property = '<meta property="og:title" content="'+document.title+'"/>'+
                            '<meta property="og:description" content="'+$('meta[name="description"]').attr('content')+'"/>'+
                            '<meta property="og:url" content="'+window.location.href+'"/>'+
                            '<meta property="og:image" content="'+img+'"/>';
            $('head').append(property);
            /* --*/

            var defaults = {
                social: '',
                title: document.title,
                shareUrl: window.location.href,
                description: $('meta[name="description"]').attr('content'),
                picture: img,
                animation: 'launchpad', // launchpad, launchpadReverse, slideTop, slideRight, slideBottom, slideLeft, chain
                chainAnimationSpeed: 100,
                whenSelect: false,
                selectContainer: 'body',
                blur: false
            };


            var options = $.extend(true,defaults, options);

            var beforeDivs = '<div class="arthref arthrefSocialShare"><div class="overlay '+options.animation+'"><div class="icon-container"><div class="centered"><ul>';
            var afterDivs = '</ul></div></div></div></div>';


            return this.each(function() {
                var o = options;
                var obj = $(this);

                if(o.whenSelect) {
                    $(o.selectContainer).mouseup(function(e) {
                        var selection = getSelected();
                        if(selection && (selection = new String(selection).replace(/^\s+|\s+$/g,''))) {
                            options.title = selection;
                        }
                    });
                }

                obj.click(function() {
                    createContainer();
                    if(o.blur) { $('.arthrefSocialShare').find('.overlay').addClass('opaque'); $('body').children().not('.arthref, script').addClass('blurred'); }
                    $('.arthrefSocialShare').find('.overlay').css('display','block');
                    setTimeout(function(){
                        $('.arthrefSocialShare').find('.overlay').addClass('active');
                        $('.arthrefSocialShare').find('ul').addClass('active');
                        $('.arthrefSocialShare').find('ul').attr('id', 'shareIcons');
                        if(o.animation=='chain') chainAnimation($('.arthrefSocialShare').find('li'),o.chainAnimationSpeed,'1');
                        setContainerWidth();    //set icon centered and left aligned
                    },0);

                });

                $( document ).on( "click touchstart", ".arthrefSocialShare .overlay", function( e ) {
                    destroyContainer(o);
                });

                $( document ).on( "keydown", function( e ) {
                    if( e.keyCode == 27 ) destroyContainer(o);
                });

                $( document ).on( "click touchstart", ".arthrefSocialShare li", function( e ) {
                    e.stopPropagation();
                });

            });

            function getSelected() {
                if(window.getSelection) { return window.getSelection(); }
                else if(document.getSelection) { return document.getSelection(); }
                else {
                    var selection = document.selection && document.selection.createRange();
                    if(selection.text) { return selection.text; }
                    return false;
                }
                return false;
            };

            function chainAnimation(e,s,o) {
                var $fade = $(e);
                $fade.each(function( i ){
                    $(this).delay(i * s).fadeTo(s,o);
                });
            };

            function createContainer(){
                var siteSettings = {
                    'blogger': { text: 'Blogger', className: 'aBlogger', url: 'http://www.blogger.com/blog_this.pyra?t=&amp;u={u}&amp;n={t}' },
                    'delicious': { text: 'Delicious', className: 'aDelicious', url: 'http://del.icio.us/post?url={u}&amp;title={t}' },
                    'digg': { text: 'Digg', className: 'aDigg', url: 'http://digg.com/submit?phase=2&amp;url={u}&amp;title={t}' },
                    'facebook': { text: 'Facebook', className: 'aFacebook', url: 'https://www.facebook.com/dialog/share?app_id=145634995501895&locale=zh_TW&display=popup&href={u}' },
                    // 'facebook': { text: 'Facebook', className: 'aFacebook', url: 'http://www.facebook.com/sharer.php?u={u}&amp;t={t}&amp;description={d}&amp;picture={p}&amp;locale=zh_tw' },
                    'friendfeed': { text: 'FriendFeed', className: 'aFriendFeed', url: 'http://friendfeed.com/share?url={u}&amp;title={t}' },
                    'google': { text: 'Google+', className: 'aGooglePlus', url: 'https://plus.google.com/share?url={u}' },
                    'linkedin': { text: 'LinkedIn', className: 'aLinkedIn', url: 'http://www.linkedin.com/shareArticle?mini=true&amp;url={u}&amp;title={t}&amp;ro=false&amp;summary={d}&amp;source=' },
                    'myspace': { text: 'MySpace', className: 'aMySpace', url: 'http://www.myspace.com/Modules/PostTo/Pages/?u={u}&amp;t={t}' },
                    'pinterest': { text: 'Pinterest', className: 'aPinterest', url: 'http://pinterest.com/pin/create/button/?url={u}&amp;description={d}' },
                    'reddit': { text: 'Reddit', className: 'aReddit', url: 'http://reddit.com/submit?url={u}&amp;title={t}' },
                    'stumbleupon': { text: 'StumbleUpon', className: 'aStumbleUpon', url: 'http://www.stumbleupon.com/submit?url={u}&amp;title={t}' },
                    'tumblr': { text: 'Tumblr', className: 'aTumblr', url: 'http://www.tumblr.com/share/link?url={u}&name={t}&description={d}' },
                    'twitter': { text: 'Twitter', className: 'aTwitter', url: 'http://twitter.com/home?status={t}%20{u}' },
                    'windows': { text: 'Windows', className: 'aWindows', url: 'http://profile.live.com/badge?url={u}' },
                    'yahoo': { text: 'Yahoo', className: 'aYahoo', url: 'http://bookmarks.yahoo.com/toolbar/savebm?opener=tb&amp;u={u}&amp;t={t}' },
                    'weibo': { text: '微博', className: 'aWeibo', url: 'http://service.weibo.com/share/share.php?url={u}&appkey=&title={t}&pic={p}&ralateUid=&language=zh_cn' },
                    'qq': { text: 'QQ', className: 'aQQ', url: 'http://connect.qq.com/widget/shareqq/index.html?url={u}&title={t}&source=&desc={d}&pics={p}'},
                    'line': { text: 'Line', className: 'aLine', url: (isMobile()) ? 'line://msg/text/{u}' : 'https://lineit.line.me/share/ui?url={u}'},
                    'wechat': { text: 'WeChat', className: 'aWechat', url: ''}
                };

                var sites = options.social.split(',');
                var listItem = '';
                for (var i = 0; i <= sites.length-1; i++) {
                    siteSettings[ sites[i] ]['url'] = siteSettings[ sites[i] ]['url'].replace('{t}',encodeURIComponent(options.title)).replace('{u}',encodeURI(options.shareUrl)).replace('{d}',encodeURIComponent(options.description)).replace('{p}',encodeURIComponent(options.picture));
                    listItem += '<li><a href="'+siteSettings[ sites[i] ]['url'] +'" target="_blank" rel="nofollow" class="'+siteSettings[ sites[i] ]['className'] +'"><span></span></a><span>'+siteSettings[ sites[i] ]['text'] +'</span></li>';
                }

                $('body').append(beforeDivs+listItem+afterDivs);
            }

            function isMobile() {
                if( navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/webOS/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPad/i)
                    || navigator.userAgent.match(/iPod/i)
                    || navigator.userAgent.match(/BlackBerry/i)
                    || navigator.userAgent.match(/Windows Phone/i)
                ){
                    return true;
                } else {
                    return false;
                }
            }

            /*  --Set icon centered and left aligned-- */
            function setContainerWidth()
            {
                var windowWidth = $(document).width();
                var blockWidth = $('ul.active li').outerWidth(true);
                var maxBoxPerRow = Math.floor(windowWidth / blockWidth);
                $('ul.active').width(maxBoxPerRow * blockWidth);
            }

            function destroyContainer(o) {
                if(o.blur) $('body').children().removeClass('blurred');
                $('.arthrefSocialShare').find('.overlay').removeClass('active');
                $('.arthrefSocialShare').find('ul').removeClass('active');
                setTimeout(function(){
                    $('.arthrefSocialShare').find('.overlay').css('display','none');
                    $('.arthrefSocialShare').remove();
                },300);
            }

        }

    });
})(jQuery);
