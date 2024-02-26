$(document).ready(function() {
    let tabCounter = 1;

    $('#new-tab').click(function() {
        const tabId = 'tab' + tabCounter;
        const newTab = $('<div class="tab"></div>').text("New Tab").attr('id', tabId);
        const closeButton = $('<span class="close-btn">x</span>')
            .click(function(event) {
                event.stopPropagation();
                const tabContentId = '#' + $(this).parent().attr('id') + '-content';
                $(this).parent().remove();
                $(tabContentId).remove();
                if ($('.tab.active').length === 0 && $('.tab').length > 0) {
                    $('.tab:first').click();
                }
            });

   
        newTab.append(closeButton);
        $('#new-tab').before(newTab);

        const contentArea = $('<div class="tab-content"></div>').attr('id', tabId + '-content').hide();
        $('#content-area').append(contentArea);

        newTab.click(function() {
            $('.tab').removeClass('active');
            $(this).addClass('active');
            $('.tab-content').hide();
            $('#' + tabId + '-content').show();
        });

        $('#reload-icon').click(function() {
            const activeContentArea = $('.tab-content:visible');
            const iframe = activeContentArea.find('iframe');
            if (iframe.length) {
                const src = iframe.attr('src');
                iframe.attr('src', src);
            }
        });

        tabCounter++; 
        newTab.click(); 
    });

   
    $('#global-search-input').keypress(function(e) {
        if (e.which === 13) { 
            const url = $(this).val();
            const activeTab = $('.tab.active');
            if (activeTab.length) {
                const tabId = activeTab.attr('id');
                const contentArea = $('#' + tabId + '-content');
                loadUrlInIframe(url, contentArea);
                activeTab.text(url); 
                activeTab.append($('<span class="close-btn">x</span>').click(function(event) {
                    event.stopPropagation(); 
                    activeTab.remove(); 
                    contentArea.remove();
                    if ($('.tab.active').length === 0 && $('.tab').length > 0) {
                        $('.tab:first').click(); 
                    }
                }));
            }
            $(this).val(''); 
        }
    });

    
    function loadUrlInIframe(url, contentArea) {
        const iframe = $('<iframe>', {
            src: url,
            frameborder: 0,
            loading: 'lazy',
            allowfullscreen: true,
        }).css({
            width: '100%',
            height: 'calc(100vh - 120px)', 
            backgroundColor: '#000',
        });
        contentArea.html(iframe).show();
    }
});
