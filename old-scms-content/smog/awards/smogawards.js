//requires handlebars & jquery

Awards = (function(){
	var _this = this;
	var failureCount = 0;

	_this.Categories = [];

	var ApplyTemplate = function(template, container) {
		if(!Handlebars) {
			setTimeout(function() { ApplyTemplate(template,container); }, 100);
			console.log('dependent libraries not loaded.. retrying..');
		} else {
			_this.Categories
			var template = Handlebars.compile(template.innerHTML);
			container.innerHTML = template(_this.Categories);
		}
	};

	var LoadMessager = function(to) {
		$.ajax({
			url: 'http://www.smogon.com/forums/conversations/add',
			dataType:'html',
			success: function(res){
				var doc = $(res);
				var username = doc.filter('.accountUsername').text();
				var form = doc.filter('form[action="conversations/insert"]');
				$('body').append('<div id="submitted-form" style="display:none;">' + form + '</form');
			},
			error: function(){
				alert('Something went wrong. Try refreshing the page.');
			}
		});
	};

	_this.init = function(opts){
		if(document.cookie['xf_user']) {
			_this.Categories = !opts.categories ? _this.Categories : opts.categories;
			ApplyTemplate(opts.template, opts.container);
			LoadMessager(opts.submitTo);
		} else {
			alert('You don\'t seem to be logged in. Please log in to vote.');
		}
	};

	return _this;
})();