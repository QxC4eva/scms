$(function() {
	var configUrl = '/news/config.json';
	var config = {};
	var status = {
		isLoading : false,
		nextToLoad : 0
	};

	var init = function(cfg){
		config = cfg;
		config.newsWrapper = $(config.newsWrapperSelector);
		config.loadButton = $(config.loadButtonSelector);
		config.template = $(config.templateSelector);

		config.loadButton.on('click', loadMoreNews);

		status.nextToLoad = config.latest;
		loadMoreNews();
	};

	var getUrlForItem = function(itemNumber) {
		var str = "" + itemNumber;
		var normalized = ("0000").substring(0, 4 - str.length) + str;
		return config.urlTemplate.replace(config.placeholderString, normalized);
	};

	var loadMoreNews = function(){
		if(status.isLoading) { return; }

		status.isLoading = true;
		status.currentLoad = '';

		var loadCount = config.loadCount;
		var currentIndex = status.nextToLoad;

		while(loadCount > 0 && currentIndex > 0){
			loadNewsItem(currentIndex, function(){
				status.currentLoad += '.';

				if(status.currentLoad.length === config.loadCount) {
					status.isLoading = false;
					status.nextToLoad = currentIndex;
				}
			});

			loadCount -= 1;
			currentIndex -= 1;
		}

		//loaded all news
		if(currentIndex == 0) {
			config.loadButton.remove();
		}
	};

	var loadNewsItem = function(itemNumber, callback) {
		var placeholder = $(document.createElement('div'));
		config.newsWrapper.append(placeholder);

		//a bit static for my tastes, but should work fine.
		var success = function(data){
			//copy contents of template
			var newsItem = $('<div>' + config.template.html() + '</div>');
			var lines = data.split('\n');

			if(lines.length > 1){
				//don't allow html
				$('[data-for="title"]', newsItem).text(lines[0]);
				$('[data-for="published"]', newsItem).text(lines[1]);

				//allow html but not scripts
				$('[data-for="text"]', newsItem).html($.parseHTML(lines.splice(2, lines.length - 2).join('')));

				placeholder.html(newsItem).addClass('news');
			}
		};

		$.ajax({
			url:getUrlForItem(itemNumber),
			dataType:'text',
			success:success,
			error: function() { console.error(arguments); },
			complete:callback
		});
	};

	$.getJSON(configUrl, init);
});